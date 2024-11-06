<script setup lang="ts">
const {
  onSubmit,
  errorForm,
  resetForm,
  isDisabledForm,
  submitCount,
  isSubmittingOrIsAuth,
  isValid,
} = useFormLogin()

const onResetLimit = () => {
  resetForm({ submitCount: 0 })
  errorForm.value = null
  isValid.value = true
}

const onSetLimit = () => {
  isValid.value = false
}

const onTimer = (time: number) => {
  errorForm.value = `Слишком много запросов! Повторить попытку возможно через ${time} секунд`
}

useFormLimitRequests({
  submitCount,
  onResetLimit,
  onSetLimit,
  onTimer,
})
</script>

<template>
  <ui-card-form
    class="mb-10"
    title="Авторизация"
    description="Войти в аккаунт"
    :loading="isSubmittingOrIsAuth"
    @on-submit="onSubmit"
    :error="errorForm">
    <div class="d-flex flex-column ga-5 mb-10">
      <ui-field-text
        type="text"
        name="loginOrEmail"
        label="Введите логин или e-mail"
        placeholder="Логин или e-mail" />
      <ui-field-text
        name="password"
        type="password"
        label="Введите пароль"
        placeholder="Пароль" />
    </div>
    <template #buttons>
      <v-btn
        type="submit"
        size="large"
        variant="tonal"
        color="primary"
        :disabled="isDisabledForm"
        :loading="isSubmittingOrIsAuth">
        Войти
      </v-btn>
      <ui-link href="/register">Нет аккаунта?</ui-link>
    </template>
  </ui-card-form>
</template>
