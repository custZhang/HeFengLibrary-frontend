<template>
  <div id="AddBookView">
    <h2>{{ `${updatePage ? "修改图书" : "图书入库"}` }}</h2>

    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="书名">
        <a-input
          v-model="form.title"
          style="max-width: 400px"
          placeholder="请输入书名"
        />
      </a-form-item>
      <a-form-item field="author" label="作者">
        <a-input
          v-model="form.author"
          style="max-width: 400px"
          placeholder="请输入作者"
        />
      </a-form-item>
      <a-form-item field="publisher" label="出版社">
        <a-input
          v-model="form.publisher"
          style="max-width: 400px"
          placeholder="请输入出版社"
        />
      </a-form-item>
      <a-form-item field="isbn" label="ISBN编号">
        <a-input
          v-model="form.isbn"
          style="max-width: 400px"
          placeholder="请输入ISBN编号"
        />
      </a-form-item>
      <a-form-item field="publishDate" label="出版日期">
        <a-input
          v-model="form.publishDate"
          style="max-width: 400px"
          placeholder="请输入出版日期"
        />
      </a-form-item>
      <a-form-item field="price" label="价格">
        <a-input
          v-model="form.price"
          style="max-width: 400px"
          placeholder="请输入价格"
        />
      </a-form-item>
      <a-form-item field="quantity" label="库存数量">
        <a-input
          v-model="form.quantity"
          style="max-width: 400px"
          placeholder="请输入库存数量"
        />
      </a-form-item>
      <a-form-item field="category" label="分类">
        <a-input
          v-model="form.category"
          style="max-width: 400px"
          placeholder="请输入分类"
        />
      </a-form-item>
      <a-form-item field="status" label="状态">
        <a-input
          v-model="form.status"
          style="max-width: 400px"
          placeholder="请输入状态（0正常，1缺货，2下架）"
        />
      </a-form-item>
      <div style="margin-top: 16px" />
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BookControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
// import "moment-timezone";

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  title: "",
  author: "",
  publisher: "",
  isbn: "",
  publishDate: "2000-01-01",
  price: 0,
  quantity: 0,
  category: "",
  status: 0,
});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await BookControllerService.getBookEditVoByIdUsingGet(id as any);
  if (res.code === 0) {
    form.value = res.data as any;
    form.value.publishDate = moment(form.value.publishDate)
      .tz("Asia/Shanghai")
      .format("YYYY-MM-DD");
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const router = useRouter();

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await BookControllerService.updateBookUsingPost(form.value);
    if (res.code === 0) {
      message.success("更新成功，正在跳转到首页...");
      router.push({
        path: "/",
      });
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await BookControllerService.addBookUsingPost(form.value);
    if (res.code === 0) {
      message.success("添加成功，正在跳转到首页...");
      router.push({
        path: "/",
      });
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};
</script>

<style scoped>
#AddBookView {
}
</style>
