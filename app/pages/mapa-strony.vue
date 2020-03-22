<template>
  <div class="site-map">
    <h1 class="title">Mapa strony</h1>
    <div class="line"></div>
    <h2>Strona główna</h2>
    <ul class="site-map__list">
      <li>
        <nuxt-link to="/">Strona główna</nuxt-link>
      </li>
    </ul>
    <h2>Podstrony</h2>
    <ul class="site-map__list">
      <li v-for="page in pages" :key="page.ID">
        <nuxt-link :to="`/${page.slug}`">{{ page.title }}</nuxt-link>
      </li>
    </ul>
    <h2>Komunikaty</h2>
    <ul class="site-map__list">
      <li v-for="post in posts" :key="post.ID">
        <nuxt-link :to="`/komunikaty/${post.slug}`">{{ post.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SiteMap",
  computed: {
    ...mapGetters({
      posts: "getAllPosts",
      pages: "getAllPages"
    })
  }
};
</script>

<style lang="scss">
.site-map {
  margin-top: 3px;
  &__list {
    li a {
      color: $link;

      @include desktop {
        &:hover {
          color: black;
        }
      }
    }
  }
}
</style>