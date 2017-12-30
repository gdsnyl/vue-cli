<template>
    <div class="subtmpl">
       <ul>
           <li @click="sub">-</li>
           <li>{{count}}</li>
           <li @click="add">+</li>
       </ul>
    </div>
</template>
<script>
export default{
    data(){
        return{
          count:1,//当前购买的数量
        }
    },
     // obj的格式：{gid:商品id,count:当前商品的购买数量}
    props:['obj'],
    mounted(){
        // 将传入的商品购买数量赋值给this.count
       this.count=this.obj.count;
    },
    methods:{
       add(){
           this.count++;
           // 将最新的数量传递给父组件
           this.notice();
       },
       sub(){
           if(this.count<=1){
              this.count=1;
              return ;
           }
           this.count--;
         //    将最新的数量传递给父组件
           this.notice();
       },
       notice(){
        //    调用$emit触发事件
        this.$emit('msg',{gid:this.obj.gid,count:this.count});
       }
    }
}

</script>
<style>
    .subtmpl ul{
      width: 120px;
    }
    .subtmpl li{
     list-style: none ;
     display: inline-block;
     width: 30px;
     border:  1px solid #666; 
     text-align: center;
     cursor: pointer;
     padding: 2px;
     background-color: #0094ff;
     color: #fff;
     font-size: 16px;
    }
</style>