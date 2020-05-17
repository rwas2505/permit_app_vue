import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import RejectionsIndex from '../views/RejectionsIndex.vue';
import RejectionsNew from '../views/RejectionsNew.vue';
import RejectionsShow from '../views/RejectionsShow.vue';
import RejectionsEdit from '../views/RejectionsEdit.vue';
import LocationData from '../views/LocationData.vue';
import ProductData from '../views/ProductData.vue';
import CategoryData from '../views/CategoryData.vue';
import AhjData from '../views/AhjData.vue';
import Charts from '../views/Charts.vue';
import Upload from '../views/Upload.vue';
// import WebViewer from '../views/WebViewer.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/rejections',
    name: 'rejections-index',
    component: RejectionsIndex
  },
  {
    path: '/rejections/new',
    name: 'rejections-new',
    component: RejectionsNew
  },
  {
    path: '/rejections/:id',
    name: 'rejections-show',
    component: RejectionsShow
  },
  {
    path: '/rejections/:id/edit',
    name: 'rejections-edit',
    component: RejectionsEdit
  },
  {
    path: '/data/location',
    name: 'location-display',
    component: LocationData
  },
  {
    path: '/data/product',
    name: 'product-display',
    component: ProductData
  },
  {
    path: '/data/category',
    name: 'category-display',
    component: CategoryData
  },
  {
    path: '/data/ahj',
    name: 'ahj-display',
    component: AhjData
  },
  {
    path: '/charts',
    name: 'chart-display',
    component: Charts
  },
  {
    path: '/upload',
    name: 'upload-display',
    component: Upload
  },
  // {
  //   path: '/webviewer',
  //   name: 'webviewer-display',
  //   component: WebViewer
  // }  

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
