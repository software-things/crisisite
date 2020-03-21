<template>
  <div class="breadcrumbs">
    <nuxt-link to="/">
      <img src="~/assets/img/icons/home.svg" alt="Strona startowa">
      Strona startowa
    </nuxt-link> /
    <nuxt-link to="/">
      Komunikaty
    </nuxt-link>
  </div>
</template>

<style lang="scss">
  .breadcrumbs {
    margin-top: 15px;
    display: flex;

    a {
      color: $link;
      display: flex;
      align-items: center;
      margin: 0 2px;
      img {
        margin-right: 5px;
      }
    }
  }
</style>