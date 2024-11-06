import * as yup from 'yup'

export interface ILoginForm {
  loginOrEmail: string
  password: string
}

export const useFormLogin = () => {
  const authStore = useAuthStore()

  const isValid = useState<boolean>('addValidFormLogin', () => true)

  const errorForm = useState<string | null>('errorLogin', () => null)

  const validationSchema = yup.object({
    loginOrEmail: yup
      .string()
      .required('Пожалуйста, укажите ваш логин или e-mail')
      .matches(
        regExpLoginOrEmail,
        'Допускаются только латинские буквы или цифры или e-mail'
      ),
    password: yup
      .string()
      .required('Пожалуйста, укажите ваш пароль')
      .matches(
        regExpPassword,
        'Пароль должен содержать латинские буквы, заглавные, цифры, и спецсимволы'
      )
      .matches(regExpSpace, 'Пароль не может содержать пробелы'),
  })

  const {
    handleSubmit,
    submitCount,
    resetForm,
    isSubmitting,
    meta,
    ...otherPropsUseForm
  } = useForm<ILoginForm>({
    validationSchema,
    initialValues: {
      loginOrEmail: 'Paulbash',
      password: 'ghfkDk!4459',
    },
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

    const { error } = await authStore.login({ ...values })

    if (!error) {
      errorForm.value = null
      resetForm()
      await navigateTo('/profile')
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
