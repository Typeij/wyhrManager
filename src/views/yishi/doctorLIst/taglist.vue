<template>
    <div class="box">
        <div class="dbox">

            <!-- 分割线 -->
            <!-- <el-divider></el-divider> -->
            <!-- 行内表单 -->

            <el-input placeholder="请输入内容" v-model="params.keyword" style="margin-bottom:10px">
                <el-button slot="append" icon="el-icon-search" size="mini" style="width:30px;" @click="ser()"></el-button>
                <el-button slot="append" size="mini" @click="remake()">重置</el-button>

            </el-input>
            <!-- 表格 -->
            <el-table :data="dataList" border style="width: 100%">
                <el-table-column prop="tag_number" label="处方编号" width="200">
                </el-table-column>
                <el-table-column prop="doctor_name" label="医师" width="200">
                </el-table-column>
                <el-table-column prop="patient_name" label="患者姓名" width="120">
                </el-table-column>
                <el-table-column prop="patient_age" label="患者年龄" width="120">
                </el-table-column>
                <el-table-column prop="patient_sex" label="患者性别" width="120">
                </el-table-column>
                <el-table-column prop="result" label="诊断结果" width="120">
                </el-table-column>
                <el-table-column prop="total_price" label="总价(￥)" width="120">
                </el-table-column>
                <el-table-column prop="create_time" label="开方时间" width="300">
                    </el-table-column>
                <el-table-column  label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background page-size="5" @current-change="page" layout="prev, pager, next" :total="pagetotal">
            </el-pagination>
            <!-- 入库弹窗 -->

        </div>
    </div>
</template>

<script>
// import BreadItem from '../../layout/biaoq/breadItem.vue';
import { kaifApi } from '../../../request/tagList'

export default {

    data() {
        return {
            params: {
                pageSize: 5,
                pageNum: 1,
                keyword: ''
            },
            dataList: [],
            pagetotal: ""

        }
    },

    created() {
        this.show()//渲染处方
    },
    methods: {
        show() {
            kaifApi(this.params).then(res => {
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
            this.params.pageSize = 5
            this.params.keyword = ''
            this.show()
        },
        handleClick(ids) {
            console.log(ids)

            this.$router.push('/tagdet/?tag_id=' + ids.tag_id);
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

