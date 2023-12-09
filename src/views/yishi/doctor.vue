<template>
  <el-container>
    <el-header>
      <div class="layout">
          <!-- 布局 -->
   
                  <!-- logo -->
                  <el-row>
                      <el-col :span="5">
                          <div class="grid-content bg-purple" style="height:100%">
                              <img src="../../assets/wylogo.00dc248d.png" alt="" style="width: 50px;height:50px;">
                          </div>
                      </el-col>
                      <el-col :span="15">
                        <div class="btn">
          <el-radio v-model="radio1" label="1" border @change="handleRadioChange1">开处方</el-radio>
        
 
    <el-radio v-model="radio1" label="taglist" border @change="handleRadioChange">处方列表</el-radio>



         
        </div>

                      </el-col>
                      <el-col :span="4">
                          <div class="grid-content bg-purple-light">
                             <span>{{this.usename}}</span> 欢迎登录, 登出
                          </div>
                      </el-col>
                  </el-row>

    
          <!-- 内容分隔 -->
              
            


      </div>


    </el-header>
     <div class="cont"></div> 
    <el-main>
               <router-view></router-view>
      

    </el-main>
   
  </el-container>
</template>

<script>
export default {
  data() {
    return {
          radio1: '1',
      radio2: '1',
    }
  },
    methods:{
    
 handleRadioChange(){

        this.$router.push({ path: 'taglist' });
        
 },
 handleRadioChange1(){
  this.$router.push({ path: 'dotag' });
 },

    
    },
    created(){
      this.usename = localStorage.getItem('truename')
    }

}
</script>

<style lang="less" scoped>
.el-header {
  background: white;

  .el-row {
    height: 100%;

    .el-col {
      height: 100%;

      .grid-content.bg-purple {
        display: flex;
        align-items: center;

      }

      .grid-content.bg-purple-light {
        height: 100%;
        color: black;
        display: flex;
        align-items: center;
      }
    }
  }
}

.el-aside {
  background: #545c64;
  height: 100%;
}

.el-container {
  height: 100%;
}

.layout {
  height: 100%;
}

.el-main {
  padding: 10px;
  background: white;
}

.btn {
  height: 100%;
  display: flex;

  align-items: center;
}

.cont {
  height: 10px;
  width: 100vw;
  background-color: #dcdcdc;
}
</style>