<template>
  <json-forms
    :data="data"
    :schema="schema"
    :uischema="uischema"
    :renderers="renderers"
    @change="validateAgeFn"
  />
</template>

<script>
import { JsonForms } from '@jsonforms/vue'
import { vanillaRenderers } from '@jsonforms/vue-vanilla'
import { defineComponent } from 'vue'
const renderers = [
  ...vanillaRenderers,
]
export default defineComponent({
  components: {
    JsonForms
  },
  data() {
    return {
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
      }
    }
  },
  methods: {
    validateAgeFn(event) {
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
      this.$emit('update-age', this.validAge)
    },
  }
})
</script>