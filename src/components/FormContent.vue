<template>
  <div>
    <form-element>
      <fieldset class="k-form-fieldset">
        <div class="mb-3">
          <fieldwrapper>
            <klabel>
              First Name
            </klabel>
            <Input />
          </fieldwrapper>

          <fieldwrapper>
            <klabel>
              Last Name
            </klabel>
            <Input />
          </fieldwrapper>

          <!-- JSONFORM FOR AGE -->
          <json-forms
            :data="data"
            :schema="schema"
            :uischema="uischema"
            :renderers="renderers"
            @change="validateAge"
          />
          <!-- KENDO UI FOR EMAIL -->
          <field
            v-if="validAge"
            :name="'email'"
            :type="'email'"
            :component="'emailField'"
            :label="'Email'"
            :validator="emailValidatorData"
          >
            <template v-slot:emailField="{props}"> 
              <!-- 
                This 'props' gets all data in <field> which is the 'emailField'
                Then pass all the values in <forminput> component using props
              -->
              <forminput
                v-bind="props"
                @change="props.onChange"
                @blur="props.onBlur"
                @focus="props.onFocus"
              />
            </template>
          </field>
        </div>

      </fieldset>


      <div class="k-form-buttons">
        <kbutton 
          :theme-color="validAge ? 'primary' : 'secondary'"
          :disabled="validAge ? undefined : true "
          type="submit"
        >Next
        </kbutton>
      </div>
    </form-element>


  </div>
</template>
<script>
import { JsonForms } from '@jsonforms/vue'
import { vanillaRenderers } from '@jsonforms/vue-vanilla'
import { defineComponent } from 'vue'

import { Input } from '@progress/kendo-vue-inputs'
import { Button } from '@progress/kendo-vue-buttons'
import { Label } from "@progress/kendo-vue-labels"

import { FieldWrapper } from "@progress/kendo-vue-form";
import { Field, FormElement } from "@progress/kendo-vue-form"
import FormInput from "./FormInput.vue"

//REGEX FOR EMAIL VALIDATION AND ERROR MESSAGE
const emailRegex = new RegExp(/\S+@\S+\.\S+/)
const emailValidator = (value) => emailRegex.test(value) ? "" : "Please enter a valid email."

const renderers = [
  ...vanillaRenderers,
]

export default defineComponent({
  components: {
    JsonForms,
    Input,
    'kbutton': Button,
    klabel: Label,
    fieldwrapper: FieldWrapper,


    field: Field,
    'form-element': FormElement,
    'forminput': FormInput,
  },
  data() {
    return {
      //Whatever the return data in 'emailValidator' will store in 'emailValidatorData'
      emailValidatorData: emailValidator,
      renderers: Object.freeze(renderers),

      validAge: false,
      data: {
        date: '',
      },
      schema: {
        properties: {
          date: {
            type: 'string',
          },
        },
      },
      uischema: {
        type: 'Control',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/date',
            label: 'Birthday',
            options: {
              format: 'date',
              dateFormat: 'YYYY.MM',
              dateSaveFormat: 'YYYY-MM'
            },
          },
        ],
      },
    };
  },
  methods: {
    validateAge(event) {
      let currentDate = new Date()
      currentDate = currentDate.toISOString().split('T')[0]
      let inputDate = event.data.date
      const ageDiff = currentDate.split('-')[0] - inputDate.split('-')[0]

      if (ageDiff >= 18 && event.data.date !== '') {
        this.data.date = event.data.date
        this.validAge = true
      } else {
        this.validAge = false
      }
    },
    handleSubmit (dataItem) {
      alert(JSON.stringify(dataItem, null, 2))
    },
    clear(){
      this.kendoForm.onFormReset()
    }
  },
});
</script>
