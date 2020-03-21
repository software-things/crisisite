<template>
  <div>
    <div v-if="post" class="post">
      <DateComponent :date="post.date" />
      <h1 class="title">{{ post.title }}</h1>
      <div v-if="post.featured_image" class="post__image">
        <img :src="post.featured_image" :alt="post.featured_image_alt">
      </div>
      <div v-else class="line"></div>
      <div class="post__content" v-html="post.content"></div>
    </div>
    <div v-else>
      <h1 class="title">Wybrany artykuł nie istnieje</h1>
      <nuxt-link class="link" to="/">Powróć do listy komunikatów</nuxt-link>
    </div>
  </div>
</template>

<script>
import DateComponent from '~/components/Date';

export default {
  name: 'ArticleComponent',
  props: {
    post: {
      type: Object
    }
  },
  components: {
    DateComponent
  }
}
</script>