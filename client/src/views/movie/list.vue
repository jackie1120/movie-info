<template>
  <base-box type="primary" title="电影">
    <template v-slot:title-addon>
      <div class="filter">
        <label class="active">最新</label>
        <label>高分</label>
        <label>动作</label>
        <label>剧情</label>
      </div>
       <div
        style="margin-left: auto; cursor: pointer"
        @click="$router.push({name: 'movie-create'})"
        v-if="$store.state.isUserLogin">
        <i class="el-icon-plus"></i> 新增电影
      </div>
    </template>
    <div class="movie-list">
      <a class="movie-item" v-for="movie in movies" :key="movie.id" @click="$router.push({name: 'movie-detail', params: {id: movie.id}})">
        <img :src="movie.poster" :alt="movie.name">
        <p>{{ movie.name }} <strong>{{ movie.rating }}</strong></p>
      </a>
    </div>
  </base-box>
</template>

<script>
import MovieService from '../../services/MovieService'

export default {
  data () {
    return {
      movies: []
    }
  },
  async created () {
    try {
      const response = await MovieService.getAll()
      this.movies = response.data.movies
    } catch (error) {
      if (error.response.data.error) {
        this.$message.error(error.response.data.error)
      } else {
        this.$message.error(`[${error.response.status}]，数据处理异常请稍后再试`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  margin-left: 10px;
  label {
    margin-right: 10px;
    font-size: 13px;
    color: #9b9b9b;
    cursor: pointer;
    &.active {
      color: #000000;
    }
  }
}
.movie-list {
  .movie-item {
    margin: 10px;
    display: block;
    float: left;
    font-size: 13px;
    width: 114px;
    cursor: pointer;
    img {
      height: 160px;
      width: 100%;
      object-fit: cover;
    }
    p {
      text-align: center
    }
    strong {
      color: #e09015
    }
  }
}
</style>
