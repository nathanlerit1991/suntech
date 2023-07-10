<template>
  <div id="app-wrapper">
    <k-form>
      <FormContent />
    </k-form>
  </div>
</template>

<script lang="ts">
import '@progress/kendo-theme-default/dist/all.css'
import { defineComponent } from 'vue'
import { Form } from "@progress/kendo-vue-form"
import FormContent from './components/FormContent.vue'

export default defineComponent({
  components: {
    'k-form': Form,
    FormContent
  }
})
</script>