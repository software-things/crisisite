<template>
  <div>
    <ArticleComponent :post="post" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ArticleComponent from '~/components/ArticleComponent';

export default {
  name: 'SinglePost',
  components: {
    ArticleComponent
  },
  computed: {
    ...mapGetters({
      getPostBySlug: 'getPostBySlug'
    }),
    post() {
      return this.getPostBySlug(this.$route.params.slug)
    },
  }
}
</script>