<template>
  <header class="header">
    <div class="row header__row">
      <div class="columns small-12 large-2">
        <nuxt-link to="/">
          <img :src="content.logo" alt="Logo Katowice z napisem Katowice – dla odmiany">
        </nuxt-link>
      </div>
      <div class="columns small-12 large-7">
        <p class="header__page-title">{{ content.headline }}</p>
      </div>
      <div class="colums small-12 large-3">
        <div class="header__flex header__flex--spaced">
          <div>
            <div class="hide-large">
              <Navigation v-if="menuVisible" @navigation-clicked="handleMenuVisibility" />
            </div>
            <Hamburger @hamburger-clicked="handleMenuVisibility" :menuVisible="menuVisible"/>
          </div>
          <div class="header__flex">
            <button type="button">
              <img src="~/assets/img/icons/search.svg" alt="Wyszukaj w serwisie">
            </button>
            <div>
              <button type="button" @click.prevent="fontSize('down')">-</button>
              <button type="button" @click.prevent="fontSize('default')">A</button>
              <button type="button" @click.prevent="fontSize('up')">+</button>
            </div>
            <button type="button" @click.prevent="toggleContrast">
              <img src="~/assets/img/icons/contrast.svg" alt="Wersja kontrastowa">
            </button>
            <a href="/" rel="noopener noreferrer nofollow" target="_blank">
              <img src="~/assets/img/icons/deaf.svg" alt="Informacja dla słabosłyszących">
            </a>
            <a :href="content.bip" rel="noopener noreferrer nofollow" target="_blank">
              <img src="~/assets/img/icons/bip.svg" alt="Biuletyn Informacji Publicznej">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="content.warning" class="header__warning">
      <p>{{ content.warning }}</p>
    </div>
  </header>
</template>

<script>
import Hamburger from "~/components/Hamburger";
import Navigation from "~/components/Navigation";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      menuVisible: false
    }
  },
  components: {
    Hamburger,
    Navigation
  },
  methods: {
    handleMenuVisibility(value) {
      this.menuVisible = value
    },
    fontSize(option) {
      let fontSize = parseInt(this.$store.state.wcag.fontSize);
      if (option === 'up' && fontSize < 115) {
        fontSize = fontSize + 5
      }
      if (option === 'down' && fontSize > 85) {
        fontSize = fontSize - 5
      }
      if (option === 'default') {
        fontSize = 100
      }
      this.$store.commit('FONT_SIZE', fontSize) 
    },
    toggleContrast() {
      this.$store.commit('CONTRAST', !this.$store.state.wcag.contrast) 
    }
  },
    computed: {
    ...mapGetters({
      content: 'getAdditionalData'
    })
  }
}
</script>

<style lang="scss">
.header {
  padding-top: 20px;
  &__page-title {
    font-weight: 700;

    @include desktop {
      width: 100%;
      text-align: center;
    }
  }

  &__flex {
    display: flex;
    align-items: center;
    font-weight: 700;
    position: sticky;
    top: 0;
    z-index: 10;
    margin-bottom: 5px;

    @include desktop {
      justify-content: flex-end;
    }

    &--spaced {
      justify-content: space-between;
    }
  }

  &__warning {
    width: 100%;
    background: $warning;
    text-align: center;
    font-weight: 700;
    padding: 10px;
    p {
      margin: 0;
    }
  }
}
</style>
