<template>
  <div>
    <PageHeader />
    <div class="row">
      <div class="columns small-12">
        <BreadcrumbsNavigation />
      </div>
      <div id="main-menu" class="columns large-3 layout__navigation">
        <PageNavigation />
      </div>
      <main id="content-main" class="columns small-12 large-8">
        <nuxt />
      </main>
    </div>
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from "~/components/PageHeader.vue";
import PageNavigation from "~/components/PageNavigation";
import BreadcrumbsNavigation from "~/components/BreadcrumbsNavigation";
import PageFooter from "~/components/PageFooter";

export default {
  name: "Layout",
  components: {
    PageHeader,
    PageNavigation,
    PageFooter,
    BreadcrumbsNavigation
  },
  head() {
    return {
      bodyAttrs: {
        class: this.$store.state.wcag.contrast ? "contrast" : "",
        style: `line-height: ${
          this.$store.state.wcag.lineHeight ? "1.6" : "1.37"
        };`
      },
      htmlAttrs: {
        style: `font-size: ${this.$store.state.wcag.fontSize}%;
        letter-spacing: ${
          this.$store.state.wcag.letterSpacing ? "1.6px" : "initial"
        };
        line-height: ${this.$store.state.wcag.lineHeight ? "3" : "initial"};
        word-spacing: ${
          this.$store.state.wcag.wordSpacing ? "1.2em" : "normal"
        };`
      }
    };
  },
  mounted() {
    if (process.client) {
      document.body.addEventListener("mousedown", function() {
        document.body.classList.remove("using-keyboard");
      });

      document.body.addEventListener("keydown", function(event) {
        document.body.classList.add("using-keyboard");
      });
    }
  }
};
</script>

<style lang="scss">
.layout {
  &__navigation {
    display: none;

    @include desktop {
      display: flex;
      height: 100%;
    }
  }
}
</style>
