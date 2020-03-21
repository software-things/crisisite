<template>
  <div class="search-bar">
    <input v-model="phrase" type="search" id="search" class="search-bar__input" placeholder="Wpisz wyszukiwaną frazę" autofocus>
    <label for="search" class="search-bar__label">Wyszukiwarka</label>
    <nuxt-link :to="`/wyszukiwanie/${prepareLink}`" class="search-bar__redirect">
      Wyślij
    </nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'SearchBar',
  data() {
    return {
      phrase: ''
    }
  },
  mounted() {
    window.addEventListener('keyup', this.handleBtns);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleBtns);
  },
  methods: {
    handleBtns(e) {
      if (e.keyCode === 13) {
        const slug = this.prepareLink
        if (slug) {
          this.$router.push({ path: `/wyszukiwanie/${slug}` });
        }
      }

      if (e.keyCode === 27) {
        this.emitClosure();
      }
    },
    emitClosure() {
      this.$emit('getClosure', false);
    },
  },
  computed: {
    prepareLink () {
      return this.phrase.replace(/ /g, '-');
    }
  }
}
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

    &:focus, &:valid {
      width: 80%;
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
}
</style>
