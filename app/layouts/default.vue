<template>
  <div>
    <PageHeader />
    <div class="row">
      <div class="columns small-12">
        <BreadcrumbsNavigation />
      </div>
      <div class="columns large-3 layout__navigation">
        <PageNavigation />
      </div>
      <div class="columns small-12 large-8">
        <nuxt />
      </div>
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
        class: this.$store.state.wcag.contrast ? "contrast" : ""
      },
      htmlAttrs: {
        style: `font-size: ${this.$store.state.wcag.fontSize}%`
      }
    };
  },
  mounted() {
    if (process.client) {
      document.body.addEventListener("mousedown", function() {
        document.body.classList.add("using-mouse");
      });

      document.body.addEventListener("keydown", function(event) {
        if (event.keyCode === 9) {
          document.body.classList.remove("using-mouse");
        }
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
