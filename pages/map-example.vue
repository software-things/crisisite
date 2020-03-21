<template>
  <div class="index">
    <div class="row">
      <div class="columns small-12">
        <client-only>
          <Map :data="post.map" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostThumb from "~/components/PostThumb";
export default {
  components: {
    PostThumb,
    Map: () => {
      if (process.client) {
        return import("../components/Map.vue");
      }
    }
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