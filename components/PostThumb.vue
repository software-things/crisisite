<template functional>
  <nuxt-link class="thumb" :class="{ 'line' : props.first }" :to="`/komunikaty/${props.post.slug}`">
    <div class="thumb__date">
      <img src="~/assets/img/icons/calendar.svg" alt="Ikona kalendrza">
      <p>{{ props.post.date }}</p>
    </div>
    <p class="thumb__title">{{ props.post.title }}</p>
    <div class="thumb__image">
      <img :src="props.post.featured_image" alt="">
    </div>
    <div class="thumb__excerpt" v-html="props.post.excerpt"></div>
  </nuxt-link>
</template>

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

  &__date {
    display: flex;
    font-size: rem(14px);
    margin-bottom: 5px;

    p {
      margin: 0;
      margin-left: 5px;
    }
  }

  &__title {
    font-size: rem(18px);
    font-weight: 700;
    margin: 0;
    margin-bottom: 10px;

    @include desktop {
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
    height: 90px;
    overflow: hidden;
  }
}
</style>