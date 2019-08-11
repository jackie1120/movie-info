<template>
  <base-box type="primary" title="电影信息">
    <el-form ref="movie-form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="name" label="电影名称">
            <el-input v-model="form.name" placeholder="请输入电影名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="year" label="电影上映年份">
            <el-input type="number" v-model="form.year" placeholder="电影上映年份"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="director" label="导演">
            <el-input v-model="form.director" placeholder="导演"></el-input>
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
        <el-col :span="12">
          <el-form-item prop="imdb_id" label="IMDB">
            <el-input v-model="form.imdb_id" placeholder="IMDB ID"></el-input>
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
import MovieService from '../../services/MovieService'

export default {
  data () {
    return {
      loading: false,
      isEdit: false,
      form: {
        name: '',
        year: '',
        director: '',
        genre: '',
        poster: '',
        description: '',
        rating: '',
        imdb_id: ''
      },
      rules: {
        name: { required: true, message: '请输入电影名称', trigger: true },
        year: { required: true, message: '请输入电影年份', trigger: true },
        director: { required: true, message: '请输入电影导演', trigger: true },
        genre: { required: true, message: '请输入电影类别', trigger: true },
        poster: { required: true, message: '请输入电影海报', trigger: true },
        description: { required: true, message: '请输入电影简介', trigger: true },
        rating: { required: true, message: '请输入电影评分', trigger: true },
        imdb_id: { required: true, message: '请输入电影IMDB id', trigger: true }
      }
    }
  },
  async created () {
    if (this.$route.query.id) {
      this.isEdit = true
      try {
        const response = await MovieService.getById(this.$route.query.id)
        this.form = response.data.movie
      } catch (error) {
        if (error.response.data.error) {
          this.$message.error(error.response.data.error)
        } else {
          this.$message.error(`[${error.response.status}]，数据处理异常请稍后再试`)
        }
      }
    }
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        this.loading = true
        if (valid) {
          try {
            if (this.isEdit) {
              await MovieService.update(this.$route.query.id, this.form)
            } else {
              await MovieService.create(this.form)
            }
            this.$message({
              dangerouslyUseHTMLString: true,
              message: '信息保存成功!<br/><br/>页面将在两秒后自动跳转到信息列表页',
              type: 'success',
              duration: '2000',
              onClose: () => {
                this.$router.push('list')
              }
            })
          } catch (error) {
            if (error.response.data.error) {
              this.$message.error(error.response.data.error)
            } else {
              this.$message.error(`[${error.response.status}]，数据处理异常请稍后再试`)
            }
          } finally {
            this.loading = false
          }
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
