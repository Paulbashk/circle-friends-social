import { Genders } from '~/server/db'

export const genders = [
  {
    title: 'Мужской',
    value: Genders.MALE,
  },
  {
    title: 'Женский',
    value: Genders.FEMALE,
  },
  {
    title: 'Не выбран',
    value: Genders.NOT_SELECTED,
  },
]
