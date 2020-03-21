<template>
  <div class="form-control">
    <label :for="config.id">{{ config.label }}</label>
    <select :id="config.id" :required="config.required" @input="update($event.target.value)">
      <option v-show="config.placeholder" value selected>{{ config.placeholder }}</option>
      <option
        v-for="(choice, index) in choices"
        :key="index"
        :value="choice.value"
      >{{ choice.text }}</option>
    </select>
  </div>
</template>

<script>
import { FormMixin } from "formvuelatte";

export default {
  name: "FormSelect",
  mixins: [FormMixin],
  props: ["config"],
  computed: {
    choices() {
      return this.config.choices.split(/\n/).map(option => {
        option = option.split(":");
        return {
          value: option[0].trim(),
          text: (option[1] || option[0]).trim()
        };
      });
    }
  }
};
</script>