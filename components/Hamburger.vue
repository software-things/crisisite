<template>
  <button :class="['hamburger', { 'hamburger--visible': menuVisible }]" @click="menuClick" title="Rozwiń menu">
    <div class="hamburger__stripe"></div>
    <div class="hamburger__stripe"></div>
    <div class="hamburger__stripe"></div>
  </button>
</template>

<script>
export default {
  props: ['menuVisible'],
  methods: {
    menuClick() {
      const switcher = !this.menuVisible;
      this.$emit('hamburger-clicked', switcher);
    },
  },
}
</script>

<style lang="scss" scoped>
.hamburger {
  padding: 0;
  display: block;
  z-index: 999;
  width: 45px;
  height: 45px;
  text-align: center;
  background: transparent;
  border: none;
  outline: none;
  background: $font;
  text-align: center;

  @include desktop {
    display: none;
  }

  &__stripe {
    width: 80%;
    height: 2px;
    margin: 8px 3px;
    transition: transform 300ms ease, opacity 500ms ease, visibility 500ms ease;
    background-color: white;

    @include desktop {
      height: 4px;
      margin: 8px 0;
    }

    &:nth-child(1) {
      margin-top: 0px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__text {
    color: white;
    text-transform: uppercase;
    font-size: 9px;
    transition: transform 300ms ease, opacity 500ms ease, visibility 500ms ease;
  }

  &--visible {
    .hamburger__stripe {
      &:nth-child(1) {
        transform: rotate(45deg) translate(2px, -4px);
        top: 0;
        transform-origin: left center;
        @include desktop {
          transform: rotate(45deg) translate(0, 0);
          
        }
      }
      &:nth-child(2) {
        transform: translateX(100%);
        opacity: 0;
        visibility: hidden;
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(0px, 4px);
        transform-origin: left center;
      }
    }
  }
}
</style>