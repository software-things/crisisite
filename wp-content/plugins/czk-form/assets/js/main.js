const app = new Vue({
    el: '#czk-form',
    created() {
        this.emptyField = Object.assign({}, this.field);
    },
    mounted() {
        if (form_json.length > 20) {
            this.fields = JSON.parse(form_json).fields;
            if (typeof this.fields !== 'string') {
                this.fields.map(field => {
                    this.renderField(field);
                });
            } else {
                this.fields = [];
            }
        }
    },
    data: {
        edit: false,
        emptyField: {},
        field: {
            label: '',
            name: '',
            type: 'text',
            placeholder: '',
            required: true,
            rows: 5,
            choices: '',
        },
        fields: []
    },
    methods: {
        resetField() {
            this.edit = false;
            this.field = Object.assign({}, this.emptyField);
        },
        slugify(string) {
            string = string.replace(/^\s+|\s+$/g, '');
            string = string.toLowerCase();
            const from = 'ąćęłńóśźż·/_,:;';
            const to = 'acelnoszz------';
            for (let i = 0, l = from.length; i < l; i++) {
                string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }
            string = string.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
            return string;
        },
        createField() {
            let field = Object.assign({}, this.field);
            if (field.type !== 'textarea') {
                field.rows = false;
            }
            if (!['select', 'checkbox'].includes(field.type)) {
                field.choices = false;
            }
            if (!this.edit) {
                const exists = this.fields.find(field => {
                    return field.name === this.field.name;
                });
                if (typeof exists === 'object') {
                    alert('Pole z taką nazwą już istnieje.');
                    return false;
                } else {
                    this.fields.push(field);
                }
            }
            this.resetField();
        },
        renderField(field) {
            let fieldHtml = ``;
            if (field.type === 'textarea') {
                fieldHtml = `<textarea id="${field.name}" name="${field.name}" rows="${field.rows}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>`;
            } else if (field.type === 'select') {
                const choices = field.choices.split(/\r?\n/).map(option => {
                    option = option.split(':');
                    return option[0].length > 0 ? `<option value="${option[0].trim()}">${(option[1] || option[0]).trim()}</option>` : '';
                }).join("\n");
                fieldHtml = `<select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>${choices}</select>`;
            } else if (field.type === 'checkbox') {
                fieldHtml = field.choices.split(/\r?\n/).map(option => {
                    option = option.split(':');
                    return option[0].length > 0 ? `<label><input type="checkbox" name="${field.name}" value="${option[0].trim()}"> ${(option[1] || option[0]).trim()}</label>` : '';
                }).join("\n");
            } else if (field.type === 'submit') {
                fieldHtml = `<button name="${field.name}" type="submit">${field.label}</button>`;
            } else {
                fieldHtml = `<input id="${field.name}" name="${field.name}" type="${field.type}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`;
            }
            return `<div class="form-control">${['submit', 'checkbox'].includes(field.type) ? `${fieldHtml}` : `<label for="${field.name}" name="${field.name}">${field.label}</label>${fieldHtml}`}</div>`;
        },
        editField(field) {
            this.edit = true;
            this.field = field;
        },
        deleteCurrentField() {
            this.fields = this.fields.filter(field => {
                return field.name !== this.field.name;
            });
            this.resetField();
        }
    },
    computed: {
        json() {
            return JSON.stringify(this.fields);
        }
    }
});

jQuery(document).ready(function () {
    jQuery('#czk_form').addClass('closed');
});

jQuery(document).on('click', '.editor-post-publish-button', function () {
    wp.ajax.post('update_czk_form', {
        post_id: jQuery('#post_ID').val(),
        headline: jQuery('#form-headline').val(),
        fields: app.fields
    });
});