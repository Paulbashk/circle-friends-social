<script setup lang="ts">
interface IProps {
  name: string
  items: any[]
  itemTitle?: string
  itemValue?: string
  placeholder?: string
  label?: string
  initialValue?: string
}

const props = defineProps<IProps>()

const { value, errorMessage, handleChange } = useField<string>(
  () => props.name,
  undefined,
  {
    initialValue: props.initialValue,
  }
)
</script>

<template>
  <v-select
    hide-details="auto"
    :items="items"
    :label="label"
    :name="name"
    :placeholder="placeholder"
    :item-title="itemTitle"
    :item-value="itemValue"
    density="comfortable"
    variant="outlined"
    v-model="value"
    @change="handleChange"
    :error-messages="errorMessage" />
</template>
