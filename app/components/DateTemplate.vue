<template functional>
  <div class="date">
    <img src="~/assets/img/icons/calendar.svg" alt="Ikona kalendrza">
    <p>{{ `Data ostatniej modyfikacji: ${props.date}` }}</p>
  </div>
</template>

<style lang="scss">
  .date {
    display: flex;
    font-size: rem(14px);
    margin-bottom: 5px;
    align-items: center;

    p {
      margin: 0;
      margin-left: 5px;
    }
  }
</style>