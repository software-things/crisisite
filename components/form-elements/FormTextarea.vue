<template>
  <div class="form-control">
    <label :for="config.id">{{ config.label }}</label>
    <textarea
      :value="value"
      :rows="config.rows"
      :id="config.id"
      :placeholder="config.placeholder"
      :required="config.required"
      @input="update($event.target.value)"
    ></textarea>
  </div>
</template>

<script>
import { FormMixin } from "formvuelatte";

export default {
  name: "FormTextarea",
  mixins: [FormMixin],
  props: ["config"]
};
</script>