<template>
  <div id="form-wrapper" v-if="!isWelcome">
    <h2>Vite, Vue3 and Typescript</h2>
    <form-element>
      <fieldset class="k-form-fieldset">
        <div class="mb-3">
          <k-fieldwrapper>
            <k-label>
              First Name
            </k-label>
            <k-input v-model="first_name" />
          </k-fieldwrapper>

          <k-fieldwrapper>
            <k-label>
              Last Name
            </k-label>
            <k-input v-model="last_name" />
          </k-fieldwrapper>

          <!-- JSONFORM FOR AGE -->
          <date-picker @update-age="updateAgeFn" />

          <!-- KENDO UI FOR EMAIL -->
          <k-field
            v-if="isAgeValid"
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
              <email-input
                v-bind="props"
                @change="props.onChange"
                @blur="props.onBlur"
                @focus="props.onFocus"
              />
            </template>
          </k-field>
        </div>

      </fieldset>


      <div class="k-form-buttons">
        <k-button 
          :theme-color="isAgeValid ? 'primary' : 'secondary'"
          :disabled="isAgeValid ? undefined : true "
          @click="isWelcome = true"
        >Next
        </k-button>
      </div>
    </form-element>
  </div>
  <welcome
    v-if="isWelcome"
    :props_first_name = first_name
    :props_last_name  = last_name
  />
</template>
<script>
import { defineComponent } from 'vue'

import { Input } from '@progress/kendo-vue-inputs'
import { Button } from '@progress/kendo-vue-buttons'
import { Label } from "@progress/kendo-vue-labels"
import { FieldWrapper, Field, FormElement } from "@progress/kendo-vue-form"

import DatePicker from "./DatePicker.vue"
import EmailInput from "./EmailInput.vue"
import Welcome from "./Welcome.vue"

//REGEX FOR EMAIL VALIDATION AND ERROR MESSAGE
const emailRegex = new RegExp(/\S+@\S+\.\S+/)
const emailValidator = (value) => emailRegex.test(value) ? "" : "Please enter a valid email."

export default defineComponent({
  components: {
    'k-input': Input,
    'k-button': Button,
    'k-label': Label,
    'k-fieldwrapper': FieldWrapper,
    'k-field': Field,

    'form-element': FormElement,
    'email-input': EmailInput,
    'date-picker': DatePicker,
    'welcome': Welcome
  },
  data() {
    return {
      //Whatever the return data in 'emailValidator' will store in 'emailValidatorData'
      emailValidatorData: emailValidator,
      first_name: '',
      last_name: '',
      isAgeValid: '',
      isWelcome: false,
    }
  },
  methods: {
    //Data from child component push to 'isAgeValid'
    updateAgeFn(data){
      this.isAgeValid = data
    }
  }
});
</script>
