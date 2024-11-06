<script setup lang="ts">
import { Genders } from '~/server/db'
import { vMaska } from 'maska/vue'

const {
  errorForm,
  dateInputMaskOptions,
  isDisabledForm,
  onSubmit,
  isSubmittingOrIsRoleUser,
} = useFormRegisterNext()
</script>

<template>
  <ui-card-form
    class="mb-10"
    title="Продолжите регистрацию"
    description="Ваш аккаунт почти готов"
    @on-submit="onSubmit"
    :loading="isSubmittingOrIsRoleUser"
    :error="errorForm">
    <div class="d-flex flex-column ga-5 mb-10">
      <ui-field-text name="firstname" label="Ваше имя" placeholder="Ваше имя" />
      <ui-field-text
        name="lastname"
        label="Ваша фамилия"
        placeholder="Ваша фамилия" />
      <ui-field-text
        name="surname"
        label="Ваше отчество"
        placeholder="Ваше отчество" />
      <div class="field-columns mb-7">
        <ui-select
          name="gender"
          label="Ваш пол"
          item-title="title"
          item-value="value"
          :items="genders"
          :initialValue="Genders.NOT_SELECTED" />
        <ui-field-text
          name="dateOfBrith"
          label="Дата рождения"
          placeholder="Дата рождения"
          v-maska="dateInputMaskOptions" />
      </div>
      <select-location nameFieldCountry="country" nameFieldCity="city" />
    </div>
    <template #buttons>
      <v-btn
        type="submit"
        size="large"
        variant="tonal"
        color="primary"
        :disabled="isDisabledForm"
        :loading="isSubmittingOrIsRoleUser">
        Завершить регистрацию
      </v-btn>
    </template>
  </ui-card-form>
</template>

<style scoped lang="scss">
.field-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  align-items: flex-start;
}
</style>
