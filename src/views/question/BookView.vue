<template>
  <div id="booksView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="书名" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入书名" />
      </a-form-item>
      <a-form-item field="author" label="作者" style="min-width: 240px">
        <a-input v-model="searchParams.author" placeholder="请输入作者" />
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
        total,
      }"
      @page-change="onPageChange"
    >
      <template #category="{ record }">
        <a-space wrap>
          <a-tag :color="getColor(record.category)"
            >{{ record.category }}
          </a-tag>
        </a-space>
      </template>

      <template #status="{ record }">
        <a-space wrap>
          <a-tag :color="getStatusColor(record.status)"
            >{{ getStatus(record.status) }}
          </a-tag>
        </a-space>
      </template>
      <!--      -->
      <!--      <template #status="{ record }">-->
      <!--        <a-tooltip :content="record.status" position="top">-->
      <!--          <a-tag checkable :color="getStatusColor(record.status)"-->
      <!--            >{{ getStatus(record.status) }}-->
      <!--          </a-tag>-->
      <!--        </a-tooltip>-->
      <!--      </template>-->

      <template #publishDate="{ record }">
        {{ moment(record.publishDate).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button
            type="primary"
            @click="toQuestionPage(record)"
            :disabled="record.status != 0"
            shape="round"
          >
            借阅
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Page_Book_,
  Book,
  BookControllerService,
  BookQueryRequest,
  BorrowAddRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<BookQueryRequest>({
  title: "",
  author: "",
  pageSize: 8,
  current: 1,
});

const loadData = async () => {
  const res = await BookControllerService.listBookByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
  // alert(dataList.value[0].author);
};

const isDisabeled = true;

const getColor = (value: string) => {
  switch (value) {
    case "小说":
      return "red";
    case "人文":
      return "arcoblue";
    case "教育":
      return "green";
    case "艺术":
      return "cyan";
    case "生活":
      return "purple";
    case "科普":
      return "magenta";
    case "儿童":
      return "pinkpurple";
    default:
      return "arcoblue";
  }
};

const getStatusColor = (value: number) => {
  switch (value) {
    case 0:
      return "green";
    case 1:
      return "red";
    case 2:
      return "grey";
    default:
      return "arcoblue";
  }
};

const getStatus = (value: number) => {
  switch (value) {
    case 0:
      return "正常";
    case 1:
      return "缺货";
    case 2:
      return "下架";
    default:
      return "";
  }
};

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = async (book: Book) => {
  // alert(question.acceptNum);
  // router.push({
  //   path: `/view/question/${question.id}`,
  // });
  doborrow.value.bookId = book.id;
  const res = await BookControllerService.doBorrowUsingPost(doborrow.value);
  // alert(res.message);
  if (res.code === 0) {
    message.success("借书成功，记得还书哦~");
    await loadData();
  } else {
    message.error("加载失败，" + res.message);
  }
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

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "编号",
    dataIndex: "id",
  },
  {
    title: "书名",
    dataIndex: "title",
    slotName: "title",
  },
  {
    title: "作者",
    dataIndex: "author",
  },
  {
    title: "出版社",
    dataIndex: "publisher",
  },
  {
    title: "分类",
    dataIndex: "category",
    slotName: "category",
  },
  {
    title: "出版日期",
    dataIndex: "publishDate",
    slotName: "publishDate",
  },
  {
    title: "库存",
    dataIndex: "quantity",
  },
  {
    title: "状态",
    dataIndex: "status",
    slotName: "status",
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

const router = useRouter();

const doborrow = ref<BorrowAddRequest>({});

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
#BookView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
