import * as yup from 'yup'
import { Genders, Roles } from '~/server/db'
import type { MaskInputOptions } from 'maska'
import type { ICountry } from '~/server/api/country/index.get'

interface IRegisterNextForm {
  lastname: string
  firstname: string
  surname: string
  gender: Genders
  dateOfBrith: string
  country: ICountry
  city: string
}

export const useFormRegisterNext = () => {
  const authStore = useAuthStore()

  const errorForm = useState<string | null>('errorRegisterNext', () => null)

  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .required('Пожалуйста, укажите ваше имя')
      .matches(regExpLatinAndCirilic, 'Допускаются только буквы'),
    lastname: yup
      .string()
      .required('Пожалуйста, укажите вашу фамилию')
      .matches(regExpLatinAndCirilic, 'Допускаются только буквы'),
    surname: yup
      .string()
      .matches(regExpLatinAndCirilic, 'Допускаются только буквы'),
    gender: yup.string(),
    dateOfBrith: yup
      .date()
      .nullable()
      .notRequired()
      .typeError('Неверный формат даты')
      .transform(transformDateStringToDateForYup)
      .min(new Date(1900, 0, 1), 'Указать можно не менее 1900 года')
      .max(new Date(), 'Текущая дата ещё не настала'),
  })

  const dateInputMaskOptions = reactive<MaskInputOptions>({
    mask: '##.##.####',
    eager: true,
  })

  const {
    handleSubmit,
    isSubmitting,
    meta,
    submitCount,
    resetForm,
    ...otherPropsUseForm
  } = useForm<IRegisterNextForm>({
    validationSchema,
  })

  const isRoleUser = computed<boolean>(() => authStore.isUser)

  const isDisabledForm = computed<boolean>(
    () => isSubmitting.value || (!meta.value.valid && submitCount.value > 0)
  )

  const isSubmittingOrIsRoleUser = computed<boolean>(
    () => isSubmitting.value || isRoleUser.value
  )

  const onSubmit = handleSubmit(async (values) => {
    if (isRoleUser.value) {
      return false
    }

    const fullName = `${values.firstname} ${values.lastname} ${!!values.surname ? values.surname : ''}`

    const countryName =
      values.country && !!values.country.name.length
        ? values.country.name
        : undefined

    if (!authStore.user) {
      errorForm.value = 'Пользователь не авторизован'
      return false
    }

    const dataUpdated = {
      id: authStore.user.id,
      fullName: fullName.trim(),
      dateOfBrith: !!values.dateOfBrith ? values.dateOfBrith : undefined,
      gender: values.gender,
      country: countryName,
      city: values.city && !!values.city.length ? values.city : undefined,
      role: Roles.USER,
      updatedAt: new Date().toISOString(),
    }

    const { error } = await authStore.updateUser(omitDeep(dataUpdated))

    if (!error) {
      errorForm.value = null
      resetForm()
      await navigateTo('/profile')
    } else {
      errorForm.value = error.message
    }
  })

  return {
    isRoleUser,
    isSubmittingOrIsRoleUser,
    errorForm,
    dateInputMaskOptions,
    isSubmitting,
    isDisabledForm,
    onSubmit,
    ...otherPropsUseForm,
  }
}
