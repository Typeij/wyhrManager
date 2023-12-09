<template>
    <div class="box">

        <div class="loginbox">
            <div class="elbox">
                <el-radio-group v-model="radio1" @change="handleRadioChange">
                    <el-radio-button label="1">店铺登录</el-radio-button>
                    <el-radio-button label="2">医师登录</el-radio-button>
                    <el-radio-button label="3">管理员登录</el-radio-button>
                </el-radio-group>
            </div>
            <div class="bd">

                <el-form :label-position="labelPosition" label-width="40px" :model="formLabelAlign">
                    <el-form-item label="名称">
                        <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formLabelAlign.region" show-password></el-input>
                    </el-form-item>

                </el-form>

            </div>
            <div class="btn">
                <el-button type="primary" @click="login()">登录</el-button>
                <el-button plain>重置</el-button>
            </div>

        </div>
    </div>
</template>

<script>
import { loginApi } from '../request/login'
import { Message } from 'element-ui';
export default {
    data() {
        return {
            radio1: '1',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            }
        };
    },
    methods: {
        handleRadioChange(val) {
            console.log(val);
            this.radio1 = val;
        },
        login() {
            let username = this.formLabelAlign.name
            let password = this.formLabelAlign.region
            let type = this.radio1
            console.log(username,password,type)
            if (username == '' || password == '') {
                this.$message.error("用户名或密码不能为空")
            } else {
                loginApi({ username, password, type}).then((res)=>{
                            console.log(res)
                           if(type==2){
                        if (res.code == 200) {
                            Message.success("登录成功")
                            localStorage.setItem("token", res.token)
                            // localStorage.setItem("userID", res.data.authId)
                              localStorage.setItem("doc_id", res.data.doc_id)
                              localStorage.setItem("truename", res.data.truename)
                              localStorage.setItem("loginType", type)
                            this.$router.push("/doctor/dotag")
                            console.log(22222)
                        } else {
                            Message.error("登录失败")
                        }
                           }else{
                            if (res.code == 200) {
                            Message.success("登录成功")
                            localStorage.setItem("token", res.token)
                            localStorage.setItem("userID", res.data.authId)
                            localStorage.setItem("loginType", type)
                            this.$router.push("/")
                            console.log(22222)
                        } else {
                            Message.error("登录失败")
                        }
                           }
                            

                })
            }

        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/css/login.less';
</style>