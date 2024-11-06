<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only'],
})

useSeoMeta({
  title: 'Войти | ДружныйКруг',
})
</script>

<template>
  <nuxt-layout>
    <ui-section-form>
      <form-auth />
    </ui-section-form>
  </nuxt-layout>
</template>
