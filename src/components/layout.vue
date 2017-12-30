<template>
  <div class="tmpl">
    <div id="header" class="header">
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>帅你一脸</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
              <router-link v-if="!islogin" to="/site/login">登录</router-link>
            <a v-if="!islogin" href="/register.html">注册</a>
            <strong>|</strong>
            <router-link to="/site/vipcenter"  v-if="islogin"> 会员中心</router-link>                  
            <a v-if="islogin" @click="logout" href="javascript:void(0)">退出</a>
               <router-link to="/site/car">
              <i class="iconfont icon-cart"></i>购物车(<span id="layoutbuycar">{{this.$store.getters.getBuyCount}}</span>)
              </router-link>
            <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                           <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a>-->
          </div>
        </div>
      </div>
      <div class="head-nav">
        <div class="section">
          <!-- <div class="logo">
                           <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                       </div>-->
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="/index.html">
                  首页
                </a>
              </li>
              <li class="news">
                <a href="/news.html">
                  王者峡谷
                </a>
              </li>
              <li class="photo">
                <a href="/photo.html">
                 5V5排位
                </a>
              </li>
              <!--<li class="goods"><a href="">就业阶段</a></li>-->
              <li class="video">
                <a href="/video.html">
                 背包
                </a>
              </li>
              <li class="down">
                <router-link to="/site/goodslist">             
                  购物商城
                </router-link>
              </li>
              <li>
                <a target="_blank" href="/admin/index.aspx">
                  问题反馈
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>



<!-- 中间内容占位 -->
<router-view></router-view>
  </div>
</template>

<script>
  // 导入bus.js中的vm对象
  import {vm,KEY} from '../qjzx/bus.js';

  export default {
     data(){
       return {
        buyTotalCount:0, //用户购买的商品总数
        islogin: false
       }
     },
   
     mounted(){ 
       $("#menu2 li a").wrapInner('<span class="out"></span>');
       $("#menu2 li a").each(function () {
         $('<span class="over">'+ $(this).text()+'</span>').appendTo(this);
       });
       $("#menu2 li a").hover(function () {
         $(".out",this).stop().animate({'top':'48px'},300);
         $(".over",this).stop().animate({'top':'0px'},300);
       },function () {
         $(".out",this).stop().animate({'top':'0px'},300);
         $(".over",this).stop().animate({'top':'-48px'},300);
       });  
       
      //  将曾经购买的总数加载回来
        var countStr = localStorage.getItem('buyTotalCount');
          if(countStr != "NaN"){          
            this.buyTotalCount = parseInt(countStr);
          }
      //  利用vm中的$on方法完成事件监听
      vm.$on(KEY,(buycount)=>{
          //1 改变的是内存中的变量值
          this.buyTotalCount += buycount;

          //2 将总数存储起来 存储到浏览器中  选择localStorage存储
          localStorage.setItem('buyTotalCount', this.buyTotalCount);
      })
            this.checkLogin();
               // 利用vm的$on注册登录状态的改变
            vm.$on('changelogin', (val) => {
         // 获取localStroage中的是否登录的状态 ,key="logined"
         this.checkLogin();
       });       
      
     },
       methods: {
      //退出
      logout(){
         this.$ajax.get('/site/account/logout').then(res => {
          if (res.data.status == 0) {
            // 退出成功，将localStroage中的logined的值变成false,同时要将当前layou.vue中的this.isloing的值设置成false
            this.islogin = false;
            localStorage.setItem('logined', 'false');

            // 跳转到商品列表
            this.$router.push({ name: 'goodslist' });
          }
        });
      },
       checkLogin() {
           var res = localStorage.getItem('logined');
           if (res == "true") {
             // 登录
             this.islogin = true;
           } else {
             // 退出
             this.islogin = false;
           }
         }
    },
  }
</script>


<style scoped>

@import url('../statics/jqplugins/jqhovernav/jqhoverNav.css'); 
</style>