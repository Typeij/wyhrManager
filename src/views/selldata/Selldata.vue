<template>
    <div class="box">
         <BreadItem />
        <div class="dbox" ref="echarts">

           
            <!-- 分割线 -->
            <!-- <el-divider></el-divider> -->
            <!-- 行内表单 -->


            <!-- 表格 -->

            <!-- 分页 -->
          
            <!-- 入库弹窗 -->

        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import BreadItem from '../layout/biaoq/breadItem.vue';
import { dataApi } from '../../request/data'


export default {
    components: {
        BreadItem
    },
    data() {
        return {
        
        }
    },

    mounted() {
        let ele = this.$refs.echarts;
        var myChart = echarts.init(ele);
        dataApi({}).then((res) => {
            //   console.log(res.data);
            if (res.code == 200) {
                myChart.setOption(res.data);
            }
        });
    },
    methods: {

    },

}
</script>

<style lang="less" scoped>
.box {
    height: 100%;
    background-color: white;

    .dbox {
        // width: 100%;
        height: 89%;
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

