<template>
  <footer class="footer">
    <div class="row">
      <div class="columns small-12 large-6">
        <p class="footer__name">Wydział Zarządzania Kryzysowego Urzędu Miasta Katowice</p>
        <p class="footer__contact">Telefon: <a href="tel: 32 253 95 84">32 253 95 84</a> / E-mail: <a href="mailto: zk@katowice.e">zk@katowice.eu</a></p>
      </div>
      <div class="columns small-12 large-6">
        <ul class="footer__menu">
          <li v-for="item in menu" :key="item.ID">
            <nuxt-link class="navigation__element" @click.native="emitClosure" :to="item.slug">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import API from '../api/connectors/wordpress';

export default {
  name: 'Footer',
  data() {
    return {
      menu: null
    }
  },
  mounted() {
    let api = new API(this.$axios);
    let menu = api.getFooterMenu();
    menu.then((resp) => {
      this.menu = resp
    })
  }
}
</script>

<style lang="scss">
.footer {
  border-top: 2px solid #F4F4F4;
  margin-top: 50px;

  &__contact {
    font-size: rem(14px);
    font-weight: 700;
    margin: 0;

    a {
      font-weight: 400;
      color: $link;
    }
  }

  &__name {
    font-weight: 700;
    width: 80%;
    margin-bottom: 10px;
  }

  &__menu {
    list-style: none;
    font-size: rem(14px);
    color: $link;
    padding-left: 0;

    @include desktop {
      text-align: right;
    }
  }
}
</style>