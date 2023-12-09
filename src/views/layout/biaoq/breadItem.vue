<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-click="handleTabClick" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(v) in  $store.state.breadItem " :key="v.name"
        :label="v.name"
        :name="v.name"
  
      >
 
      </el-tab-pane>

    </el-tabs>
</template>

<script>
import { mapMutations } from "vuex"
export default {
         data() {
        return {
            editableTabsValue: '2',
            editableTabs: this.$store.state.breadItem,
            tabIndex: 2
        }
    },
    created(){
        console.log();
        
    },
    methods: {
        handleTabClick(tab) {
            const clickedTab = this.$store.state.breadItem.find(item => item.name === tab.name);
              
           this.$router.push(clickedTab.path).catch(err => {})
            //    console.log(this.$store.state.breadItem);
        },



    }
}
</script>

<style>

</style>