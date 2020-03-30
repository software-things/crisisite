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
            <svg class="footer__st" xmlns="http://www.w3.org/2000/svg" width="40" height="17" viewBox="0 0 193.9 123.302"><g transform="translate(0.63 0.5)"><path d="M132.024,19.432h6.645V12.709h-6.645V9.624h16.69V2.9H125.3V36.36h6.724Z" transform="translate(-26.186 -0.606)" fill="black" stroke="#000" stroke-width="1"/><path d="M87.663,38.048A19.024,19.024,0,1,0,68.6,19.063,19.074,19.074,0,0,0,87.663,38.048Zm0-31.324a12.34,12.34,0,1,1-12.34,12.34A12.356,12.356,0,0,1,87.663,6.724Z" transform="translate(-14.336)" fill="black" stroke="#000" stroke-width="1"/><path d="M179.254,125.739h11.153v7.752l-4.192,4.192h-3.4a12.334,12.334,0,0,1-9.1-4.034,12.015,12.015,0,0,1-3.006-9.571A12.255,12.255,0,0,1,181.152,113.4a12.383,12.383,0,0,1,10.2,3.4l4.746-4.746a18.73,18.73,0,0,0-15.741-5.3,19.052,19.052,0,0,0-16.295,16.532,18.9,18.9,0,0,0,18.747,21.041h6.17l8.147-8.147V118.936H179.254v6.8Z" transform="translate(-34.26 -22.274)" fill="black" stroke="#000" stroke-width="1"/><path d="M195.135,63.124V56.4H171.8V89.781h23.335V83.057H178.524V72.932h6.645V66.209h-6.645V63.124Z" transform="translate(-35.903 -11.787)" fill="black" stroke="#000" stroke-width="1"/><path d="M170.215,36.36h6.724V9.624h6.724V2.9H162.7V9.624h7.515Z" transform="translate(-34.002 -0.606)" fill="black" stroke="#000" stroke-width="1"/><path d="M65.938,124.208H42.524V109.1H35.8v33.539h6.724V130.932H65.938v11.707h6.724V109.1H65.938Z" transform="translate(-7.482 -22.8)" fill="black" stroke="#000" stroke-width="1"/><rect width="6.724" height="33.539" transform="translate(72.932 86.3)" fill="black" stroke="#000" stroke-width="1"/><path d="M4,115.745h7.277v26.895H18V115.745h6.961V109.1H4Z" transform="translate(-0.836 -22.8)" fill="black" stroke="#000" stroke-width="1"/><path d="M38.285,89.509,48.727,57.157,42.319,55.1,34.488,79.305,27.606,62.852H21.041l-6.8,16.453L6.407,55.1,0,57.157,10.441,89.509h6.8l7.119-17.086,7.119,17.086Z" transform="translate(0 -11.515)" fill="black" stroke="#000" stroke-width="1"/><path d="M140.223,134.32V110.273l-6.17-1.74-13.764,21.832V110.273l-5.7-2.373L107,115.177l4.588,4.9,1.978-1.9v23.81l6.17,1.74L133.578,121.9v20.487l5.7,2.373,7.831-7.831-4.746-4.746Z" transform="translate(-22.361 -22.549)" fill="black" stroke="#000" stroke-width="1"/><path d="M103.161,89.593V58.822l-6.17-1.74-1.266,2.057a18.172,18.172,0,0,0-11-3.639A18.457,18.457,0,0,0,80.38,91.887l3.639-1.5L96.438,70.529V89.672h6.724ZM79.747,84.53a11.707,11.707,0,1,1,12.34-19.7Z" transform="translate(-13.856 -11.599)" fill="black" stroke="#000" stroke-width="1"/><path d="M149.915,66.862A10.4,10.4,0,0,0,139.553,56.5H123.1V89.881h6.724V77.146h9.729a3.851,3.851,0,0,0,.949-.079l8.859,14.555,5.7-3.48L146.672,74.3A10.279,10.279,0,0,0,149.915,66.862ZM129.9,63.224h9.729a3.639,3.639,0,0,1,0,7.277H129.9Z" transform="translate(-25.726 -11.808)" fill="black" stroke="#000" stroke-width="1"/><rect width="23.414" height="6.724" transform="translate(168.091 12.103)" fill="black" stroke="#000" stroke-width="1"/><path d="M30,25.95l.079.475a11.373,11.373,0,0,0,3.006,6.961,10.681,10.681,0,0,0,8.464,3.639c6.8,0,11.628-4.746,11.628-11.549,0-4.9-2.689-8.227-8.385-10.6l-3.48-1.424c-3.4-1.187-3.4-2.927-3.4-3.48,0-2.215,1.74-3.56,4.271-3.56A4.7,4.7,0,0,1,45.5,7.519,5.08,5.08,0,0,1,46.928,9.5l.237.633,5.221-3.085-.237-.554A13.857,13.857,0,0,0,49.38,2.852,10.671,10.671,0,0,0,42.1.4c-6.882.079-10.521,4.9-10.521,9.65,0,4.034,2.452,7.119,7.356,9.176l3.322,1.424c2.373.949,4.588,2.294,4.588,5.3a5.162,5.162,0,0,1-9.1,3.4,7.246,7.246,0,0,1-1.345-4.034v-.712Z" transform="translate(-6.27 -0.084)" fill="black" stroke="#000" stroke-width="1"/><path d="M229.113,122.155l-3.48-1.424c-3.322-1.345-3.322-3.085-3.322-3.639,0-2.136,1.661-3.56,4.271-3.56a4.7,4.7,0,0,1,3.322,1.107,5.08,5.08,0,0,1,1.424,1.978l.237.633,5.221-3.085-.237-.475a13.856,13.856,0,0,0-2.769-3.639A10.671,10.671,0,0,0,226.5,107.6c-6.961,0-10.6,4.825-10.6,9.571,0,4.034,2.452,7.2,7.356,9.176l3.322,1.424c2.373.949,4.588,2.294,4.588,5.3a5.162,5.162,0,0,1-9.1,3.4,7.246,7.246,0,0,1-1.345-4.034v-.712l-6.328,1.345.079.475a11.373,11.373,0,0,0,3.006,6.961,10.681,10.681,0,0,0,8.464,3.639c6.8,0,11.628-4.746,11.628-11.549C237.5,127.85,234.808,124.449,229.113,122.155Z" transform="translate(-44.806 -22.487)" fill="blackk" stroke="#000" stroke-width="1"/></g></svg>
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
    width: 40px;
    padding: 0 5px;
  }

  &__authors {
    font-size: rem(14px);
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    svg {
      transform: translateY(5px);
    }
  }
}
</style>