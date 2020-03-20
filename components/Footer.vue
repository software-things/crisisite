<template>
  <footer class="footer">
    <div class="row">
      <div class="columns small-12 large-6">
        <p class="footer__name">Wydział Zarządzania Kryzysowego Urzędu Miasta Katowice</p>
        <p class="footer__contact">Telefon: <a href="tel: 32 253 95 84">32 253 95 84</a> / E-mail: <a href="mailto: zk@katowice.e">zk@katowice.eu</a></p>
      </div>
      <div class="columns small-12 large-6">
        <ul class="footer__menu">
          <li>
            <nuxt-link to="">Deklaracja dostępności</nuxt-link>
          </li>
          <li>
            <nuxt-link to="">Mapa strony</nuxt-link>
          </li>
          <li>
            <nuxt-link to="">Polityka prywatności</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

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