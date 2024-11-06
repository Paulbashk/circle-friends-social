<script setup lang="ts">
definePageMeta({
  middleware: ['user-reg-only'],
})

useSeoMeta({
  title: 'Закончите регистрацию | ДружныйКруг',
})
</script>

<template>
  <nuxt-layout>
    <ui-section-form>
      <form-register-next />
    </ui-section-form>
  </nuxt-layout>
</template>
