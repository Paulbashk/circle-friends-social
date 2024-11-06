import * as yup from 'yup'

export interface IRegisterForm {
  login: string
  email: string
  password: string
  repassword: string
}

export const useFormRegister = () => {
  const authStore = useAuthStore()

  const isValid = useState<boolean>('addValidFormRegister', () => true)

  const errorForm = useState<string | null>('errorRegister', () => null)

  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .required('Пожалуйста, придумайте логин')
      .matches(
        regExpLatinAndNumber,
        'Допускаются только латинские буквы или цифры'
      )
      .min(4, 'Логин должен быть не менее 4-х символов')
      .max(32, 'Логин должен быть не более 32-х символов'),
    email: yup
      .string()
      .required('Пожалуйста, укажите ваш e-mail')
      .email('Указан не корректный e-mail'),
    password: yup
      .string()
      .required('Пожалуйста, придумайте пароль')
      .matches(
        regExpPassword,
        'Пароль должен содержать латинские буквы, заглавные, цифры, и спецсимволы'
      )
      .matches(regExpSpace, 'Пароль не может содержать пробелы')
      .min(8, 'Пароль должен быть не менее 8-и символов')
      .max(32, 'Пароль должен быть не более 32-х символов'),
    repassword: yup
      .string()
      .required('Пожалуйста, укажите пароль повторно')
      .oneOf([yup.ref('password')], 'Пароль не совпадает'),
  })

  const {
    defineField,
    handleSubmit,
    isSubmitting,
    meta,
    submitCount,
    resetForm,
    ...otherPropsUseForm
  } = useForm<IRegisterForm>({
    validationSchema,
  })

  const isAuth = computed<boolean>(() => authStore.isAuth)

  const isDisabledForm = computed<boolean>(
    () =>
      isSubmitting.value ||
      (!meta.value.valid && submitCount.value > 0) ||
      !isValid.value
  )

  const isSubmittingOrIsAuth = computed<boolean>(
    () => isSubmitting.value || isAuth.value
  )

  const onSubmit = handleSubmit(async (values) => {
    if (!isValid.value || isAuth.value) {
      return false
    }

    const { error } = await authStore.register({
      login: values.login,
      email: values.email,
      password: values.password,
    })

    if (!error) {
      resetForm()
      await navigateTo('/register/next')
    } else {
      errorForm.value = error.message
    }
  })

  return {
    isAuth,
    isSubmittingOrIsAuth,
    onSubmit,
    resetForm,
    submitCount,
    isSubmitting,
    meta,
    errorForm,
    isValid,
    isDisabledForm,
    ...otherPropsUseForm,
  }
}
