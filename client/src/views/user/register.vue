<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      class="register-form"
      label-width="180px"
      label-position="right"
      :model="registerForm"
      v-bind:rules="registerRules"
    >
      <el-form-item prop="email" label="E-mail">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="请密码">
        <el-input showPassword v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="comparePassword" label="请再次输入密码">
        <el-input showPassword v-model="registerForm.comparePassword"></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%" :loading="loading" v-on:click="register">注册</el-button>
      <div class="register-info">
        <span>如果已注册账号请<router-link :to="{ name: 'login' }">点击登陆</router-link></span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      registerForm: {
        email: '',
        password: '',
        comparePassword: ''
      },
      registerRules: {
        email: {
          type: 'email',
          required: true,
          message: '请输入有效的邮箱地址'
        },
        password: {
          type: 'string',
          required: true,
          message: '密码不能为空'
        },
        comparePassword: {
          type: 'string',
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.registerForm.password) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          }
        }
      }
    }
  },
  methods: {
    register () {
      console.log(this.$refs['registerForm'])
      this.$refs['registerForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.loading = true
          // TODO: 调用注册接口
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background:#2d3a4b;
  .register-form {
    position: relative;
    width: 420px;
    margin: 120px auto 0;
    background: #ffffff;
    padding: 20px;
    .register-info {
      text-align: right;
      font-size: 0.9rem;
      margin-top: 10px;
      color: #909399
    }
  }
}
</style>
