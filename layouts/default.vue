<template>
  <v-locale-provider locale="ru">
    <v-responsive>
      <v-app theme="myCustomTheme">
        <layouts-header />
        <v-main class="pt-5 pb-5">
          <slot></slot>
        </v-main>
      </v-app>
    </v-responsive>
  </v-locale-provider>
</template>
