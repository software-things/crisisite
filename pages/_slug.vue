<template>
  <div v-if="page">
    <ArticleComponent :post="page" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ArticleComponent from '~/components/ArticleComponent';

export default {
  name: 'Page',
  components: {
    ArticleComponent
  },
  computed: {
    ...mapGetters({
      getPagesBySlug: 'getPagesBySlug'
    }),
    page() {
      return this.getPagesBySlug(this.$route.params.slug)
    },
  }
}
</script>