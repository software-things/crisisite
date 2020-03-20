<template>
  <header class="header">
    <div class="row header__row">
      <div class="columns small-12 large-2">
        <img src="~/assets/img/city-logo.svg" alt="Logo Katowice z napisem Katowice – dla odmiany">
      </div>
      <div class="columns small-12 large-7">
        <p class="header__page-title">Wydział Zarządzania Kryzysowego Urzędu Miasta Katowice</p>
      </div>
      <div class="colums small-12 large-3">
        <div class="header__flex">
          <Hamburger @hamburger-clicked="handleMenuVisibility" :menuVisible="menuVisible"/>
          <button type="button">
            <img src="~/assets/img/icons/search.svg" alt="Wyszukaj w serwisie">
          </button>
          <div>
            <button type="button">-</button>
            A
            <button type="button">+</button>
          </div>
          <button type="button">
            <img src="~/assets/img/icons/contrast.svg" alt="Wersja kontrastowa">
          </button>
          <button type="button">
            <img src="~/assets/img/icons/deaf.svg" alt="Informacja dla słabosłyszących">
          </button>
          <a href="https://bip.katowice.eu/Strony/default.aspx?menu=562" rel="noopener noreferrer nofollow" target="_blank">
            <img src="~/assets/img/icons/bip.svg" alt="Biuletyn Informacji Publicznej">
          </a>
          <div class="hide-large">
            <Navigation v-if="menuVisible" @navigation-clicked="handleMenuVisibility" />
          </div>
        </div>
      </div>
    </div>
    <div class="header__warning">
      <p>Nowy tymczasowy szpital zakaźny w Szkole Podstawowej numer 8</p>
    </div>
  </header>
</template>

<script>
import Hamburger from "~/components/Hamburger";
import Navigation from "~/components/Navigation";

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
    }
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

    @include desktop {
      justify-content: flex-end;
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
