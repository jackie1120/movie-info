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
      <div class="register-error text-danger" v-html="error"></div>
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
import UserService from '../../services/UserService'

export default {
  data () {
    return {
      loading: false,
      error: '',
      registerForm: {
        email: '',
        password: '',
        comparePassword: ''
      },
      registerRules: {
        email: {
          // type: 'email',
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
      this.$refs['registerForm'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.error = ''
          try {
            const response = await UserService.register({
              email: this.registerForm.email,
              password: this.registerForm.password
            })
            if (response.data.code === 200) {
              this.$store.dispatch('setUser', response.data.user)
              this.$store.dispatch('setToken', response.data.token)
              // this.$router.push('/')
            }
          } catch (error) {
            if (error.response.data.error) {
              this.error = error.response.data.error
            }
          }
          this.loading = false
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
