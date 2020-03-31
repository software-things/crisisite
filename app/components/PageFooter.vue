<template>
  <footer class="footer">
    <div class="row">
      <div class="columns small-12 large-6">
        <p class="footer__name">{{ content.headline }}</p>
        <p class="footer__contact">
          Telefon:
          <a :href="`tel:${content.phone}`">{{ content.phone }}</a> / E-mail:
          <a :href="`mailto:${content.email}`">{{ content.email }}</a>
        </p>
      </div>
      <div class="columns small-12 large-6">
        <ul class="footer__menu">
          <li v-for="item in menu" :key="item.ID">
            <a v-if="item.external" :href="item.slug" class="navigation__element">{{ item.name }}</a>
            <nuxt-link v-else class="navigation__element" :to="item.slug">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
      <div class="row">
        <div class="columns small-12 footer__authors">
          Designed by
          <a href="https://kavastudio.pl/" target="_blank">
            <img src="~assets/img/kava.svg" class="footer__kava" alt="Logo KAVA Studio">
          </a>
          Developed by
          <a href="https://softwarethings.pro/" target="_blank">
            <img src="~assets/img/st.svg" class="footer__st" alt="Logo Software Things">
          </a>
        </div>
      </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters({
      menu: "getFooterMenu",
      content: "getAdditionalData"
    })
  }
};
</script>

<style lang="scss">
.footer {
  border-top: 2px solid #f4f4f4;
  margin-top: 50px;

  &__contact {
    font-size: rem(14px);
    font-weight: 700;
    margin: 0;

    a {
      font-weight: 400;
      color: $link;
      @include desktop {
        &:hover {
          color: black;
        }
      }
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

    li > a {
      padding-left: 0;
    }

    @include desktop {
      text-align: right;
    }
  }

  &__kava {
    height: 11px;
    transform: translateY(-2px);
    padding: 0 5px;
  }

  &__st {
    height: 18px;
    margin-left: 5px;
  }

  &__authors {
    font-size: rem(14px);
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>