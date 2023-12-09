<template>
    <div>
        <!-- {{menuList}} -->
        <el-menu default-active="1-1" class="el-menu-vertical-demo" :unique-opened="true" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b">
            <el-submenu :index="(1 + k).toString()" v-for="(item, k) in menuList" :key="item.path">
                <template slot="title">
                    <i :class="[item.icon]"></i>
                    <span>{{ item.name }}</span>

                </template>

                <el-menu-item v-for="(value, kk) in item.children" :index="(k + 1) + '-' + (kk + 1)" :key="value.path">
                    <i class="el-icon-location"></i>
                    <span @click="jumpUrl(value.path, value.name)"> {{ value.name }}</span>
                </el-menu-item>



            </el-submenu>


        </el-menu>
    </div>
</template>

<script>
export default {
    props: ["menuList"],
    data() {
        return {
            defaultIndex: "1-1"
        }
    },
    methods: {
        jumpUrl(path,name) {
            console.log(name);
    
            let obj={path:"/layout/" + path,name:name}
                this.$store.commit("addItem",obj)
            this.$router.push("/layout/" + path).catch(err => { })
        }

    }
};
</script>

<style></style>