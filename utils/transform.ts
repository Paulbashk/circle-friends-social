export const transformDateStringToDateForYup = (
  date: Date,
  dateString: string
) => {
  if (typeof dateString === 'string') {
    if (!dateString.length) {
      return undefined
    }

    const dateArray = dateString.split('.')
    let formatDate = '%mm%.%dd%.%YYYY%'

    formatDate = formatDate.replace('%mm%', dateArray[1])
    formatDate = formatDate.replace('%dd%', dateArray[0])
    formatDate = formatDate.replace('%YYYY%', dateArray[2])

    return new Date(formatDate)
  }

  return date
}
