<template>
  <div id="form-wrapper">
    <h2>Vite, Vue3 and Typescript</h2>
    <k-form>
      <FormContent />
    </k-form>
  </div>
</template>

<script lang="ts">
import '@progress/kendo-theme-default/dist/all.css';
import { ref, defineComponent } from 'vue'
import { Form } from "@progress/kendo-vue-form"
import FormContent from './components/FormContent.vue'

export default defineComponent({
  components: {
    'k-form': Form,
    FormContent
  }
})
</script>