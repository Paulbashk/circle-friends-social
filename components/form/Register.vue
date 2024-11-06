<script setup lang="ts">
const {
  onSubmit,
  errorForm,
  isDisabledForm,
  isSubmittingOrIsAuth,
  resetForm,
  isValid,
  submitCount,
} = useFormRegister()

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
    title="Регистрация"
    description="Создайте аккаунт в социальной сети"
    :loading="isSubmittingOrIsAuth"
    @on-submit="onSubmit"
    :error="errorForm">
    <div class="d-flex flex-column ga-5 mb-10">
      <ui-field-text
        name="login"
        label="Придумайте логин"
        placeholder="Логин" />
      <ui-field-text
        name="email"
        type="email"
        label="Ваш e-mail"
        placeholder="E-mail" />
      <ui-field-text
        name="password"
        type="password"
        label="Придумайте пароль"
        placeholder="Пароль" />
      <ui-field-text
        name="repassword"
        type="password"
        label="Повторите пароль" />
    </div>
    <template #buttons>
      <v-btn
        type="submit"
        size="large"
        variant="tonal"
        color="primary"
        :disabled="isDisabledForm"
        :loading="isSubmittingOrIsAuth">
        Создать аккаунт
      </v-btn>
      <ui-link href="/">Уже есть аккаунт?</ui-link>
    </template>
  </ui-card-form>
</template>
