<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      label-width="100px"
      :rules="loginRules"
      :model="loginForm"
    >
      <div class="login-error text-danger">{{ error }}</div>
      <el-form-item prop="email" label="E-mail">
        <el-input
          placeholder="E-mail"
          autocomplete="on"
          v-model="loginForm.email"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          showPassword
          v-model="loginForm.password"
        >
        </el-input>
      </el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        style="width: 100%"
        :loading="loading"
        @click.prevent="login"
      >登陆</el-button>
      <div class="login-info">
        <span>如果还没有账号请<router-link :to="{ name: 'register' }">点击注册</router-link></span>
      </div>
    </el-form>
  </div>
</template>

<script>
import UserService from '../../services/UserService'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      error: '',
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: { type: 'email', required: true, message: '请输入邮箱地址', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      },
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),
    login () {
      this.$refs['loginForm'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.error = ''
          try {
            const response = await UserService.login(this.loginForm)
            if (response.data.code === 200) {
              this.setUser(response.data.user)
              this.setToken(response.data.token)
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push('/')
              }
            }
          } catch (error) {
            if (typeof error.response !== 'undefined' && error.response.data.error) {
              this.error = error.response.data.error
            } else {
              this.error = `[${error.response.status}]，数据处理异常请稍后再试`
            }
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background:#2d3a4b;
  .login-form {
    position: relative;
    width: 420px;
    margin: 120px auto 0;
    background: #ffffff;
    padding: 20px;
    .login-info {
      text-align: right;
      font-size: 0.9rem;
      margin-top: 10px;
      color: #909399
    }
    .login-error {
      margin: 5px 0;
    }
  }
}
</style>
