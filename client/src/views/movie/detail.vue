<template>
  <base-box title="电影列表" type="primary">
    <template v-slot:title-addon>
      <div style="margin-left: auto; cursor: pointer" @click="$router.push({name: 'movie-create'})">
        <i class="el-icon-plus"></i> 新增电影
      </div>
    </template>
    <div class="movie-item" v-for="movie in movies" :key="movie.id">
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
      <p class="movie-description">{{movie.description}}...<span class="text-success">查看详情</span></p>
    </div>
  </base-box>
</template>

<script>
export default {
  data () {
    return {
      movies: [
        {
          id: 1,
          director: '饺子',
          imdb_id: 'tt10627720',
          name: '哪吒之魔童降世',
          year: '2019',
          genre: ' 剧情 / 喜剧 / 动画 / 奇幻',
          rating: 8.7,
          poster: 'https://m.media-amazon.com/images/M/MV5BNGI1NjcwNWEtOGVkZC00OTVkLWE3ZGItZGQwNThkMTdiZTk2XkEyXkFqcGdeQXVyOTE4NzcwNzI@._V1_UY268_CR5,0,182,268_AL_.jpg',
          description: '天地灵气孕育出一颗能量巨大的混元珠，元始天尊将混元珠提炼成灵珠和魔丸，灵珠投胎为人，助周伐纣时可堪大用；而魔丸则会诞出魔王，为祸人间。元始天尊启动了天劫咒语，3年后天雷将会降临，摧毁魔丸。太乙受命将灵珠托生于陈塘关李靖家的儿子哪吒身上。然而阴差阳错，灵珠和魔丸竟然被掉包。本应是灵珠英雄的哪吒却成了混世大魔王。调皮捣蛋顽劣不堪的哪吒却徒有一颗做英雄的心。然而面对众人对魔丸的误解和即将来临的天雷的降临，哪吒是否命中注定会立地成魔？他将何去何从？天地灵气孕育出一颗能量巨大的混元珠，元始天尊将混元珠提炼成灵珠和魔丸，灵珠投胎为人，助周伐纣时可堪大用；而魔丸则会诞出魔王，为祸人间。元始天尊启动了天劫咒语，3年后天雷将会降临，摧毁魔丸。太乙受命将灵珠托生于陈塘关李靖家的儿子哪吒身上。然而阴差阳错，灵珠和魔丸竟然被掉包。本应是灵珠英雄的哪吒却成了混世大魔王。调皮捣蛋顽劣不堪的哪吒却徒有一颗做英雄的心。然而面对众人对魔丸的误解和即将来临的天雷的降临，哪吒是否命中注定会立地成魔？他将何去何从？'
        },
        {
          id: 2,
          imdb_id: 'tt10627720',
          name: '哪吒之魔童降世',
          year: '2019',
          genre: ' 剧情 / 喜剧 / 动画 / 奇幻',
          rating: 8.7,
          poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564590493362&di=9c46904d135662d062a7030b6ab13965&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190730%2Fd5eac49343844a0e9ef96b7664e74d71.jpeg',
          description: '天地灵气孕育出一颗能量巨大的混元珠，元始天尊将混元珠提炼成灵珠和魔丸，灵珠投胎为人，助周伐纣时可堪大用；而魔丸则会诞出魔王，为祸人间。元始天尊启动了天劫咒语，3年后天雷将会降临，摧毁魔丸。太乙受命将灵珠托生于陈塘关李靖家的儿子哪吒身上。然而阴差阳错，灵珠和魔丸竟然被掉包。本应是灵珠英雄的哪吒却成了混世大魔王。调皮捣蛋顽劣不堪的哪吒却徒有一颗做英雄的心。然而面对众人对魔丸的误解和即将来临的天雷的降临，哪吒是否命中注定会立地成魔？他将何去何从？天地灵气孕育出一颗能量巨大的混元珠，元始天尊将混元珠提炼成灵珠和魔丸，灵珠投胎为人，助周伐纣时可堪大用；而魔丸则会诞出魔王，为祸人间。元始天尊启动了天劫咒语，3年后天雷将会降临，摧毁魔丸。太乙受命将灵珠托生于陈塘关李靖家的儿子哪吒身上。然而阴差阳错，灵珠和魔丸竟然被掉包。本应是灵珠英雄的哪吒却成了混世大魔王。调皮捣蛋顽劣不堪的哪吒却徒有一颗做英雄的心。然而面对众人对魔丸的误解和即将来临的天雷的降临，哪吒是否命中注定会立地成魔？他将何去何从？'
        }
      ]
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
