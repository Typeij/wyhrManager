<template>
  <div class="layout">
<!-- 布局 -->
    <el-container>
      <el-header>
        <!-- logo -->
        <el-row>
      <el-col :span="20"><div class="grid-content bg-purple" style="height:100%">
        <img src="../../assets/wylogo.00dc248d.png" alt="" style="width: 50px;height:50px;" >
        </div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light">
            <span>{{ this.usename }}</span>欢迎登录,  <span @click="cj()">登出</span>
        </div></el-col>
    </el-row>

      </el-header>
      <el-container>
        <el-aside width="210px">
            <!-- 侧边导航 -->
            <MenuBarVue :menuList="data"/>
            </el-aside>
        <el-main>
         
               <!-- 配置二级路由出口 -->
               <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

// 导入 menubar 侧边栏组件


import MenuBarVue from './menu/menu';
import router from '../../router';
import { menuApi } from '../../request/chaxushangping'
import BreadItem from './biaoq/breadItem.vue';
export default {
    data(){
        return{
            data:[],
            usename:''
        }
    },
    components: {
    MenuBarVue,
    BreadItem
},
    created(){
         let iconArr = ["el-icon-suitcase", "el-icon-box", "el-icon-collection-tag", "el-icon-pie-chart", "el-icon-collection-tag", "el-icon-pie-chart"]
        menuApi({}).then((res) => {
            console.log(res)
             this.data = res.data.filter((v,k)=>{
                v.icon= iconArr[k]
                return v
            })
      
        })
        this.usename=localStorage.getItem('truename')
    },
    methods:{
        cj(){
            localStorage.removeItem('token')
            // localStorage.removeItem('user')
            router.push('/login')
        }
    }
};



</script>
<style lang="less" scoped>
.el-header{
    background: #000000;
    .el-row{
        height: 100%;
        .el-col{
            height: 100%;
            .grid-content.bg-purple{
                display: flex;
                align-items: center;

            }
            .grid-content.bg-purple-light{
                height: 100%;
                color: white;
                display: flex;
                align-items: center;
            }
        }
    }
}
.el-aside{
    background: #545c64;
    height: 100%;
}
.el-container{
    height: 100%;
}
.layout{
    height: 100%;
}
.el-main{
    padding: 10px;
    background:#dcdcdc;
}
</style>

