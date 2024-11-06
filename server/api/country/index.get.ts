import { ApiLocation } from '~/server/services/location'
import { mapCountries } from '~/server/utils/location/mapCountries'

export interface ICountry {
  name: string
  countryCode: string
}

export default defineEventHandler(
  async (event) =>
    await jwtMiddleware(event, { only: 'user' }, async () => {
      const config = useRuntimeConfig(event)

      const configKeys = {
        api: config.mapApiUrl,
        token: config.tokenMapSecret,
      }

      const fetchCountries = await ApiLocation.getCountries(configKeys)

      if (fetchCountries.length <= 0) {
        throw createError({
          status: 500,
          message: 'Произошла ошибка при загрузке стран',
        })
      }

      const countries = mapCountries(fetchCountries)

      const bannedCountriesInRussia = [...countries].filter(
        (country) => country.countryCode !== 'UA'
      )

      return bannedCountriesInRussia
    })
)
