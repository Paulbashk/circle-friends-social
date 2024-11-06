<script setup lang="ts">
interface IProps {
  href: string
}

const props = defineProps<IProps>()
</script>

<template>
  <v-hover #default="{ isHovering, props }">
    <NuxtLink
      v-bind="props"
      :to="href"
      class="text-primary text-decoration-none transition-opacity"
      :class="{ 'opacity-70': isHovering }">
      <slot></slot>
    </NuxtLink>
  </v-hover>
</template>
