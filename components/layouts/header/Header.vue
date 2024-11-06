<script setup lang="ts">
const authStore = useAuthStore()

const router = useRouter()

const logout = async () => {
  await authStore.logout()

  router.push('/')
}
</script>

<template>
  <v-toolbar color="surface">
    <v-container>
      <v-row no-gutters>
        <v-col cols="2" class="pt-0 pb-0 d-flex">
          <nuxt-link :to="authStore.isAuth ? '/profile' : '/'" class="logo">
            <v-icon icon="mdi-account-multiple"></v-icon>
            <span>ДружныйКруг</span>
          </nuxt-link>
        </v-col>
        <v-col
          cols="4"
          class="pt-0 pb-0 d-flex flex-column justify-center ml-auto">
          <v-list
            class="header-menu"
            density="compact"
            variant="text"
            bg-color="transparent"
            v-if="authStore.isAuth">
            <v-list-item
              class="text-body-1 text-primary-darken-1 font-weight-bold"
              color="transparent">
              <v-hover v-slot:default="{ isHovering, props }">
                <span
                  v-bind="props"
                  @click.prevent="logout"
                  :class="[
                    'transition-opacity',
                    'cursor-pointer',
                    { 'opacity-70': isHovering },
                  ]">
                  Выход
                </span>
              </v-hover>
            </v-list-item>
          </v-list>
          <v-list class="header-menu" density="compact" variant="text" v-else>
            <v-list-item class="text-body-1 cursor-pointer font-weight-bold">
              <v-hover v-slot:default="{ isHovering, props }">
                <nuxt-link
                  v-bind="props"
                  to="/register"
                  :class="[
                    'text-primary-darken-1 text-decoration-none transition-opacity',
                    { 'opacity-70': isHovering },
                  ]">
                  Создать аккаунт
                </nuxt-link>
              </v-hover>
            </v-list-item>
            <v-list-item class="text-body-1 cursor-pointer font-weight-bold">
              <v-hover v-slot:default="{ isHovering, props }">
                <nuxt-link
                  v-bind="props"
                  to="/"
                  :class="[
                    'text-primary-darken-1 text-decoration-none transition-opacity',
                    { 'opacity-70': isHovering },
                  ]">
                  Войти
                </nuxt-link>
              </v-hover>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgb(var(--v-theme-primary));
  column-gap: 8px;

  span {
    font-size: 16px;
    font-weight: 700;
  }

  .v-icon {
    font-size: 48px;
  }
}

.header-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  column-gap: 16px;
}
</style>
