<script>
import { defineComponent } from 'vue';
import { useJsonFormsControl, rendererProps, uischemas } from '@jsonforms/vue';

export default defineComponent({
  name: 'DatePickerRenderer',
  props: {
    ...rendererProps(),
  },
  setup(props) {
    const { control, handleChange } = useJsonFormsControl(props);

    const formattedDate = computed({
      get() {
        return control.data || '';
      },
      set(newValue) {
        handleChange(control.path, newValue);
      },
    });

    return {
      control,
      formattedDate,
      handleChange,
    };
  },
});
</script>
