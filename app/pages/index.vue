<template>
  <div class="index">
    <div class="row">
      <div class="columns small-12">
        <h1 class="title">Komunikaty</h1>
        <div class="line fullwidth"></div>
      </div>
    </div>
    <div class="row">
      <div
        class="columns small-12 large-6"
        :class="{ 'large-12' : index === 0 && currentPage === 0}"
        v-for="(post, index) in filterPerPage"
        :key="post.id"
      >
        <PostThumb :post="post" :first="index === 0 && currentPage === 0" />
      </div>
    </div>
    <div class="row" v-if="allPages > 1">
      <div class="columns small-12">
        <div class="fullwidth text-center pagination">
          <div class="pagination__text">
            <button
              class="pagination__button"
              type="button"
              v-if="currentPage > 0"
              @click="handlePagination(currentPage - 1)"
            >poprzednia</button>
          </div>
          <div>
            <button
              class="pagination__button"
              :class="{ 'pagination__button--active' : currentPage === index }"
              type="button"
              @click="handlePagination(index)"
              v-for="(n, index) in allPages"
              :key="n"
            >{{ n }}</button>
          </div>
          <div class="pagination__text">
            <button
              class="pagination__button"
              type="button"
              v-if="currentPage < allPages - 1"
              @click="handlePagination(currentPage + 1)"
            >następna</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostThumb from "~/components/PostThumb";

export default {
  name: "Index",
  data() {
    return {
      currentPage: 0,
      perPage: 10
    };
  },
  components: {
    PostThumb
  },
  computed: {
    ...mapGetters({
      posts: "getAllPosts",
      default: "getAdditionalData"
    }),
    allPages() {
      return Math.ceil(this.posts.length / this.perPage);
    },
    filterPerPage() {
      return this.posts.filter((el, index) => {
        return (
          index >= this.currentPage * this.perPage &&
          index < (this.currentPage + 1) * this.perPage
        );
      });
    }
  },
  methods: {
    handlePagination(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    if (this.posts) {
      const breadcrumbs = [
        {
          href: "/",
          name: "Komunikaty"
        }
      ];
      this.$store.commit("BREADCRUMBS", breadcrumbs);
    }
  },
  head() {
    return {
      title: this.default.page_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.default.page_description
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.index {
  color: $font;
  @include desktop {
    margin-top: 3px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;

    &__button {
      color: $link;

      @include desktop {
        &:hover {
          color: black;
        }
      }

      &--active {
        font-weight: 700;
      }
    }

    &__text {
      width: 90px;
    }
  }
}
</style>
