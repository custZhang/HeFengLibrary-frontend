<template>
  <div id="manageBookView">
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
      :bordered="{ cell: true }"
      column-resizable
    >
      <template #publishDate="{ record }">
        {{ moment(record.publishDate).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
          <a-button status="danger" @click="doDelete(record)">下架</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Page_Book_, Book, BookControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import moment from "moment/moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
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
    title: "id",
    dataIndex: "id",
    width: 40,
  },
  {
    title: "书名",
    dataIndex: "title",
  },
  {
    title: "作者",
    dataIndex: "author",
    ellipsis: true,
  },
  {
    title: "出版社",
    dataIndex: "publisher",
  },
  {
    title: "ISBN编号",
    dataIndex: "isbn",
    ellipsis: true,
  },
  {
    title: "出版日期",
    dataIndex: "publishDate",
    slotName: "publishDate",
  },
  {
    title: "价格",
    dataIndex: "price",
    width: 50,
  },
  {
    title: "库存数量",
    dataIndex: "quantity",
    ellipsis: true,
  },
  {
    title: "状态",
    dataIndex: "status",
    ellipsis: true,
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

// 下架图书
const doDelete = async (book: Book) => {
  const res = await BookControllerService.offShelfBookUsingPost(book.id);
  if (res.code === 0) {
    message.success("下架成功");
    loadData();
  } else {
    message.error("下架失败");
  }
};

const router = useRouter();

const doUpdate = (book: Book) => {
  router.push({
    path: "/update/question",
    query: {
      id: book.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
