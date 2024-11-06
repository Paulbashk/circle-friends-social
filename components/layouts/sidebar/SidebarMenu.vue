<template>
  <v-list
    density="compact"
    nav
    base-color="primary-darken-1"
    bg-color="background"
    tag="ul">
    <v-list-item
      :value="item.title"
      class="text-h6"
      v-for="item in menuList"
      :key="item.title"
      tag="li">
      <div class="d-flex align-center ga-4">
        <v-icon :icon="item.icon"></v-icon>
        <v-list-item-title>
          <nuxt-link
            :to="item.href"
            class="text-decoration-none text-primary-darken-1 text-body-2">
            {{ item.title }}
          </nuxt-link>
        </v-list-item-title>
      </div>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { menuList } from './menu.config'
</script>
