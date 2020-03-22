<template>
  <div class="form-control">
    <label :for="config.id">{{ config.label }}</label>
    <input
      :value="value"
      :type="config.type"
      :id="config.id"
      :placeholder="config.placeholder"
      :required="config.required"
      @input="update($event.target.value)"
    />
  </div>
</template>

<script>
import { FormMixin } from "formvuelatte";

export default {
  name: "FormText",
  mixins: [FormMixin],
  props: ["config"]
};
</script>