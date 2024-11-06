interface IConfig {
  api: string
  token: string
}

interface IParentRegion {
  id: number
  name: string
}

export interface IRegion {
  id: number
  name: string
  latitude: number
  longitude: number
  type: string
  continentCode: string
  countryCode: string
  division1Code: string
  division2Code: string
  division3Code: string
  division4Code: string
  population: string
  timezone: string
  parentRegions: IParentRegion[]
}

export interface IRegionEdge {
  node: IRegion
  cursor: string
}

interface IPageInfo {
  hasNextPage: boolean
  hasPreviosPage: boolean
  startCursor: string
  endCursor: string
}

interface IRegionConnection {
  edges: IRegionEdge[]
  pageInfo: IPageInfo
}

export class ApiLocation {
  // получение списка стран
  public static async getCountries({
    api,
    token,
  }: IConfig): Promise<IRegion[]> {
    return await $fetch(`${api}/countries`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': 'ru',
      },
    })
  }

  // получение списка городов по коду страны
  public static async getCityesByCountryCode(
    config: IConfig,
    countryCode: string
  ): Promise<IRegionConnection> {
    return await $fetch(`${config.api}/regions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Accept-Language': 'ru',
      },
      params: {
        first: 100,
        countryCode: countryCode,
        type: 'city',
      },
    })
  }
}
