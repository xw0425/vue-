<template>
<section class="swipe">
     <mt-swipe :auto="2000">
        <mt-swipe-item v-for="(item,i) in list" :key="i">
            <a :href="item.url">
                <img :src="item.img" alt="">
            </a>
        </mt-swipe-item>
        
    </mt-swipe>
</section> 
</template>
<script>
    export default {
        data(){
            return{
                 list:[]
            };
           
        },
        methods:{
            getLunbo(){
                  let url='http://139.199.192.48:8888/api/getlunbo';
                  this.$http.get(url).then(rep=>{
                      if(rep.body.status==0){
                          this.list=rep.body.message;
                      }
                  })
            }
        },
        created(){
            this.getLunbo();
        }
    }
</script>
<style lang="less">
    .swipe{
        height:300px;
        img{
            width:100%;
            height:100%;
        }
    }
</style>