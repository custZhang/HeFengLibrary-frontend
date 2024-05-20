<template>
  <div id="borrowView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="编号" style="min-width: 240px">
        <a-input v-model="searchParams.bookId" placeholder="请输入图书编号" />
      </a-form-item>
      <a-form-item field="userId" label="学号" style="min-width: 240px">
        <a-input v-model="searchParams.userId" placeholder="请输入借阅者学号" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit" shape="round">搜索</a-button>
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
      <template #isReturned="{ record }">
        <a-space wrap>
          <a-tag :color="getColor(record.isReturned)"
            >{{ getStatus(record.isReturned) }}
          </a-tag>
        </a-space>
      </template>
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
            record.returnDate
              ? moment
                  // .utc(record.createTime)
                  .tz(record.returnDate, "Asia/Shanghai")
                  .format("YYYY-MM-DD HH:mm")
              : ""
          }}
        </div>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button
            type="primary"
            @click="doreturn(record)"
            :disabled="record.isReturned != 0"
            shape="round"
          >
            还书
          </a-button>
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
import { useStore } from "vuex";

const store = useStore();

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<BorrowQueryRequest>({
  bookId: undefined,
  userId: undefined,
  pageSize: 10,
  current: 1,
});

const getColor = (value: number) => {
  switch (value) {
    case 0:
      return "red";
    case 1:
      return "green";
    default:
      return "arcoblue";
  }
};

const getStatus = (value: number) => {
  switch (value) {
    case 0:
      return "未归还";
    case 1:
      return "已归还";
    default:
      return "";
  }
};

const loadData = async () => {
  // alert(store.state.user.loginUser.userRole === "user");
  // 如果只是普通用户，只能查询自己的借阅记录
  if (
    store.state.user.loginUser &&
    store.state.user.loginUser.userRole === "user"
  ) {
    searchParams.value.userId = store.state.user.loginUser.id;
  }
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
    title: "流水号",
    dataIndex: "id",
  },
  {
    title: "学号",
    dataIndex: "userVO.id",
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
    title: "作者",
    dataIndex: "bookVO.author",
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
  // alert(book.acceptNum);
  // router.push({
  //   path: `/view/book/${book.id}`,
  // });
  const res = await BookControllerService.returnBookUsingPost(book.id);
  // alert(res.message);
  if (res.code === 0) {
    message.success("还书成功");
    await loadData();
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
