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
import { mapGetters } from 'vuex';
import PostThumb from '~/components/PostThumb';

export default {
  components: {
    PostThumb
  },
  computed: {
    ...mapGetters({
      posts: 'getAllPosts'
    })
  },
    mounted() {
    if (this.posts) {
      const breadcrumbs = [
        {
          href: '/',
          name: 'Komunikaty'
        }
      ]
      this.$store.commit('BREADCRUMBS', breadcrumbs)
    }
  }
}
</script>

<style lang="scss">
.index {
  color: $font;
}
</style>
