<template>
  <div class="search-bar">
    <input
      v-model="phrase"
      type="search"
      id="search"
      class="search-bar__input"
      placeholder="Wpisz wyszukiwaną frazę"
      ref="searchInput"
      autofocus
    />
    <label for="search" class="search-bar__label">Wyszukiwarka</label>
    <nuxt-link
      :to="phrase.length >= 3 ? `/wyszukiwanie/${prepareLink}` : ''"
      class="search-bar__redirect"
    >Wyślij</nuxt-link>
    <div v-if="error" class="search-bar__error">{{ error }}</div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "SearchBar",
  data() {
    return {
      phrase: "",
      error: ""
    };
  },
  mounted() {
    this.$refs.searchInput.focus();
    window.addEventListener("keyup", this.handleBtns);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.handleBtns);
  },
  methods: {
    handleBtns(e) {
      if (this.phrase.length < 3) {
        this.error = "Szukana fraza musi mieć min. 3 znaki.";
        return false;
      }
      this.error = "";
      if (e.keyCode === 13) {
        const slug = this.prepareLink;
        if (slug) {
          this.$router.push({ path: `/wyszukiwanie/${slug}` });
        }
      }
      if (e.keyCode === 27) {
        this.emitClosure();
      }
    },
    emitClosure() {
      this.$emit("getClosure", false);
    }
  },
  computed: {
    prepareLink() {
      return this.phrase.replace(/ /g, "-");
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 99999;
  width: 100%;
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 2px 10px;

  &__input {
    width: 40%;
    background: white;
    border: none;
    color: $font;
    font-size: rem(12px);
    transition: 0.3s;
    outline: none;
    margin-top: 5px;

    @include desktop {
      font-size: rem(14px);
      padding: 10px 10px;
    }

    &::placeholder {
      color: $font;
    }

    &:focus,
    &:valid {
      width: 80%;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }

  &__label {
    position: absolute;
    top: 2px;
    left: 10px;
    font-size: rem(9px);

    @include desktop {
      left: 20px;
    }
  }

  &__img {
    width: 25px;
    height: auto;
  }

  &__redirect {
    width: 50px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__error {
    font-size: 12px;
    position: absolute;
    bottom: -20px;
    left: 10px;
    color: red;
    @include desktop {
      left: 20px;
    }
  }
}
</style>
