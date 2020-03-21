<template>
  <div class="form">
    <h2 v-if="data.headline" class="form__headline">{{ data.headline }}</h2>
    <div v-show="success" class="alert alert--success">Formularz został przesłany poprawnie.</div>
    <div
      v-show="error"
      class="alert alert--error"
    >Niestety, wystąpił błąd podczas wysyłania formularza, spróbuj ponownie wkrótce.</div>
    <SchemaForm v-show="!success" :schema="schema" v-model="userData" />
    <div v-show="sending" class="alert alert--loading">Trwa przesyłanie formularza...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SchemaForm } from "formvuelatte";
import FormText from "~/components/form-elements/FormText";
import FormTextarea from "~/components/form-elements/FormTextarea";
import FormSelect from "~/components/form-elements/FormSelect";
import FormCheckbox from "~/components/form-elements/FormCheckbox";
import FormButton from "~/components/form-elements/FormButton";

export default {
  name: "BaseForm",
  components: {
    SchemaForm
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      userData: {},
      sending: false,
      success: false,
      error: false,
      componentDictionary: {
        textarea: FormTextarea,
        select: FormSelect,
        checkbox: FormCheckbox,
        submit: FormButton
      }
    };
  },
  mounted() {
    // @TOOD: Poprawić ten event:
    if (process.client) {
      const form = document.querySelector(".schema-form");
      form.addEventListener("submit", e => {
        e.preventDefault();
        this.submit();
      });
    }
  },
  computed: {
    ...mapGetters({
      config: "getAdditionalData"
    }),
    schema() {
      const fields = [];
      this.data.fields.map(field => {
        fields.push({
          component: this.componentDictionary[field.type]
            ? this.componentDictionary[field.type]
            : FormText,
          model: field.name,
          config: {
            label: field.label,
            id: field.name,
            type: field.type,
            placeholder: field.placeholder,
            required: field.required == "true",
            rows: field.rows,
            choices: field.choices
          }
        });
      });
      return fields;
    }
  },
  methods: {
    submit() {
      this.sending = true;
      const formData = new FormData();
      Object.entries(this.userData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("_subject", this.data.headline);
      formData.append("to", this.config.email);
      this.$axios
        .post(
          "https://czk.softwarethings.pro/form-carter/index.php",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Requested-With": "XMLHttpRequest"
            }
          }
        )
        .then(response => {
          this.sending = false;
          if (response.data.data.message === "OK") {
            this.success = true;
            this.error = false;
          }
        })
        .catch(e => {
          this.error = true;
        });
    }
  }
};
</script>