<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only'],
})

useSeoMeta({
  title: 'Создать аккаунт | ДружныйКруг',
})
</script>

<template>
  <nuxt-layout>
    <ui-section-form>
      <form-register />
    </ui-section-form>
  </nuxt-layout>
</template>
