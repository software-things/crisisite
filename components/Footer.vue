<template>
  <footer class="footer">
    <div class="row">
      <div class="columns small-12 large-6">
        <p class="footer__name">{{ content.headline }}</p>
        <p class="footer__contact">Telefon: <a :href="`tel:${content.phone}`">{{ content.phone }}</a> / E-mail: <a :href="`mailto:${content.email}`">{{ content.email }}</a></p>
      </div>
      <div class="columns small-12 large-6">
        <ul class="footer__menu">
          <li v-for="item in menu" :key="item.ID">
            <a v-if="item.external" :href="item.slug" class="navigation__element" @click.native="emitClosure">{{ item.name }}</a>
            <nuxt-link v-else class="navigation__element" @click.native="emitClosure" :to="item.slug">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Footer',
  computed: {
    ...mapGetters({
      menu: 'getFooterMenu',
      content: 'getAdditionalData'
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