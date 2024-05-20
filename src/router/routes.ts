import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import AddBookView from "@/views/question/AddBookView.vue";
import ManageBookView from "@/views/question/ManageBookView.vue";
import BookView from "@/views/question/BookView.vue";
import BorrowView from "@/views/question/BorrowView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/books",
    name: "浏览图书",
    component: BookView,
  },
  {
    path: "/borrow",
    name: "借阅记录",
    component: BorrowView,
  },
  {
    path: "/add/book",
    name: "添加图书",
    component: AddBookView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/book",
    name: "更新图书",
    component: AddBookView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/book/",
    name: "管理图书",
    component: ManageBookView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/",
    name: "主页",
    component: BookView,
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
