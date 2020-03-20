<template>
  <nav class="navigation">
    <ul class="navigation__menu">
      <li v-for="(item, index) in menu" :key="index">
        <nuxt-link class="navigation__element" @click.native="emitClosure" :to="item.slug">{{ item.name }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          name: 'Komunikaty',
          slug: '/'
        },
        {
          name: 'Objawy koronawirusa',
          slug: '/'
        },
        {
          name: 'Zasady postępowania',
          slug: '/'
        },
        {
          name: 'Oddziały zakaźne',
          slug: '/'
        },
        {
          name: 'Jedzenie na wynos',
          slug: '/'
        },
        {
          name: 'Wolontariat',
          slug: '/'
        },
        {
          name: 'Wsparcie osób starszych',
          slug: '/'
        },
        {
          name: 'Dane kontaktowe',
          slug: '/'
        }
      ]
    }
  },
  methods:{
    emitClosure() {
      this.$emit('navigation-clicked', false);
    }
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
  z-index: 99;
  padding: 60px 0;

  @include desktop {
    position: inherit;
    width: 100%;
    height: inherit;
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
  }

  &__element {
    display: inline-block;
    color: $link;
    font-weight: 400;
    padding-bottom: 10px;
    padding-left: 50px;
  }

  .nuxt-link-exact-active.nuxt-link-active {
    font-weight: 700;
  }
}
</style>