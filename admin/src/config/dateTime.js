import moment from 'moment'

export const resetDateTime = (date) => {
  return moment(date).format('DD MM YYYY, h:mm:ss a')
}
