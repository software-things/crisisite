<template>
  <div class="breadcrumbs">
    <nuxt-link :to="item.href" v-for="(item, index) in $store.state.breadcrumbs" :key="index">
      <img v-if="index === 0" src="~/assets/img/icons/home.svg" alt="Strona startowa">
      {{ index === 0 ? item.name : `/ ${item.name}`}}
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

      &:first-of-type {
        margin-left: 0;
      }

      img {
        margin-right: 5px;
      }

      @include desktop {
        &:hover {
          color: black;
        }
      }

      &.nuxt-link-exact-active {
        font-weight: 700;
      }
    }
  }
</style>