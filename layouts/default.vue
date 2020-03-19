<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  name: 'Layout',
  components: {
    Header
  }
}
</script>
