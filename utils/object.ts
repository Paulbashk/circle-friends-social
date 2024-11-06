export const omitUndefined = (obj: object) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  )

export const omitDeep = <TObject extends { [key: string]: any }>(
  obj: TObject
) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      omitDeep(obj[key])
    } else if (obj[key] === undefined) {
      delete obj[key]
    }
  })
  return obj
}
