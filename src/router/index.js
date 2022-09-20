import { createRouter, createWebHistory } from "vue-router";

import LoginScreen from "@/components/LoginScreen";
import DashBoard from "@/components/DashBoard";
import DocumentList from "@/components/DocumentList";
import ChangeSettings from "@/components/ChangeSettings";
import ExecutedReports from "@/components/ExecutedReports";
import AssignedTasks from "@/components/AssignedTasks";
import ModalComponent from "@/components/ModalComponent";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginScreen,
  },
  {
    path: "/assigned-tasks",
    name: "assigned-tasks",
    component: AssignedTasks,
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: ModalComponent,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashBoard,
  },
  {
    path: "/document-list",
    name: "document-list",
    component: DocumentList,
  },
  {
    path: "/settings",
    name: "settings",
    component: ChangeSettings,
  },
  {
    path: "/executed-reports",
    name: "executed-reports",
    component: ExecutedReports,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
