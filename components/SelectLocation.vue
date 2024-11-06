<script setup lang="ts">
import type { ICountry } from '~/server/api/country/index.get'

interface IProps {
  nameFieldCountry: string
  nameFieldCity: string
}

const props = defineProps<IProps>()

const { value: country } = useField<ICountry | null>(
  () => props.nameFieldCountry,
  undefined,
  {
    initialValue: {
      name: '',
      countryCode: '',
    },
  }
)
const { value: city } = useField<string>(() => props.nameFieldCity, undefined, {
  initialValue: '',
})

const { data: countries, status: countriesStatus } = await useAsyncData(
  'countries',
  () =>
    $fetch('/api/country', {
      method: 'GET',
    }),
  {
    default: () => [],
  }
)

const {
  data: cityes,
  status: cityesStatus,
  execute: cityesExecute,
} = await useAsyncData(
  'cityes',
  () =>
    $fetch('/api/city', {
      method: 'GET',
      params: {
        countryCode: country.value && country.value.countryCode,
      },
    }),
  {
    immediate: false,
    default: () => [],
  }
)

const isSelectedCountry = computed<boolean>(
  () => !!country.value && !!country.value.name.length
)

const countriesLoading = computed<boolean>(
  () => countriesStatus.value === 'pending'
)

const cityesLoading = computed<boolean>(() => cityesStatus.value === 'pending')

watchEffect(async () => {
  if (isSelectedCountry.value) {
    cityesExecute()
  }
})
</script>

<template>
  <div class="d-flex flex-column ga-3">
    <v-autocomplete
      hide-details="auto"
      :items="countries"
      item-title="name"
      item-value="{ name, countryCode }"
      label="Страна"
      placeholder="Напишите название страны"
      variant="outlined"
      v-model="country"
      :name="nameFieldCountry"
      density="comfortable"
      :loading="countriesLoading"
      :disabled="countriesLoading"
      return-object />
    <v-autocomplete
      hide-details="auto"
      :hints="
        isSelectedCountry
          ? 'Напишите название города'
          : 'Выберите сначла страну'
      "
      :items="cityes"
      label="Город"
      placeholder="Напишите название города"
      variant="outlined"
      v-model="city"
      :name="nameFieldCity"
      density="comfortable"
      :disabled="!isSelectedCountry || cityesLoading"
      :loading="cityesLoading"
      persistent-hint />
  </div>
</template>
