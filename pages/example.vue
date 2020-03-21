<template>
  <div class="index">
    <div v-if="post.map" class="row">
      <div class="columns small-12">
        <client-only>
          <BaseMap :data="post.map" />
        </client-only>
      </div>
    </div>

    <div v-if="post.form" class="row">
      <div class="columns small-12">
        <client-only>
          <BaseForm :data="post.form" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostThumb from "~/components/PostThumb";
import BaseForm from "~/components/BaseForm";

export default {
  components: {
    PostThumb,
    BaseMap: () => {
      if (process.client) {
        return import("../components/BaseMap.vue");
      }
    },
    BaseForm
  },
  computed: {
    ...mapGetters({
      posts: "getAllPosts"
    }),
    post() {
      return this.posts.find(post => {
        return post.id === 141;
      });
    }
  }
};
</script>