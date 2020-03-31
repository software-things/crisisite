<template>
  <div v-if="post">
    <ArticleComponent :post="post" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleComponent from "~/components/ArticleComponent";
import excerpt from "~/mixins/excerpt.js";

export default {
  name: "SinglePost",
  components: {
    ArticleComponent
  },
  computed: {
    ...mapGetters({
      getPostBySlug: "getPostBySlug"
    }),
    post() {
      return this.getPostBySlug(this.$route.params.slug);
    }
  },
  mounted() {
    if (this.post) {
      const breadcrumbs = [
        {
          href: "/",
          name: "Komunikaty"
        },
        {
          href: `/komunikaty/${this.post.slug}`,
          name: this.post.title
        }
      ];
      this.$store.commit("BREADCRUMBS", breadcrumbs);
    }
  },
  mixins: [excerpt],
  head() {
    if (!this.post) return this.$router.push({ path: `/error` });
    return {
      title: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.excerpt(this.post.content)
        }
      ]
    };
  }
};
</script>