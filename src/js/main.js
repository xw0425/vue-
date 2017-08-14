import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'mui/dist/css/mui.css';
import 'mui/examples/hello-mui/css/icons-extra.css';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUi);
import App from '../component/App.vue';
import router from './router.js';
new Vue({
    el: '#app',
   render:c=>c(App),
   router
   
});