<template>
  <div v-if="page">
    <ArticleComponent :post="page" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleComponent from "~/components/ArticleComponent";
import excerpt from "~/mixins/excerpt.js";

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
  mixins: [excerpt],
  head() {
    if (!this.page) return this.$router.push({ path: `/error` });
    return {
      title: this.page.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.excerpt(this.page.content)
        }
      ]
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