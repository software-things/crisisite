<template>
  <nav class="navigation">
    <ul class="navigation__menu">
      <li @click="emitClosure" v-for="item in menu" :key="item.ID">
        <a v-if="item.external" :href="item.slug" class="navigation__element" >{{ item.name }}</a>
        <nuxt-link v-else class="navigation__element" :to="item.slug">{{ item.name }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods:{
    emitClosure() {
      this.$emit('navigation-clicked', false);
    }
  },
  computed: {
    ...mapGetters({
      menu: 'getMainMenu'
    })
  }
}
</script>

<style lang="scss">
.navigation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: $special-bg;
  padding: 60px 0;
  z-index: 15;

  @include desktop {
    position: inherit;
    width: 100%;
    height: auto;
    padding: 20px 0;
    margin-top: 15px;
  }
  
  &__menu {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    list-style: none;

    @include desktop {
      overflow-y: initial;
    }
  }

  &__element {
    display: inline-block;
    color: $link;
    font-weight: 400;
    padding-bottom: 10px;
    padding-left: 50px;

    @include desktop {
      &:hover {
        color: black;
      }
    }
  }

  .nuxt-link-exact-active.nuxt-link-active {
    font-weight: 700;
  }
}
</style>