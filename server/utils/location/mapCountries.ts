import { type ICountry } from '~/server/api/country/index.get'
import { type IRegion } from '~/server/services/location'

export const mapCountries = (countries: IRegion[]): ICountry[] =>
  [...countries].map((country) => ({
    name: country.name,
    countryCode: country.countryCode,
  }))
