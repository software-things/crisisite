<template>
  <div>
    <div v-if="post" class="post">
      <DateTemplate :date="post.date" />
      <h1 class="title">{{ post.title }}</h1>
      <div v-if="post.featured_image" class="post__image">
        <img :src="post.featured_image" :alt="post.featured_image_alt" />
      </div>
      <div v-else class="line"></div>
      <div class="content" v-html="post.content"></div>
      <client-only>
        <Map v-if="post.map.markers" :data="post.map" />
        <BaseForm v-if="post.form" :data="post.form" />
      </client-only>
    </div>
    <div v-else>
      <h1 class="title">Wybrany artykuł nie istnieje</h1>
      <nuxt-link class="link" to="/">Powróć do listy komunikatów</nuxt-link>
    </div>
  </div>
</template>

<script>
import attachment from "~/mixins/attachment";
import DateTemplate from "~/components/DateTemplate";
import BaseForm from "~/components/BaseForm";

export default {
  name: "ArticleComponent",
  props: {
    post: {
      type: Object
    }
  },
  components: {
    DateTemplate,
    BaseForm,
    Map: () => {
      if (process.client) {
        return import("../components/BaseMap.vue");
      }
    }
  },
  mixins: [attachment]
};
</script>