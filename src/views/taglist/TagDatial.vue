<template>
  <!-- 画布节点 -->
  <div class="all" ref="all">
<!-- <h3>开放详情</h3> -->
   <!-- <p>{{ $route.query.tag_id }}</p>  -->
   <div class="nav"> 
   <el-page-header v-if="dataList" @back="$router.go(-1)">    

      <span slot="content"   >姓名: {{this.dataList.patient_name }}　| 年龄: {{ this.dataList.patient_age }}　| 性别:{{ this.dataList.patient_sex }}　</span>
  <!-- printConfig 打印配置项 -->
        <el-button type="primary" slot="content" size="mini" v-print>打印处方</el-button>
        <el-button type="success" slot="content" size="mini" @click="download()">下载处方</el-button>
    </el-page-header>
    </div>
    <div class="chuf">
    <el-descriptions title="处方信息" column="4">
        <el-descriptions-item label="处方编号">{{ this.dataList.tag_number }}</el-descriptions-item>
        <el-descriptions-item label="医师姓名">{{ this.dataList.doctor_name }}</el-descriptions-item>
        <el-descriptions-item label="患者姓名">{{ this.dataList.patient_name }}</el-descriptions-item>
        <el-descriptions-item label="患者年龄">{{ this.dataList.patient_age }}</el-descriptions-item>
        <el-descriptions-item label="患者性别">{{ this.dataList.patient_sex }}</el-descriptions-item>
        <el-descriptions-item label="诊断结果">{{ this.dataList.result }}</el-descriptions-item>
        <el-descriptions-item label="处方金额">{{ this.dataList.total_price }}</el-descriptions-item>
        <el-descriptions-item label="开方时间">{{ this.dataList.create_time }}</el-descriptions-item>
    </el-descriptions>
    </div>
    <div class="tab">
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>药品信息</span>
       
      </div>
      <div >
               <!-- 表格 -->
             <el-table
            :data="dataList.mplist"
            border
            style="width: 100%">
            <el-table-column
              prop="commonName"
              label="通用名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="drugName"
              label="药品名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="buyingPriceStr"
              label="零售价">
            </el-table-column>
                        <el-table-column
                  prop="productStandard"
                  label="药品规格">
                </el-table-column>
                            <el-table-column
                  prop="address"
                  label="参考图片">
                <template slot-scope="scope"> 
                <img :src="scope.row.fullImg" alt="" style="width: 100px;height:100px"  >
                </template>
                </el-table-column>
          </el-table>
      </div>
    </el-card>
            <!-- <el-descriptions title="药品信息" column="1"> -->

        <!-- </el-descriptions> -->
    </div>
  </div>
</template>

<script>
import canvas from 'html2canvas'
import { chufDatApi } from '../../request/tagList'


export default {

    data(){
        return{
           dataList:"",
             imageLightboxOpen: false,
            imageLightboxImages: [],
            imageLightboxIndex: 0
        }
    },
    created(){
       let tag_id=this.$route.query.tag_id
        console.log(tag_id)
        chufDatApi({tag_id}).then(res=>{
            console.log(res.data)
            this.dataList=res.data
                console.log(this.dataList.mplist);
            
        })
    },
    methods:{
          goBack() {
            
        },//画布 自定义图片 前端能够在画布上自行绘制内容,快速的将dom节点绘制在画布上
    download(){
      //创建画布
     let ele=this.$refs.all
     console.log(ele);
     
      canvas(ele).then(res=>{
    //  console.log(res);
       let imageUrl= res.toDataURL("image/png");
       //下载图片
       let a=document.createElement("a");
        a.href=imageUrl;
       a.download="wanyun.png";
       a.click();

    

      })
    }
    }
}
</script>

<style lang="less" scoped>
.nav{
    padding-left: 30px;
    height: 70px;
    display: flex;
    align-items: center;
    // margin-left: 30px;
    //底部阴影
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.1);

}
.chuf{
    margin-top: 70px;
    padding-left: 30px;
     box-shadow: 1px 2px 1px -1px rgba(0.1,0,0,0.1);
     
    }
.tab{
     margin-top: 70px;

}

</style>