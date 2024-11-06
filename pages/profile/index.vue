<script setup lang="ts">
definePageMeta({
  middleware: ['user-only'],
})

useSeoMeta({
  title: 'Павел Бабушкин | ДружныйКруг',
})
</script>

<template>
  <nuxt-layout>
    <layouts-content>
      <v-row>
        <v-col cols="4">
          <div style="height: 400px; display: flex; flex-direction: column">
            <ui-card style="height: 100%">Avatar</ui-card>
            <button style="height: 48px">Редактировать</button>
          </div>
        </v-col>
        <v-col cols="8">
          <ui-card style="height: 400px">Info User</ui-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card style="box-shadow: none; min-height: 500px">Posts</v-card>
        </v-col>
      </v-row>
    </layouts-content>
  </nuxt-layout>
</template>
