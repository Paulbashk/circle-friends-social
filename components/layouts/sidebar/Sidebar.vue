<template>
  <div>
    <v-list-item
      lines="two"
      prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg">
      <v-list-item-title class="font-weight-medium">
        Павел Бабушкин
      </v-list-item-title>
      <v-list-item-subtitle class="font-italic">Online</v-list-item-subtitle>
    </v-list-item>

    <layouts-sidebar-menu />
  </div>
</template>

<style scoped lang="scss">
.card {
  border: none;
  box-shadow: unset;
}

.nav {
  border: none;
  width: 100%;
}
</style>
