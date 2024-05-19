<template>
  <div id="borrowView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="bookId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.bookId" placeholder="请输入题号" />
      </a-form-item>
      <!--      <a-form-item field="language" label="编程语言" style="min-width: 240px">-->
      <!--        <a-select-->
      <!--          v-model="searchParams.language"-->
      <!--          :style="{ width: '320px' }"-->
      <!--          placeholder="选择编程语言"-->
      <!--        >-->
      <!--          <a-option>java</a-option>-->
      <!--          <a-option>cpp</a-option>-->
      <!--          <a-option>go</a-option>-->
      <!--          <a-option>html</a-option>-->
      <!--        </a-select>-->
      <!--      </a-form-item>-->
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
      @page-change="onPageChange"
      column-resizable
      :bordered="{ cell: false }"
    >
      <!--            <template #judgeInfo="{ record }">-->
      <!--              <div>-->
      <!--                {{ JSON.stringify(record.judgeInfo) }}-->
      <!--              </div>-->
      <!--            </template>-->
      <!--            <template #status="{ record }">-->
      <!--              <a-tooltip :content="record.judgeInfo.message" position="top">-->
      <!--                <a-tag checkable :color="getColor(record.status)"-->
      <!--                  >{{ getStatus(record.status) }}-->
      <!--                </a-tag>-->
      <!--              </a-tooltip>-->
      <!--            </template>-->
      <!--            <template #memory="{ record }">-->
      <!--              {{ record.judgeInfo.memory ? record.judgeInfo.memory : 0 }} KB-->
      <!--            </template>-->
      <!--            <template #time="{ record }">-->
      <!--              {{ record.judgeInfo.time ? record.judgeInfo.time : 0 }} ms-->
      <!--            </template>-->
      <template #borrowDate="{ record }">
        <div>
          <!--          {{ moment(record.createTime).format("YYYY-MM-DD HH:mm") }}-->
          {{
            moment
              // .utc(record.createTime)
              .tz(record.borrowDate, "Asia/Shanghai")
              .format("YYYY-MM-DD HH:mm")
          }}
        </div>
      </template>
      <template #returnDate="{ record }">
        <div>
          <!--          {{ moment(record.createTime).format("YYYY-MM-DD HH:mm") }}-->
          {{
            moment
              // .utc(record.createTime)
              .tz(record.returnDate, "Asia/Shanghai")
              .format("YYYY-MM-DD HH:mm")
          }}
        </div>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doreturn(record)"> 还书</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Book,
  BookControllerService,
  BorrowQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
// import moment from "moment";
import moment from "moment-timezone";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<BorrowQueryRequest>({
  // questionId: undefined,
  // language: undefined,
  pageSize: 10,
  current: 1,
});

// const getStatus = (value: number) => {
//   switch (value) {
//     case 0:
//       return "等待中";
//     case 1:
//       return "判题中";
//     case 2:
//       return "答案正确";
//     case 3:
//       return "执行异常";
//     case 4:
//       return "部分错误";
//     case 5:
//       return "答案错误";
//     default:
//       return "";
//   }
// };

// const getColor = (value: number) => {
//   switch (value) {
//     case 0:
//       return "grey";
//     case 1:
//       return "cyan";
//     case 2:
//       return "green";
//     case 3:
//       return "red";
//     case 4:
//       return "orangered";
//     case 5:
//       return "red";
//     default:
//       return "green";
//   }
// };

const loadData = async () => {
  const res = await BookControllerService.listBorrowByPageUsingPost({
    ...searchParams.value,
    sortField: "borrowDate",
    sortOrder: "descend",
  });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
  // alert(dataList.value[0].id);
  // alert(total.value);
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "借阅者",
    dataIndex: "userVO.userName",
  },
  {
    title: "图书名称",
    dataIndex: "bookVO.title",
  },
  {
    title: "借书时间",
    dataIndex: "borrowDate",
    slotName: "borrowDate",
    width: 155,
  },
  {
    title: "还书时间",
    dataIndex: "returnDate",
    slotName: "returnDate",
    width: 155,
  },
  {
    title: "归还状态",
    dataIndex: "isReturned",
    slotName: "isReturned",
  },
  {
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doreturn = async (book: Book) => {
  // alert(question.acceptNum);
  // router.push({
  //   path: `/view/question/${question.id}`,
  // });
  const res = await BookControllerService.returnBookUsingPost(book.id);
  // alert(res.message);
  if (res.code === 0) {
    message.success("还书成功");
  } else {
    message.error("还书失败，" + res.message);
  }
};

const router = useRouter();

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#BorrowView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
