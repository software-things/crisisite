<template>
  <div class="thumb" :class="{ 'line thumb__first' : first }">
    <DateTemplate :date="post.date" />
    <nuxt-link
      :to="post.isItPage ?`/${post.slug}` : `/komunikaty/${post.slug}`"
      :title="`Czytaj: ${post.title}`"
    >
      <h2 class="thumb__title">{{ post.title }}</h2>
    </nuxt-link>
    <div v-if="post.featured_image" class="thumb__image">
      <nuxt-link
        :to="post.isItPage ?`/${post.slug}` : `/komunikaty/${post.slug}`"
        :title="`Czytaj: ${post.title}`"
      >
        <img :src="post.featured_image" :alt="post.featured_image_alt" />
      </nuxt-link>
    </div>
    <div v-if="post.excerpt" class="thumb__excerpt" v-html="post.excerpt"></div>
  </div>
</template>

<script>
import DateTemplate from "~/components/DateTemplate";

export default {
  name: "PostThumb",
  props: ["first", "post"],
  components: {
    DateTemplate
  }
};
</script>

<style lang="scss">
.thumb {
  display: block;
  margin-top: 20px;
  padding-bottom: 20px;
  width: 100%;

  @include desktop {
    &:hover {
      img {
        filter: contrast(1.2);
      }
    }
  }

  &__title {
    color: $font;
    font-size: rem(20px);
    font-weight: 700;
    margin-bottom: 10px;
    margin: 0;

    @include desktop {
      height: 65px;
      font-size: rem(22px);
    }
  }

  &__image {
    width: 100%;
    img {
      height: 250px;
      object-fit: cover;
      object-position: center;
      transition: 0.4s;
      width: 100%;
    }
  }

  &__excerpt {
    @include desktop {
      height: 90px;
      overflow: hidden;
    }
  }

  &__first {
    .thumb__title {
      @include desktop {
        height: initial;
      }
    }
  }
}
</style>