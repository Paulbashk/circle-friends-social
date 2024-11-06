import { ApiLocation } from '~/server/services/location'
import { mapCityes } from '~/server/utils/location/mapCityes'

interface IQueryCity {
  countryCode: string
}

export default defineEventHandler(
  async (event) =>
    await jwtMiddleware(event, { only: 'user' }, async () => {
      const query: IQueryCity = await getQuery(event)

      const config = useRuntimeConfig(event)

      const configKeys = {
        api: config.mapApiUrl,
        token: config.tokenMapSecret,
      }

      const cityes = await ApiLocation.getCityesByCountryCode(
        configKeys,
        query.countryCode
      )

      if (cityes.edges.length <= 0) {
        throw createError({
          status: 500,
          message: 'Произошла ошибка при загрузке городов',
        })
      }

      const mapNameCityes = mapCityes(cityes.edges)

      return mapNameCityes
    })
)
