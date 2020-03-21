<template>
  <div class="search-results">
    <div class="row">
      <div class="columns small-12 line">
        <h1 class="title">{{ `Wyniki wyszukiwania: ${this.$route.params.slug.replace(/-/g, ' ')}` }}</h1>
      </div>
    </div>
    <div v-if="posts.length > 0 || pages.length > 0 " class="row">
      <div class="columns small-12 large-6" v-for="post in [...posts, ...pages]" :key="post.id">
        <PostThumb :post="post"/>
      </div>
    </div>
    <div v-else class="row">
      <div class="columns small-12">
        Brak wyszukań dla danej frazy
      </div>
    </div>
  </div>
</template>
<script>
import PostThumb from '~/components/PostThumb';
import API from '~/api/connectors/wordpress';

export default {
  name: 'SearchResults',
  components: {
    PostThumb
  },
  async asyncData({ $axios, route, params }) {
    let api = new API($axios);
    const posts = await api.getSearchedPosts(params.slug)
    const pages = await api.getSearchedPages(params.slug)
    return {
      posts: posts,
      pages: pages
    }
  }
}
</script>