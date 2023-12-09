<template>
    <div class="box">
        <div class="dbox">

            <BreadItem />
            <!-- 分割线 -->
            <!-- <el-divider></el-divider> -->
            <!-- 行内表单 -->

            <el-input placeholder="请输入内容" v-model="params.keyword" style="margin-bottom:10px">
                <el-button slot="append" icon="el-icon-search" size="mini" style="width:30px;" @click="ser()"></el-button>
                <el-button slot="append" size="mini" @click="remake()">重置</el-button>

            </el-input>
            <!-- 表格 -->
            <el-table :data="dataList" border style="width: 100%">
                <el-table-column prop="sp_shopname" label="店铺名称" width="300">
                </el-table-column>
                <el-table-column prop="sp_address" label="店铺地址" width="300">
                </el-table-column>
                <el-table-column prop="sp_man" label="负责人" width="290">
                </el-table-column>
                <el-table-column prop="sp_tel" label="负责人电话" width="200">
                </el-table-column>
             
                <el-table-column  label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button @click="showMap" type="text" size="small">查看地图</el-button>
                        <el-button @click="emit(scope.row)" type="text" size="small">编辑</el-button>
                        <template>
                        <el-popconfirm
      title="确认是否删除"
      @confirm="del(scope.row)"
    >
      <el-button slot="reference" type="text" style="color:red">删除</el-button>
    </el-popconfirm>
    </template>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background page-size="3" @current-change="page" layout="prev, pager, next" :total="pagetotal">
            </el-pagination>
            <!-- 编辑弹窗 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.sp_username" autocomplete="off"></el-input>
        </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.sp_password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
              <el-input v-model="form.sp_man" autocomplete="off"></el-input>
            </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.sp_tel" autocomplete="off"></el-input>
            </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="form.sp_address" autocomplete="off"></el-input>
            </el-form-item>
                    <el-form-item label="经纬度" :label-width="formLabelWidth">
              <el-input v-model="form.sp_coord" autocomplete="off"></el-input>
            </el-form-item>
                    <el-form-item label="店铺名称" :label-width="formLabelWidth">
              <el-input v-model="form.sp_shopname" autocomplete="off"></el-input>
            </el-form-item>
                       <div class="map">
                     <!-- 调用组件: 地图插件提供 -->
                  <baidu-map
                    style="height: 400px; width: 100%"
                    :center="{ lng: 114.414917, lat: 30.495455 }"
                    :zoom="15"
            @click="handleMapClick"
                  ></baidu-map>
                   点击的坐标：{{ clickedCoordinate }}
               </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okyemit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 地图弹窗 -->
    <el-dialog title="收货地址" :visible.sync="isShow">
           <div class="map">
                 <!-- 调用组件: 地图插件提供 -->
              <baidu-map
                style="height: 400px; width: 100%"
                :center="{ lng: 114.414917, lat: 30.495455 }"
                :zoom="15"
           
               
              ></baidu-map>
                  <!-- <div v-if="clickedCoordinate"> -->
         
        <!-- </div> -->
           </div>
    </el-dialog>
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
import { fendianListApi } from '../../request/fendianList'
import { emitApi } from '../../request/fendianList'
import { delApi } from '../../request/fendianList';


export default {
    components: {
        BreadItem
    },
    data() {
        return {
            params: {
                pageSize: 3,
                pageNum: 1,
                keyword: ''
            },
              form: {
                sp_username: '',
                sp_password: '',
                sp_man: '',
                sp_tel: '',
                sp_address: '',
                sp_coord: '',
                sp_shopname: '',
                sp_id:""
            },
            formLabelWidth: '120px',
            dataList: [],
            pagetotal: "",
            dialogFormVisible: false,//编辑
            isShow: false,
            //  center: { lng: 114.414917, lat: 30.495455 },
            clickedCoordinate: null
            

        }
    },

    created() {
        this.show()//渲染处方
    },
    methods: {
        show() {
            fendianListApi(this.params).then(res => {
                console.log(res.data)
                this.dataList = res.data
                this.pagetotal = res.total
                console.log(res.total);

            })

        },
        page(id) {
            console.log(id);
            this.params.pageNum = id
            this.show()

        },
        ser() {
            console.log(this.params.keyword);
            let keyword = this.params.keyword
            this.show()
        },
        remake() {
            this.params.pageNum = 1
            this.params.pageSize = 3
            this.params.keyword = ''
            this.show()
        },
        emit(emitnum){
            console.log(emitnum)
            this.dialogFormVisible=true
            this.form.sp_username=emitnum.sp_username
            this.form.sp_address=emitnum.sp_address
            this.form.sp_shopname=emitnum.sp_shopname
            this.form.sp_tel=emitnum.sp_tel
            this.form.sp_coord = emitnum.sp_coord
            this.form.sp_password =emitnum.sp_password
            this.form.sp_man =emitnum.sp_man
            this.form.sp_id = emitnum.sp_id
        },
        okyemit(){
            this.dialogFormVisible = false
            
            emitApi(this.form).then(res=>{
                 if(res.code==200){
                    console.log(res);
                    this.show()
                 }
            })

        },
        del(delnum){
            console.log(delnum);
            let sp_id=delnum.sp_id
            delApi({sp_id}).then(res=>{
                if(res.code==200){
                    console.log(res);
                    this.show()
                }
            })

            
        },
        handleClick(ids) {
            console.log(ids)

            this.$router.push('/tagdet/?tag_id=' + ids.tag_id);
        },
            showMap() {
            this.isShow = !this.isShow
        },
        handleMapClick({ point }) {
            // 获取点击位置的经纬度坐标
            this.form.sp_coord = ` ${point.lng.toFixed(6)}, ${point.lat.toFixed(6)}`;
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
</style>

