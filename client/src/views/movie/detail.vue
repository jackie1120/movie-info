<template>
  <base-box title="电影列表" type="primary">
    <template v-slot:title-addon v-if="$store.state.isUserLogin">
      <div style="margin-left: auto; cursor: pointer" @click="edit">
        <i class="el-icon-edit"></i> 编辑电影
      </div>
    </template>
    <div class="movie-item">
      <h2>{{ movie.name }} <span class="text-info">({{ movie.year }})</span></h2>
      <img class="movie-poster" :src="movie.poster" :alt="movie.name">
      <ul class="movie-meta">
        <li><label class="text-info">导演：</label>{{movie.director}}</li>
        <li><label class="text-info">编剧：</label>饺子 / 易巧 / 魏芸芸</li>
        <li><label class="text-info">类型：</label>{{movie.genre}}</li>
        <li>
          <label class="text-info">评分：</label>
          <el-rate
            style="display: inline-block"
            :value="movie.rating/2"
            disabled>
          </el-rate>
          <span style="color: #ff9900">{{movie.rating}}</span>
        </li>
        <li><label class="text-info">片长：</label>110分钟</li>
        <li>
          <label class="text-info">IMDB链接：</label>
          <a target="_blank" :href="'http://www.imdb.com/title/' + movie.imdb_id">{{movie.imdb_id}}</a>
        </li>
      </ul>
      <p class="movie-description">{{movie.description}}</p>
    </div>
  </base-box>
</template>

<script>
import MovieService from 'services/MovieService'

export default {
  data () {
    return {
      movie: Object
    }
  },
  async created () {
    try {
      const response = await MovieService.getById(this.$route.params.id)
      this.movie = response.data.movie
    } catch (error) {
      if (error.response.data.error) {
        this.$message.error(error.response.data.error)
      } else {
        this.$message.error(`[${error.response.status}]，数据处理异常请稍后再试`)
      }
    }
  },
  methods: {
    edit () {
      this.$router.push({ path: '/movie/edit', query: { id: this.$route.params.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-item {
  position: relative;
  margin-bottom: 10px;
  padding: 0 10px;
  .movie-poster {
    width: 135px;
    height: 200px;
    float: left;
    position: relative;
  }
  .movie-meta {
    list-style: none;
    margin-left: 120px;
    font-size: 14px;
    li {
      line-height: 1.5;
    }
  }
  .movie-description {
    clear: both;
    margin-top: 10px;
    text-indent: 20px;
    color: #111;
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
