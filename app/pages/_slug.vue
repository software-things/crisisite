<template>
  <div v-if="page">
    <ArticleComponent :post="page" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleComponent from "~/components/ArticleComponent";

export default {
  name: "Page",
  components: {
    ArticleComponent
  },
  computed: {
    ...mapGetters({
      getPagesBySlug: "getPagesBySlug"
    }),
    page() {
      return this.getPagesBySlug(this.$route.params.slug);
    }
  },
  head() {
    return {
      title: this.page.title
    };
  },
  mounted() {
    if (this.page) {
      const breadcrumbs = [
        {
          href: `/${this.page.slug}`,
          name: this.page.title
        }
      ];
      this.$store.commit("BREADCRUMBS", breadcrumbs);
    }
  }
};
</script>