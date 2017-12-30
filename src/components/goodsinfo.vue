<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情           判断当有值的时候才渲染 -->
        <div class="section" v-if="goodslist.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <!-- 放大镜 -->
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodslist.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                                                                               
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>

                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1 v-text="goodslist.goodsinfo.title"></h1>
                                <p class="subtitle" v-text="goodslist.goodsinfo.sub_title"></p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodslist.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodslist.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{goodslist.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <!-- element组件中的InputNumber 计数器 -->
                                            <el-input-number v-model="num1" @change="handleChange" :min="1" :max="goodslist.goodsinfo.stock_quantity"></el-input-number>

                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodslist.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" >立即购买</button>
                                                <button ref="btnaddcar"  class="add" @click="addcar">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <!--选项卡-->
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <!-- tab栏切换 -->
                                        <li @click="issshow=true">
                                            <a v-bind="{class:(issshow?'selected':'')}" href="javascript:;">商品介绍</a>
                                        </li>
                                        <li @click="issshow=false">
                                            <a v-bind="{class:(!issshow?'selected':'')}" href="javascript:;" class="">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" v-show="issshow">
                                <div style="padding: 10px" v-html="goodslist.goodsinfo.content"></div>
                            </div>

                            <div class="tab-content" v-show="!issshow" >
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " v-model="commentTxt"  nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" @click="postComment"  value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <!-- 商品评论区域 -->
                                    <ul id="commentList" class="list-box" >
                                        <p v-show="commentList.length<=0 " style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key="item.id" >
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                        <!-- 使用elementUI组件中的分页 -->
                                        <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="pageIndex" :page-sizes="[2,5,10,20,30]"
                                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                                        </el-pagination>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>{{goodslist.hotgoodslist.title}}</h4>
                                <ul class="side-img-list">

                                    <li v-for="item in goodslist.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                          <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                <img :src="item.img_url">
                                        </router-link>
                                        </div>
                                        <div class="txt-box">
                                         <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                           {{item.title}}
                                        </router-link>
                                            <span>{{item.add_time | datefmt}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
           <!-- 商品图片飞入购物车 -->
         <transition  
          @before-enter="benter"
          @enter="enter"
          @after-enter="aenter"
         > 
         <div class="img" ref="img" v-if="goodslist.imglist" v-show="issshowimg">
             <img  width="50" height="50"  :src="goodslist.imglist[0].thumb_path" alt="">
        </div>
         </transition>
    </div>
</template>

<script>
     // 导入bus.js中的vm对象
    import { vm, KEY } from '../qjzx/bus.js';

    // 导入localStorage.js
    import { setItem} from '../qjzx/localStorage.js';
    // 导入jqimgzoon中的js
    import '../statics/jqplugins/jqimgzoom/js/magnifier.js';
    $(function () {

    })
    export default {

        data() {
            return {
                offsetObj:{},
                lbcOffSet:{},
                issshowimg:false, //默认先隐藏div中的图片
                currentBuyCount:1,
                pageSize:10,  // 每页显示的条数
                pageIndex:1,  //当前是第几页 默认第1页
                issshow: true, //默认显示商品详情     
                num1: 1,  //双向数据绑定   
                goodslist: {},//存储服务器响应回来的数据
                goodsid: this.$route.params.goodsid, //id
                commentList:[],  
                totalcount:0,   //评论的总条数
                commentTxt:'', //用户填写的评论数据

            }
        },
        mounted() {
            this.getgoodsinfo();
            //进入商品详情页面的时候就获取评论数据
            this.getCommentList();

            // 利用jq获取这个对象的offset
            setTimeout(()=>{
            // 获取当前页面上的加入购物车按钮的位置
                var offsetObj = $(this.$refs.btnaddcar).offset();
                this.offsetObj = offsetObj;
                // 将加入购物车按钮的位置赋值给图片div
                $(this.$refs.img).css("left", offsetObj.left).css("top", offsetObj.top);
                // 获取layout.vue组件中的id=layoutbuycar这个dom对象 购物车的位置
                var lbcOffSet = $("#layoutbuycar").offset();
                this.lbcOffSet = lbcOffSet;
            },200)
           
        },
        watch:{
         '$route':function(){
           this.getgoodsinfo();
         }
        },
        methods: {
        //   定义动画进入的3个钩子函数
        benter(el){
           //设置动画开始的位置
           el.style.left=this.offsetObj.left+'px';
           el.style.top=this.offsetObj.top + 'px';
        },
        enter(el,done){
            // 刷新
          el.offsetWidth;
        //   设置动画结束的位置
        el.style.left=this.lbcOffSet.left +'px';
        el.style.top=this.lbcOffSet.top +'px';
        //  调用done来触发aenter的执行
          done();
        },
        aenter(el){
        //    隐藏div
       this.issshowimg=false;
        },


            // 定义加入购物车addcar事件
            addcar(){
                // 利用$emit触发事件 将购买数量传入layout.vue组件
            //  vm.$emit(KEY, this.currentBuyCount);

            //  获取到当前商品id和购买的数量调用 localStroagehelper.js这个文件中的setItem方法来存储值
             var  goodsobj = { gid: this.$route.params.goodsid, count: this.currentBuyCount }; 
              // 将当前购买商品的数量存储到localStroage中
               setItem(goodsobj);
                //  换成vuex
                this.$store.dispatch('changeCount', goodsobj);

                // 当点击加入购物车的时候，将isshow设置为true，显示出图片
                this.issshowimg = true;
            },
            // element组件中的InputNumber 计数器触发事件
            handleChange(val) {
            this.currentBuyCount = val;
            },

            getgoodsinfo() {
                // 获取商品详情数据
                var url = "/site/goods/getgoodsinfo/" + this.$route.params.goodsid;
                this.$ajax.get(url).then(res => {
                    this.goodslist = res.data.message;
                    if (!this.goodslist.goodsinfo) {
                        this.$message.error('传入的商品不符合')
                    }
                     //等待整个数据回来以后，才进行相册图片的渲染   延迟200毫秒初始化                
                    setTimeout(function () {
                        $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
                    }, 200);

                })
            },
            // 定义一个分页获取商品评论数据的方法
            getCommentList(){
                var url=`/site/comment/getbypage/goods/${this.$route.params.goodsid}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
                this.$ajax.get(url).then(res=>{
                    // 将当前商品的已有评论数据赋值
                    this.commentList=res.data.message;
                    //获取到评论数据总条数
                     this.totalcount = res.data.totalcount;
                })
            },
            //定义一个用户提交评论的方法
         postComment(){
        //    获取用户输入的评论数据
          var url="/site/validate/comment/post/goods/" + this.goodsid;
            this.$ajax.post(url,{ commenttxt: this.commentTxt}).then(res=>{
                if(res.data.status==1){
               this.$message.error(res.data.message);
               return;
                }
                // 提交成功以后的处理
                 this.getCommentList();
                //  清空文本框
                 this.commentTxt='';
                
            })
         },
        //  定义两个分页组件的事件
        sizeChange(size){
          this.pageSize=size;
        //   重新获取数据
          this.getCommentList();
        },
        pageChange(index){
           this.pageIndex=index;
           //   重新获取数据
            this.getCommentList();
        }

        },
    }


</script>
<style>
    /* 导入jqimgzoon中的css样式 */

    @import url("../../src/statics/jqplugins/jqimgzoom/css/magnifier.css");

    .img {
        border: 1px solid #ccc;
        width: 50px;
        height: 50px;
        position: absolute;
        transition: all 0.5s;
    }
</style>