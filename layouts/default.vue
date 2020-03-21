<template>
  <div>
    <Header />
    <div class="row">
      <div class="columns small-12"><Breadcrumbs /></div>
      <div class="columns large-3 layout__navigation">
        <Navigation />
      </div>
      <div class="columns small-12 large-8">
        <nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Navigation from '~/components/Navigation';
import Breadcrumbs from '~/components/Breadcrumbs';
import Footer from '~/components/Footer';

export default {
  name: 'Layout',
  components: {
    Header,
    Navigation,
    Breadcrumbs,
    Footer
  },
  head () {
    return {
      bodyAttrs: {
        class: this.$store.state.wcag.contrast ? 'contrast' : ''
      },
      htmlAttrs: {
        style: `font-size: ${this.$store.state.wcag.fontSize}%`
      }
    }
  },
}
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
