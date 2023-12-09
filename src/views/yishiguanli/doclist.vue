<template>
    <div class="box">
        <div class="dbox">

            <BreadItem />
            <!-- 分割线 -->
            <!-- <el-divider></el-divider> -->
            <!-- 行内表单 -->

            <el-input placeholder="请输入内容" v-model="params.keyword" style="margin-bottom:10px">
                <el-button slot="prepend" size="mini" @click="add()">添加</el-button>
                <el-button slot="append" icon="el-icon-search" size="mini" style="width:30px;" @click="ser()"></el-button>
                <el-button slot="append" size="mini" @click="remake()">重置</el-button>

            </el-input>
            <!-- 表格 -->
            <el-table :data="dataList" border style="width: 100%">
                <el-table-column prop="username" label="账号" width="300">
                </el-table-column>
                <el-table-column prop="password" label="密码" width="300">
                </el-table-column>
                <el-table-column prop="truename" label="姓名" width="290">
                </el-table-column>
                <el-table-column prop="tel" label="电话" width="200">
                </el-table-column>
                
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                       
                        <el-button @click="emit(scope.row)" type="text" size="small">编辑</el-button>
                        <template>
                            <el-popconfirm title="确认是否删除" @confirm="del(scope.row)">
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
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.truename" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="form.tel" autocomplete="off"></el-input>
                    </el-form-item>
                      <el-form-item label="分店"  :label-width="formLabelWidth" >
                        <el-select v-model="sp_shopname" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                            :key="item.sp_id"
                        :label="item.sp_shopname"
                        :value="item.sp_id">
                        </el-option>
                    </el-select>
                    </el-form-item>
   
         
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addoremit ? addok() : okyemit()">确 定</el-button>
          
                </div>
                 <!-- {{ this.form.sp_id }} -->
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
import { doclistApi } from '../../request/doclist'
import { updatedocApi } from '../../request/doclist'
import { deldocApi } from '../../request/doclist';
import { fendianallApi } from '../../request/doclist';


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
                username: '',
                password: '',
                truename: '',
                tel: '',
                sp_id: "",
                doc_id:'',
             
                
            },
            sp_shopname: '',
            formLabelWidth: '120px',
            dataList: [],
            pagetotal: "",
            dialogFormVisible: false,//编辑
            isShow: false,
            //  center: { lng: 114.414917, lat: 30.495455 },
            clickedCoordinate: null,
            options:[],
            addoremit:''


        }
    },

    created() {
        this.show()//渲染处方
    },
    mounted(){
        fendianallApi({}).then(res=>{
            if(res.code==200){
                this.options=res.data
                console.log(this.options);
                
            }
        })
    },
    methods: {
        show() {
            doclistApi(this.params).then(res => {
                console.log(res.data)
                this.dataList = res.data
                this.pagetotal = res.total
                console.log(res.total);

            })

        },
        upadte(data){
            updatedocApi(data).then(res => {
                if (res.code == 200) {
                    console.log(res);
                }
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
        emit(emitnum) {
            console.log(emitnum)
            console.log(this.options)
             this.addoremit = false
            this.dialogFormVisible = true

            this.form.doc_id=emitnum.doc_id
            this.form.username = emitnum.username
            this.form.tel = emitnum.tel
            this.form.password = emitnum.password
            this.form.truename = emitnum.truename
            this.form.sp_id = emitnum.sp_id

     

            // 遍历this.options数组中的每个对象
            this.options.forEach(option => {
                // 检查当前对象是否包含sp_id属性
                if (option.hasOwnProperty('sp_id')) {
                    // 检查sp_id是否与emitnum.sp_id匹配
                    if (option.sp_id === emitnum.sp_id) {
                        console.log(option.sp_id, emitnum.sp_id);
                        
                        // 如果匹配，将sp_shopname添加到this.sp_shopname数组中
                        this.sp_shopname=option.sp_shopname
                        // console.log(564564);
                        
                    }
     
                }
            });

                console.log(this.sp_shopname);


          
        },
        okyemit() {
            this.dialogFormVisible = false
           this.form. sp_id=this.sp_shopname
            console.log(this.form);
            
            this.upadte(this.form)
            this.show()



        },
        del(delnum) {
            console.log(delnum);
            let doc_id= delnum.doc_id
            deldocApi({ doc_id }).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.show()
                }
            })


        },
        add(){
                   this.dialogFormVisible = true,
                  this.addoremit=true,
                  console.log(111111);
                this.form. username= '',
                this.form. password= '',
                this.form.truename= '',
                this.form.tel= '',
                this.form.sp_id= "",
                this.form.doc_id= ''  
                this.sp_shopname = ''  
        },
        addok(){
               this.dialogFormVisible = false
               let obj={
                    username:this.form.username,
                    password:this.form.password,
                    truename:this.form.truename,
                    tel:this.form.tel,
                   sp_id:this.sp_shopname
               }
          
            console.log(obj)
            this.upadte(obj)
            this.show()

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

