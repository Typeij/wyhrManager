<template>
    <div class="box">
        <div class="dbox">

            <BreadItem />
            <!-- 分割线 -->
            <!-- <el-divider></el-divider> -->
            <!-- 行内表单 -->
    <el-card class="box-card">
      <div  class="scroll-container">
     <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.sp_username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.sp_password"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="formLabelAlign.sp_man"></el-input>
      </el-form-item>
            <el-form-item label="电话">
            <el-input v-model="formLabelAlign.sp_tel"></el-input>
          </el-form-item>
                <el-form-item label="地址">
            <el-input v-model="formLabelAlign.sp_address"></el-input>
          </el-form-item>
                <el-form-item label="经纬度">
            <el-input v-model="formLabelAlign.sp_coord"></el-input>
          </el-form-item>
                <el-form-item label="店铺名称">
            <el-input v-model="formLabelAlign.sp_shopname"></el-input>
          </el-form-item>

<!-- 地图 -->
               <div class="map">
                    
                  <baidu-map
                    style="height: 300px; width: 100%; padding-left:20px"
                    :center="{ lng: 114.414917, lat: 30.495455 }"
                    :zoom="15"
           @click="handleMapClick"
               
                  ></baidu-map>
               </div>
    <el-button type="primary" style="margin-left:100px" @click="join()">入驻</el-button>
    <el-button >取消</el-button>
  
    </el-form>
      </div>
    </el-card>

            <!-- 表格 -->
   
            <!-- 分页 -->

            <!-- 编辑弹窗 -->

        </div>
    </div>
</template>

<script>
import Vue from "vue";
import BaiduMap from "vue-baidu-map";
// 将baidumap 注册成vue 插件
Vue.use(BaiduMap, {
    // appKey ： 百度开发平台 注册开发者账号
    // 公司注册
    ak: "mlAZkeyRbuGmpaNQdeze0bAFYeG9gbK8",
});
import BreadItem from '../layout/biaoq/breadItem.vue';
import { fendianjoinApi } from '../../request/fendianJoin'



export default {
    components: {
        BreadItem
    },
    data() {
        return {

            formLabelAlign: {
                sp_address: '',
                sp_coord: '',
                sp_man: '',
                sp_password: '',
                sp_shopname:'',
                sp_tel:'',
                sp_username:''
            },



        }
    },

    created() {

    },
    methods: {
                    handleMapClick({ point }) {
            // 获取点击位置的经纬度坐标
            this.formLabelAlign.sp_coord = ` ${point.lng.toFixed(6)}, ${point.lat.toFixed(6)}`;
        },
        join(){
            console.log(this.formLabelAlign)
            fendianjoinApi(this.formLabelAlign).then(res=>{
                if(res.code==200){
                    console.log(res);
                    
                }
            })
        }
        

    },

}
</script>

<style lang="less" scoped>
.box {
    height: 100%;
    background-color: white;

    .dbox {
        height: 100%;
        padding: 10px 10px 0px 10px;
        /* background-color: red; */
    }
}

.el-input-group__append {
    height: 40px;
}

.el-button {
    margin: 5px;
}
.el-card{
    // overflow-y:auto ;
    height: 550px;
    overflow: auto;
}
.scroll-container{
    height: 100%;
    
}
</style>

