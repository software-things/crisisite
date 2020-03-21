<template>
  <nuxt-link class="thumb" :class="{ 'line' : first }" :to="`/komunikaty/${post.slug}`" :title="`Czytaj: ${post.title}`">
    <DateTemplate :date="post.date" />
    <p class="thumb__title">{{ post.title }}</p>
    <div v-if="post.featured_image" class="thumb__image">
      <img :src="post.featured_image" :alt="post.featured_image_alt">
    </div>
    <div class="thumb__excerpt" v-html="post.excerpt"></div>
  </nuxt-link>
</template>

<script>
import DateTemplate from '~/components/DateTemplate';

export default {
  name: 'PostThumb',
  props: ['first', 'post'],
  components: {
    DateTemplate
  }
}
</script>

<style lang="scss">
.thumb {
  margin-top: 20px;
  display: block;
  width: 100%;
  padding-bottom: 20px;

  @include desktop {
    &:hover {
      img {
        filter: contrast(1.2);
      }
    }
  }

  &__title {
    font-size: rem(20px);
    font-weight: 700;
    margin: 0;
    margin-bottom: 10px;

    @include desktop {
      height: 65px;
      font-size: rem(22px);
    }
  }

  &__image {
    width: 100%;
    img {
      object-fit: cover;
      transition: 0.4s;
    }
  }

  &__excerpt {
    @include desktop {
      height: 90px;
      overflow: hidden;
    }
  }
}
</style>