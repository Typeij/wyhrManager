<template>
<div class="dbox">
        <div class="left">
            <h3>药品信息</h3>
    <el-divider></el-divider>
         <el-select v-model="seleArr" multiple placeholder="请选择" style="width: 100%;">
        <el-option
          v-for="item in dataList"
          :key="item.value"
          :label="item.commonName"
          :value="item.mp_id">
                <el-table
                border
                :show-header="false"
                :data="[item]"
               >
                <el-table-column
                    prop="commonName"
                    label="日通用名称期"
                   >
                </el-table-column>
                <el-table-column
                    prop="buyingPriceStr"
                    label="单价"
                   >
                </el-table-column>
                <el-table-column
                    prop="productStandard"
                    label="规格">
                </el-table-column>
                </el-table>

            </el-option>
      </el-select>
       <el-divider content-position="center" >请填写药品用量(￥{{total}})</el-divider>
        <!-- 表格 -->
          <el-table
        :data="newData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="commonName"
          label="通用名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="buyingPriceStr"
          label="单价"
          width="180">
        </el-table-column>
        <el-table-column
          prop="numbers"
          label="用量">
            <template slot-scope="scope">
     <el-input-number v-model="scope.row.sell_number" size="mini"  label="描述文字"></el-input-number>
            </template>
        </el-table-column>
                <el-table-column
              prop="address"
              label="总价">
              <template slot-scope="scope">
                {{ scope.row.buyingPriceStr*scope.row.sell_number }}
              </template>
            </el-table-column>
      </el-table>

        </div>
        <div class="shuxian"></div>
        <div class="right">
                            <h3>患者信息</h3>
        <el-divider></el-divider>
        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="患者姓名">
        <el-input v-model="form.patient_name"></el-input>
      </el-form-item>




      <el-form-item label="患者性别">
        <el-radio-group v-model="form.patient_sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      
                <el-form-item label="患者年龄">
                <el-input v-model="form.patient_age"></el-input>
              </el-form-item>
      <el-form-item label="诊断结果">
        <el-input type="textarea" :rows="10" v-model="form.result"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
        </div>
<!-- {{this.seleArr}} -->
</div>
</template>

<script>

// 导入 menubar 侧边栏组件


import { yishiApi } from '@/request/yishiDotag';
import { createApi } from '@/request/yishiDotag';

export default {
    data() {
        return {
            dataList:[],
            seleArr:[],
            newData:[],
            num: 1,
               form: {
                patient_name: '',
                patient_sex: '',
                patient_age: '',
                result: '',
                doc_id:localStorage.getItem('doc_id'),
                doctor_name:localStorage.getItem('truename')
            }
        }
    },
    methods: {
        onSubmit() {
            this.form.mplist =this.newData,
            this.form.total_price =this.total
            console.log(this.form);
            createApi(this.form).then(res=>{
                console.log(res);
                
            })
            
        }
    },
    created() {
            yishiApi({}).then(res=>{
                console.log(res)
                this.dataList=res.data
            })
    },
    watch: {
        seleArr: {
            handler(newVal) {
                console.log(newVal);
                this.newData = this.dataList.reduce((result, res) => {
                    if (newVal.includes(res.mp_id)) {
                        // 创建一个包含所需属性的新对象
                        const filteredRes = {
                            commonName: res.commonName,
                            buyingPriceStr: res.buyingPriceStr,
                            bannerImg: res.bannerImg,
                            mp_id: res.mp_id,
                            sell_number: 1
                        };
                        result.push(filteredRes); // 将新对象添加到结果数组中
                    }
                    return result;
                },[]);
                console.log(this.newData);
            },
        }
    },

    computed:{
        total(){
            let sum=0
            this.newData.forEach(res=>{
                sum+=res.sell_number *res.buyingPriceStr
            })
            return sum
        }
    }

};



</script>
<style lang="less" scoped>
    .left{
        width: 49%;
        height: 100%;
        // background-color: #000;
        // border: 1px solid red;
    }
      .dbox{
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .right{
            width: 49%;
        height: 100%;
        //  border: 1px solid red;

  }
  .shuxian{
    width: 1px;
     background: gainsboro;
  }
</style>

