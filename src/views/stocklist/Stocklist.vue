<template>
    <div class="box">
        <div class="dbox">

            <BreadItem />
            <!-- 分割线 -->
            <!-- <el-divider></el-divider> -->
            <!-- 行内表单 -->
     <el-form :inline="true"  class="demo-form-inline">
                         <el-form-item>
                        <el-input v-model="params.commonName" placeholder="通用名称" size="small"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="params.sixninecode" placeholder="药品编号" size="small"></el-input>
                        </el-form-item>
                                 <el-select v-model="params.sp_id" size="small" placeholder="请选择" v-if="loginType == 3">
                                <el-option
                                v-for="item in options"
                                :key="item.sp_id"
                                :label="item.sp_shopname"
                                :value="item.sp_id">
                                    </el-option>
                                </el-select>
                             <el-button type="primary" size="small" @click="ser()">查询</el-button>
                             <el-button size="small" @click="remake()">重置</el-button>

        </el-form>

            <!-- 表格 -->
            <el-table :data="dataList" height="400" border style="width: 100%">

                <el-table-column prop="commonName" label="通用名称" width="180">

                </el-table-column>
                <el-table-column prop="drugName" label="药品名称">
                </el-table-column>
                <el-table-column prop="manufacturer" label="厂家">
                </el-table-column>
                <el-table-column prop="buyingPriceStr" label="零售价">
                </el-table-column>
                <el-table-column prop="packaging" label="药品规格">
                </el-table-column>
                <el-table-column prop='fullImg' label="参考图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.bannerImg" alt="参考图片" style="max-width: 100px; max-height: 100px" />
                    </template>
                </el-table-column>
                                <el-table-column prop="stock" label="库存" >
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <!-- 入库and出库 -->
                    <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="input(scope.row)">入库</el-button>
                      <el-button type="primary" size="mini" @click="output(scope.row)">出库</el-button>
                      </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background page-size="5" @prev-click="left" @next-click="next" @current-change="dangq"
                :current-page="currentPage4" layout="prev, pager, next" :total="dataLength">
            </el-pagination>
            <!-- 入库弹窗 -->
            <el-dialog
   
      title="商品入库"
        :visible.sync="dialogVisible"
      width="20%"
      :before-close="handleClose">
        <!-- 步进器 -->
        <template >
      <el-input-number v-if="this.istorf==true" v-model="num" @change="handleChange" :min="0" :max="Infinity" label="描述文字" style="margin-left:40px"></el-input-number>
      <el-input-number v-if="this.istorf==false" v-model="num" @change="handleChange" :min="0" :max="this.stockList" label="描述文字" style="margin-left:40px"></el-input-number>
    </template>
    
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
            
        <el-button type="primary" @click="okinput()">确 定</el-button>
      
      </span>
    </el-dialog>
        </div>
    </div>
</template>

<script>
import BreadItem from '../layout/biaoq/breadItem.vue';
import { kucunApi } from '../../request/stock'
import { outApi } from '../../request/stock'
import { fendianallApi } from '../../request/doclist';

export default {
    components: {
        BreadItem
    },
    data() {
        return {
             dialogVisible: false,//弹窗
             num: 0,//步进器
            dataList: [],
            inpubox:"",//入库
            outbox:'',//出库
            istorf:"",
            params: {
                sixninecode:'',
                commonName:"",
                pageSize: 5,
                pageNum: 1,
                sp_id: ''
            },
            loginType:'',
            options:'',
            stockList:''
            
        }
    },

    created() {
    this.show()
    this.loginType=localStorage.getItem('loginType')
    fendianallApi({}).then(res=>{
            console.log(res.data);
            this.options=res.data
    })
            this.params.sp_id=2
                this.ser()
    },
    methods: {
        inputs(){
            //出入库接口
            outApi({ mp_id, stock }).then(res => {
                console.log(res);
            })
        },

        show(){
            // 检查可选参数是否为空
            if (this.params.sixninecode === '' && this.params.commonName === ''&&this.params.value==='') {
                // 三个参数都为空，从 params 中删除它们
                delete this.params.sixninecode;
                delete this.params.commonName;
                delete this.params.value;
            } else if (this.params.sixninecode === '') {
                // sixninecode 为空，删除它
                delete this.params.sixninecode;
            } else if (this.params.commonName === '') {
                // commonName 为空，删除它
                delete this.params.commonName;
            } else if (this.params.value === '') {
                // value 为空，删除它
                delete this.params.value;
            }
            kucunApi(this.params).then((res) => {
                console.log(res);
                console.log(res.total);
                this.dataLength = res.total
                console.log(this.dataLength);

                this.dataList = res.data
                console.log(this.dataList);

            })
        },
        //下一页
        next() {
            console.log(111);
            this.params.pageNum += 1
            this.show()

        },
        //页码跳转
        dangq(page) {
            console.log(page);
            this.params.pageNum = page
            this.show()


        },
        //上一页
        last() {
             this.params.pageNum -= 1
            this.show()
        },
        input(id){
            this.num=0
            this.istorf=true
            console.log(id);
            this.dialogVisible=true//控制弹出框
            this.inpubox=id
            
        },
        okinput(){
            this.dialogVisible = false
            if(this.istorf){
                 console.log(this.num)
                console.log(this.inpubox.mp_id);
                let mp_id = this.inpubox.mp_id
                let stock = this.num
                outApi({ mp_id, stock }).then(res => {
                    console.log(res);
                    this.$message.success("入库成功")
                    this.show()
                })
            }else{
               let mp_id = this.outbox.mp_id
                let stock = -(this.num)
                console.log(stock);               
                outApi({ mp_id, stock }).then(res => {
                    console.log(res);
                    this.$message.success("出库成功")
                    this.show()
                })
            }
           
           
        },
        output(ids){
            this.num = 0
            this.istorf=false
            this.stockList=ids.stock
            console.log(this.stockList);
            this.dialogVisible = true//控制弹出框
            this.outbox=ids
        },
        ser(){
                // sixninecode: '',
                // commonName: "",
                // console.log(this.params.value);
            // let value=this.params.sp_id
            // let commonName=this.params.commonName
            // let sixninecode=this.params.sixninecode
            // console.log(commonName,sixninecode,value);
            this.show()
        },
        remake(){
                this.params.sixninecode = "",
                this.params.commonName = "",
                this.params.pageNum = 1,
                this.params.pageSize = 5
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

.el-button {
    margin: 5px;
}
</style>

