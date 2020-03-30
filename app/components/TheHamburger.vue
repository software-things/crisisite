<template>
  <button
    :class="['hamburger', { 'hamburger--visible': menuVisible }]"
    @click="menuClick"
    title="Rozwiń menu"
    type="button"
  >
    <span class="hamburger__stripe"></span>
    <span class="hamburger__stripe"></span>
    <span class="hamburger__stripe"></span>
  </button>
</template>

<script>
export default {
  props: ["menuVisible"],
  methods: {
    menuClick() {
      const switcher = !this.menuVisible;
      this.$emit("hamburger-clicked", switcher);
    }
  }
};
</script>

<style lang="scss" scoped>
.hamburger {
  background: transparent;
  border: none;
  display: block;
  height: 45px;
  outline: none;
  padding: 0;
  position: relative;
  text-align: center;
  text-align: center;
  width: 45px;
  z-index: 15;

  @include desktop {
    display: none;
  }

  &__stripe {
    background-color: $font;
    display: block;
    height: 2px;
    margin: 8px 3px;
    transition: transform 300ms ease, opacity 500ms ease, visibility 500ms ease;
    width: 80%;

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
    font-size: 9px;
    text-transform: uppercase;
    transition: transform 300ms ease, opacity 500ms ease, visibility 500ms ease;
  }

  &--visible {
    .hamburger__stripe {
      &:nth-child(1) {
        top: 0;
        transform-origin: left center;
        transform: rotate(45deg) translate(2px, -4px);
        @include desktop {
          transform: rotate(45deg) translate(0, 0);
        }
      }
      &:nth-child(2) {
        opacity: 0;
        transform: translateX(100%);
        visibility: hidden;
      }
      &:nth-child(3) {
        transform-origin: left center;
        transform: rotate(-45deg) translate(0px, 4px);
      }
    }
  }
}
</style>