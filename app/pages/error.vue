<template>
  <div class="error">
    <h1>{{ title }}</h1>
    <p>Ups! Nikogo tu nie ma!</p>
    <nuxt-link to="/" class="btn">Przejdź do strony głównej</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      title: "Błąd 404"
    };
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>