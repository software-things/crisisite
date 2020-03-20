<template>
  <div class="index">
    <div class="row">
      <div class="columns small-12 line">
        <h1 class="title">Komunikaty</h1>
      </div>
    </div>
    <div class="row">
      <div class="columns small-12 large-6" :class="{ 'large-12' : index === 0}" v-for="(post, index) in posts" :key="post.id">
        <PostThumb :post="post" :first="index === 0"/>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api/connectors/wordpress';
import PostThumb from '~/components/PostThumb';
export default {
  data() {
    return {
      posts: null
    }
  },
  components: {
    PostThumb
  },
  mounted() {
    let api = new API(this.$axios);
    let posts = api.getPosts();
    posts.then((resp) => {
      this.posts = resp
    })
  }
}
</script>

<style lang="scss">
.index {
  color: $font;
}
</style>
