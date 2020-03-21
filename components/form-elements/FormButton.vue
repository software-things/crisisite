<template>
  <div class="form-control">
    <button
      :value="value"
      :type="config.type"
      :id="config.id"
      @input="update($event.target.value)"
    >{{ config.label }}</button>
  </div>
</template>

<script>
import { FormMixin } from "formvuelatte";

export default {
  name: "FormButton",
  mixins: [FormMixin],
  props: ["config"]
};
</script>