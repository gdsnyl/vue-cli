//查找node_modules中的vue这个包
import Vue from 'vue';
// 2.导入App.vue组件对象  当前目录下查找APP.vue这个组件
import App from './App.vue';

// 导入vue-router这个包
import VueRouter from 'vue-router';

//  将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

// 导入组件对象
import layout from './components/layout.vue';
// 商品相关组件
import goodslist from './components/goodslist.vue';
import goodsinfo from './components/goodsinfo.vue';
import car from './components/car.vue';
import shopping from './components/shopping.vue';
import pay from './components/pay.vue';
import login from './components/login.vue';
import payamount from './components/payamount.vue'
import pcpaysuccess from './components/pcpaysuccess.vue'
import vipcenter from './components/vipcenter.vue'
import myorders from './components/myorders.vue'
import orderinfo from './components/orderinfo.vue'

// 实例化对象并且定义路由规则
var  router=new VueRouter({
    routes:[
        // 默认跳转的路由规则
        { name: 'default', path: '/', redirect: '/site/goodslist'},
         //由于payamount.vue是被手机打开的，所以不需要头部导航,所以路由规则注册在此处
        { name: 'payamount', path: '/payamount/:orderid', component: payamount },
        //  移动端打开的不需要导航           
        { name: 'pcpaysuccess', path: 'pcpaysuccess', component: pcpaysuccess },  
        // 布局
        {name:'layout',path:'/site',component:layout,
     children:[
         //登陆页面
         { name: 'login', path: 'login', component: login, meta: { nosave: 'true'}},
        //  商品列表
         { name: 'goodslist', path: 'goodslist/', component: goodslist},
        //  商品详情
         { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo},
        //  购物车
         { name: 'car', path: 'car', component: car},
         //下单页面
         { name: 'shopping', path: 'shopping/:ids', component: shopping, meta:{ checklogin: true }},
        //  支付页面
         { name: 'pay', path: 'pay/:orderid', component: pay, meta:{ checklogin: true }},
        //  支付成功页面
         { name: 'pcpaysuccess', path: 'pcpaysuccess', component:pcpaysuccess},
         //会员中心
         { name: 'vipcenter', path: 'vipcenter', component: vipcenter, meta: { checklogin: true}},
        //  我的交易订单
         { name: 'myorders', path: 'myorders', component: myorders, meta: { checklogin: true}},
         { name: 'orderinfo', path: 'orderinfo/:orderid', component: orderinfo, meta: { checklogin: true}},

     ]
    },
     
    ]
});

// 4导入vue的一个组件库element-ui
import elementUI from 'element-ui';

import './statics/site/css/style.css';
import './statics/elementuiCss/index.css';

// 绑定到vue中
Vue.use(elementUI);

// 导入iview中的affix组件
import { Affix } from 'iview';
Vue.component('Affix', Affix)

// 导入axios
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8899';
// 配置axios在请求数据服务接口的时候，允许带cookie
axios.defaults.withCredentials = true;
// 将axios对象绑定到Vue的原型属性 $ajax上，将来在任何组件中均可以通过this.$ajax中的get(), post() 就可以发出ajax请求了
Vue.prototype.$ajax = axios;

// 全局守卫
router.beforeEach((to, from, next) => {
    //1在localStorage中记录用户访问的最后那个页面（存储一个路由对象），排除登录页面
    if (to.meta.nosave != "true") {
        // 保存的是当前路由对象中的path
        localStorage.setItem('currentPath', to.path);
    }

    // 2进行登录检查 
    if (to.meta.checklogin) {
        axios.get('/site/account/islogin').then(res => {
            if (res.data.code == "logined") {
                // 表示已经登录了，则可以成功进入到目标页面
                next();
            } else {
                //表示未登录，则跳转到登录页面
                router.push({ name: 'login' })
            }
        });
    } else {
        next();
    }
});
// 定义一个全局过滤器格式化日期
Vue.filter('datefmt',(input,fmtString)=>{
    var date = new  Date(input);
    var y = date.getFullYear();
    var m = date.getMonth() +1;
    var d = date.getDate();
    var h = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    if (fmtString=='YYYY-MM-DD HH:mm:ss'){
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
    }else{
        return y + '-' + m + '-' + d;
    }
   
});

// vuex的定义和集成
import vuex from 'vuex';
Vue.use(vuex);

// 定义vux的4个核心对象

var state ={
    buyCount:0
}
import { setItem, getItem} from './qjzx/localStorage.js'
//这个对象中定义的方法要通过actions中的方法触发
var mutations={
    changeCount(state, goodsobj){
        var obj = getItem();
         // 获取localstroage中的商品的购买总数据量
        var tcount = 0;
        for (var key in obj) {
            tcount += obj[key];
        }
        state.buyCount = tcount;
    } 
}
//actions在外部可以通过编写：this.$store.dispatch('actions定义好的方法名称',传入参数) 
var actions={
    // 定义一个changeCount方法来触发mutations中的某个方法
    // 参数{commit}:可以用它来触发mutations里面的某个方法
    // 参数parmsbuyCount:就是从程序员在调用的时候传入的（带业务才知道具体的参数有哪些）  
    changeCount({commit},goodsobj){
      // commit()的第一个参数就是mutations里面的某个方法名称
        commit('changeCount', goodsobj);
    }
}
// 对state中的某个属性进行封装处理(至于如何封装按照具体的业务来编写)\
var getters = {
    // 当state.buyCount的值>0的话，直接返回即可
    getBuyCount(state) {
        if (state.buyCount > 0) {
            return state.buyCount;
        } else {
            // 否则从localStorage中统计出总数据返回
            var obj = getItem();
            var tcount = 0;
            for (var key in obj) {
                tcount += obj[key];
            }
            // 将最终结果赋值回给state.buyCount这个属性
            state.buyCount = tcount;

            return tcount;

            }
        }
    }
//四个对象利用  new vuex.Store()进行实例化
var store = new vuex.Store({
    state, mutations, actions, getters
});

 


// 3实例化对象
new Vue({
    el: '#app', //绑定路由对象使它生效
    router,
    store, //在vue中注入store
    render: create => create(App)// 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
});
