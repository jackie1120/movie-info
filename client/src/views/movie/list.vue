<template>
  <base-box title="电影列表" type="primary">
    <template v-slot:title-addon>
      <div style="margin-left: auto; cursor: pointer" @click="$router.push({name: 'movie-create'})">
        <i class="el-icon-plus"></i> 新增电影
      </div>
    </template>
  </base-box>
</template>

<script>
export default {

}
</script>

<style>

</style>
