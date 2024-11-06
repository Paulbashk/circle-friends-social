<script setup lang="ts">
interface IProps {
  name: string
  type?: 'text' | 'number' | 'email' | 'password'
  placeholder?: string
  label?: string
  initialValue?: string | null
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
})

const { value, errorMessage, handleChange, handleBlur } = useField<
  string | null
>(() => props.name, undefined, {
  initialValue: props.initialValue,
})
</script>

<template>
  <v-text-field
    hide-details="auto"
    :label="label"
    :type="type"
    variant="outlined"
    :placeholder="placeholder"
    density="comfortable"
    :name="name"
    clearable
    v-model="value"
    :error-messages="errorMessage"
    @blur="handleBlur"
    @change="handleChange" />
</template>
