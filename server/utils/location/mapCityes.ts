import { type IRegionEdge } from '~/server/services/location'

export const mapCityes = (edges: IRegionEdge[]): string[] =>
  [...edges].map((city) => city.node.name)
