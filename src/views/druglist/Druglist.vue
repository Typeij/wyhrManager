<template>
    <div class="box">
        <div class="dbox">
                    <BreadItem/>
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
                        <el-form-item>
                            <!--选择框  -->
                            <template>
                            <el-select v-model="params.md_id" placeholder="药品分类" size="small">
                                <!-- 待遍历 -->
                            <el-option
                                    
                                    v-for="item in yaopType"
                                    :key="item.md_id"
                                    :label="item.md_name"
                                    :value="item.md_id">
                            </el-option>
                            </el-select>
                            </template>
                            </el-form-item>

                            <el-form-item>
                                <template>
                                <el-select v-model="params.hm_id" placeholder="适应人群" size="small">
                                <el-option
                        
                                        v-for="item in people"
                                        :key="item.hm_id"
                                        :label="item.hm_type"
                                        :value="item.hm_id">
                                </el-option>
                                </el-select>
                                </template>
                        </el-form-item>
                         <el-button type="primary" size="small" @click="ser()">查询</el-button>
                         <el-button size="small" @click="remake">重置</el-button>
                </el-form>
                <!-- 表格 -->
                <el-table
        :data="dataList"
        height="400"
        border
        style="width: 100%">

        <el-table-column
          prop="commonName"
          label="通用名称"
          width="180">
        
        </el-table-column>
        <el-table-column
          prop="drugName"
          label="药品名称">
        </el-table-column>
                <el-table-column
              prop="manufacturer"
              label="厂家">
            </el-table-column>
                    <el-table-column
              prop="buyingPriceStr"
              label="零售价">
            </el-table-column>
                    <el-table-column
              prop="packaging"
              label="药品规格">
            </el-table-column>
                    <el-table-column
              prop='fullImg'
              label="参考图片">
               <template slot-scope="scope">
        <img :src="scope.row.fullImg" alt="参考图片" style="max-width: 100px; max-height: 100px" />
      </template>
            </el-table-column>
                    <el-table-column
              prop="isrecord"
              label="上下架"
               width="100px">
              <template slot-scope="scope">
              <el-switch 
        v-model="scope.row.isrecord"
      @change="change(scope.row)"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>      
    </template>

            </el-table-column>
    <el-table-column
      label="详情"
      width="100px">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="openDrawer(scope.row)">详情</el-button>
      </template>
    </el-table-column>


      </el-table>
    <el-drawer 
    title="药品详情"  
    :visible.sync="drawer" 
    :with-header="true">
                    <el-descriptions column="1">
        <el-descriptions-item label="通用名称"><span>{{selectedData.commonName }}</span></el-descriptions-item>
        <el-descriptions-item label="药品名称">{{ selectedData.drugName }}</el-descriptions-item>
        <el-descriptions-item label="药品编号">{{selectedData.sixninecode }}</el-descriptions-item>
        <el-descriptions-item label="禁忌">{{selectedData.taboo }}</el-descriptions-item>
        <el-descriptions-item label="规格">{{selectedData.productStandard }}</el-descriptions-item>
        <el-descriptions-item label="单价">{{selectedData.buyingPriceStr }}</el-descriptions-item>
        <el-descriptions-item label="注意事项">{{selectedData.announcements }}</el-descriptions-item>
        <el-descriptions-item label="厂家">{{selectedData.manufacturer }}</el-descriptions-item>
        <el-descriptions-item label="成分">{{selectedData.characters }}</el-descriptions-item>
        <el-descriptions-item label="包装">{{selectedData.packaging }}</el-descriptions-item>
        <el-descriptions-item label="批文">{{selectedData.approvalNumber }}</el-descriptions-item>
        <el-descriptions-item label="储藏方式">{{selectedData.storeUp }}</el-descriptions-item>
        <el-descriptions-item label="不良反应">{{selectedData.drugInteraction }}</el-descriptions-item>
        <el-descriptions-item label="药品来源">{{selectedData.sp_shopname }}</el-descriptions-item>
        <el-descriptions-item label="参考图片">
            {{selectedData.drugInteraction }}
     <img width="200" :src="selectedData.fullImg" alt="">
        </el-descriptions-item>

    </el-descriptions>
    </el-drawer>


      <!-- 分页 -->
      <el-pagination
      background
      page-size="5"
      @prev-click="left"
      @next-click="next"
      @current-change="dangq"
      :current-page="currentPage4"
      layout="prev, pager, next"
      :total="dataLength">
    </el-pagination>
             
        </div>
    </div>
</template>

<script>
import BreadItem from '../layout/biaoq/breadItem.vue';
import { shangpingApi } from '../../request/chaxushangping'
import { groundingApi } from '../../request/chaxushangping'
import { yaopTypeApi } from '../../request/chaxushangping'
import { peopleApi } from '../../request/chaxushangping'
export default {

    components: {
           BreadItem 
    },
    data(){
        return{
                   params: {
                hm_id: "",
                md_id: "",
                sixninecode:'',
                commonName:"",
                pageSize: 5,
                pageNum: 1,
 
            },
            dataList:[],
            drawer: false,
             dataLength:'',
             pageSize:5,
             pageNum:1,
           selectedData:'',//详情
           yaopType:[],
           people:[]
            
        }
    },

    created(){
    this.show() //展示调用
    this.yaop()
    this.peo()
        
    },
        methods: {
        yaop(){
            yaopTypeApi({}).then(res => {//药品分类
                console.log(res.data)
                this.yaopType = res.data
            })
        },
        peo(){
            peopleApi({}).then(res => {//适用人群
                console.log(res.data)
                this.people = res.data
            })
        },
        show() {
            shangpingApi(this.params).then((res) => {
                console.log(res.data);
                console.log(this.params.commonName);
                this.dataLength = res.total
                console.log(this.dataLength);
                this.dataList = res.data
                console.log(this.dataList);

            })
        },
        //下一页
        next() {
            console.log(111);
            this.params.pageNum+=1
            this.show()
            
        },
        //页码跳转
        dangq(page){
            console.log(page);
            this.params.pageNum =page
            this.show()
            
            
        },
        //上一页
        last() {
            this.params.pageNum -=1
            this.show()
        },
        //上下架
        change(newValue){
            console.log(newValue);
            let mp_ids = newValue.mp_id
            let record=''
           if( newValue.isrecord){
                 record=1
           }else{
                 record=0
           }
           console.log(record,mp_ids);
            groundingApi({ record, mp_ids}).then(res=>{
                console.log(res);
                if(res.code==200){
                    this.$message.success(res.msg)
                }
            })

        },
        //抽屉
    openDrawer(item) {
            this.selectedData = item; // 存储选中的数据
            this.drawer = true; // 打开 el-drawer
        },
        //重置
        remake(){

            this.params.hm_id="",
            this.params.md_id="",
            this.params.sixninecode="",
            this.params.commonName="",
            this.params.pageNum=1,
            this.params.pageSize=5
            this.show()
        },
        //搜索
        ser(){
          let commonName=this.params.commonName
          let sixninecode=this.params.sixninecode
        let md_id=this.params.md_id
       let  hm_id=this.params.hm_id
            console.log(commonName,sixninecode,md_id,hm_id);
            this.show()
        }
    },
}
</script>

<style lang="less" scoped>
    .box{
        height: 100%;
        background-color: white;
        .dbox{
            height: 100%;
            padding: 10px 10px 0px 10px;
            /* background-color: red; */
    }
    }
    .el-button{
        margin: 5px;
    }
</style>

