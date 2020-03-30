<template>
  <header class="header">
    <ul class="skip">
      <li>
        <a href="#main-menu" class="inner">Przejdź do menu głównego</a>
      </li>
      <li>
        <a href="#content-main" class="inner">Przejdź do treści</a>
      </li>
      <li>
        <router-link to="/mapa-strony#sitemap">Mapa serwisu</router-link>
      </li>
    </ul>
    <div class="row header__row">
      <div class="columns small-12 large-2 header__center">
        <nuxt-link to="/">
          <img :src="content.logo" alt="Logo Katowice z napisem Katowice – dla odmiany" />
        </nuxt-link>
      </div>
      <div class="columns small-12 large-6 header__center">
        <p class="header__page-title">{{ content.headline }}</p>
      </div>
      <div class="colums small-12 large-4">
        <div class="header__flex header__tablet">
          <div>
            <div class="hide-large">
              <PageNavigation v-if="menuVisible" @navigation-clicked="handleMenuVisibility" />
            </div>
            <TheHamburger @hamburger-clicked="handleMenuVisibility" :menuVisible="menuVisible" />
          </div>
          <div class="header__flex">
            <button type="button">
              <img
                @click="showSearchBar"
                v-if="searchBarVisible"
                class="header__icon"
                src="~/assets/img/icons/x.svg"
                alt="Zamknij wyszukiwarkę"
              />
              <img
                @click="showSearchBar"
                v-else
                class="header__icon"
                src="~/assets/img/icons/search.svg"
                alt="Wyszukaj w serwisie"
              />
            </button>
            <div class="header__resize">
              <button type="button" @click.prevent="fontSize('down')">-</button>
              <button type="button" @click.prevent="fontSize('default')">A</button>
              <button type="button" @click.prevent="fontSize('up')">+</button>
            </div>
            <button type="button" @click.prevent="toggleContrast">
              <img
                class="header__icon"
                src="~/assets/img/icons/contrast.svg"
                alt="Wersja kontrastowa"
              />
            </button>
            <nuxt-link to="/informacja-dla-osob-nieslyszacych">
              <img
                class="header__icon"
                src="~/assets/img/icons/deaf.svg"
                alt="Informacja dla słabosłyszących"
              />
            </nuxt-link>
            <a :href="content.bip" rel="noopener noreferrer nofollow" target="_blank">
              <img
                class="header__bip"
                src="~/assets/img/icons/bip.svg"
                alt="Biuletyn Informacji Publicznej"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="searchBarVisible" class="columns small-12">
        <SearchBar @getClosure="closeSearchEngine" />
      </div>
    </div>
    <div v-if="content.warning" class="header__warning">
      <p>{{ content.warning }}</p>
    </div>
  </header>
</template>

<script>
import TheHamburger from "~/components/TheHamburger";
import PageNavigation from "~/components/PageNavigation";
import SearchBar from "~/components/SearchBar";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      menuVisible: false,
      searchBarVisible: false
    };
  },
  components: {
    TheHamburger,
    PageNavigation,
    SearchBar
  },
  methods: {
    handleMenuVisibility(value) {
      this.menuVisible = value;
    },
    fontSize(option) {
      let fontSize = parseInt(this.$store.state.wcag.fontSize);
      if (option === "up" && fontSize < 115) {
        fontSize = fontSize + 5;
      }
      if (option === "down" && fontSize > 85) {
        fontSize = fontSize - 5;
      }
      if (option === "default") {
        fontSize = 100;
      }
      this.$store.commit("FONT_SIZE", fontSize);
    },
    toggleContrast() {
      this.$store.commit("CONTRAST", !this.$store.state.wcag.contrast);
    },
    showSearchBar() {
      this.searchBarVisible = !this.searchBarVisible;
    },
    closeSearchEngine(value) {
      this.searchBarVisible = value;
    }
  },
  watch: {
    $route() {
      this.searchBarVisible = false;
    }
  },
  computed: {
    ...mapGetters({
      content: "getAdditionalData"
    })
  }
};
</script>

<style lang="scss">
.header {
  padding-top: 20px;
  @include desktop {
    padding-top: 0;
  }
  &__page-title {
    font-weight: 700;
    @include desktop {
      width: 100%;
      padding-top: 0px;
      text-align: center;
    }
  }
  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    position: sticky;
    top: 0;
    z-index: 10;
    margin: 8px 0;

    @include desktop {
      justify-content: flex-end;
    }
    & > button,
    div,
    & > a {
      padding: 0 8px;
    }
  }
  &__resize {
    font-size: rem(23px);
    button {
      padding: 0px;
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
  &__icon {
    height: 27px;
  }
  &__bip {
    height: 40px;
  }
  &__resize button,
  &__icon,
  &__bip {
    &:hover {
      filter: drop-shadow(0 0 5px $warning);
    }
  }
  &__center {
    display: flex;
    align-items: center;
  }
  .skip {
    list-style: none;
    position: absolute;
    top: 0;
    a {
      display: block;
      left: -9000em;
      opacity: 0;
      position: absolute;
      text-align: center;
      text-decoration: none;
      top: 0;
      transition: opacity 0.3s ease 0s;
      &:hover,
      &:focus,
      &:active,
      &:visited:hover,
      &:visited:focus,
      &:visited:active {
        background: $link;
        color: #fff;
        font-size: em(15px);
        left: 10px;
        opacity: 1;
        outline: 2px solid $link;
        padding: 10px;
        top: 10px;
        white-space: nowrap;
        z-index: 10;
      }
    }
  }
}
</style>
