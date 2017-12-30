<template>
<div class="tmpl">
    
<input type="text" v-model="amount">
<el-button type="success" size="small" @click="pay">支付</el-button>

</div>
</template>
<script>
    export default{
        data(){
            return{
             orderid: this.$route.params.orderid,
             amount: 0
            }
        },
        mounted(){
           this.getorderdetial();
        },
        methods:{
          //根据id获取订总单金额
          getorderdetial(){
              var url='/site/validate/order/getorderdetial/'+this.orderid;
              this.$ajax.get(url).then(res=>{
                  this.amount=res.data.message.orderinfo.order_amount;
              })
          },
        //   支付
          pay(){
            var url='/site/validate/order/pay/'+this.orderid;
            this.$ajax.get(url).then(res=>{
               if(res.data.status==1){
                //    支付失败
                this.$message.error(res.data.message);
                return;
               }
            //    支付成功跳转页面提示用户，在手机浏览器信息展示
               this.$route.push({ name: 'paysuccess'});
            })
          },
        },
    }
</script>
<style lang="">
    .tmpl{
        width: 200px;
        height: 100px;
        border:1px solid #666;
        margin: 100px  auto;
    }
</style>
