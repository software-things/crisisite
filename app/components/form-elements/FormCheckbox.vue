<template>
  <div class="form-control">
    <label v-for="(choice, index) in choices" :key="index">
      <input
        :type="config.type"
        :name="config.id"
        :value="choice.value"
        :required="config.required"
        @input="update($event.target.value)"
      />
      {{ choice.text }}
    </label>
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