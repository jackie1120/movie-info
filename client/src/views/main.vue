<template>
  <el-container>
    <el-header height="50px" class="bg-primary">
      <el-row>
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="4" class="setting">
          <span class="text-white" v-if="$store.state.isUserLogin">{{ $store.state.user.email }} </span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link text-white">
              <i class="el-icon-s-tools">设置</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login">登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleCommand (route) {
      this.$router.push('login')
    }
  }
}
</script>

<style scoped>
.el-header {
  line-height: 50px
}
.setting {
  text-align: right
}
</style>
