<script setup lang="ts">
interface IProps {
  title: string
  description?: string
  disabled?: boolean
  error?: string | null
}

interface IEvents {
  (e: 'onSubmit', event: Event): void
}

const emit = defineEmits<IEvents>()
const props = defineProps<IProps>()
</script>

<template>
  <ui-card
    class="card-form"
    tag="form"
    @submit.prevent="$emit('onSubmit', $event)">
    <div class="mb-7 text-center">
      <h1 class="text-title-form">{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <slot name="default"></slot>
    <div class="d-flex ga-4 mx-auto align-center" v-if="$slots.buttons">
      <slot name="buttons"></slot>
    </div>
    <div class="pt-2 text-center" v-if="error">
      <v-alert variant="text" density="compact">
        <template #text>
          <v-messages
            :active="true"
            :messages="error"
            color="error"
            style="opacity: 1" />
        </template>
      </v-alert>
    </div>
  </ui-card>
</template>

<style scoped lang="scss">
.card-form {
  width: 480px;
  padding: 24px;
  box-shadow: 0 0 16px rgba(var(--v-theme-primary), 0.2);
  display: flex;
  flex-direction: column;
}
</style>
