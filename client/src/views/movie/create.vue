<template>
  <base-box type="primary" title="新增信息">
    <el-form ref="movie-form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="name" label="电影名称">
            <el-input v-model="form.name" placeholder="请输入电影名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="genre" label="电影类别">
            <el-input v-model="form.genre" placeholder="请输入电影类别"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="poster" label="电影海报">
            <el-input v-model="form.poster" placeholder="请输入电影海报链接"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="rating" label="电影评分">
            <el-input v-model="form.rating" placeholder="请输入电影评分"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="description" label="电影简介">
            <el-input type="textarea" :rows="5" v-model="form.description" placeholder="请输入电影简介"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align:center">
          <el-button
            :loading="loading"
            type="primary"
            native-type="submit"
            @click.prevent="submit('movie-form')"
          >
            保存
          </el-button>
          <el-button type="warning" @click="reset('movie-form')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </base-box>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      form: {
        name: '',
        genre: '',
        poster: '',
        description: '',
        rating: ''
      },
      rules: {
        name: { required: true, message: '请输入电影名称', trigger: true },
        genre: { required: true, message: '请输入电影类别', trigger: true },
        poster: { required: true, message: '请输入电影海报', trigger: true },
        description: { required: true, message: '请输入电影简介', trigger: true },
        rating: { required: true, message: '请输入电影评分', trigger: true }
      }
    }
  },
  methods: {
    submit (formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO: 调用后台接口存储数据，而后跳转到列表页面
          this.$message({
            dangerouslyUseHTMLString: true,
            message: '信息保存成功!<br/><br/>页面将在两秒后自动跳转到信息列表页',
            type: 'success',
            duration: '2000',
            onClose: () => {
              this.$router.push('list')
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>

</style>
