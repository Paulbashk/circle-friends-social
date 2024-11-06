import { H3Error } from 'h3'
import type { IUserUpdate } from '~/server/api/user/index.patch'
import type { IUserLogin } from '~/server/api/user/index.post'
import type { IUserCreate } from '~/server/api/user/register.post'
import { Roles, type IUserWithoutPassword } from '~/server/db'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUserWithoutPassword | null>(null)

  const userRole = computed<Roles | null>(() => user.value && user.value.role)

  const isAdmin = computed<boolean>(() =>
    userRole.value ? userRole.value.includes(Roles.ADMIN) : false
  )
  const isRegUser = computed<boolean>(() =>
    userRole.value ? userRole.value.includes(Roles.REGUSER) : false
  )

  const isUser = computed<boolean>(() =>
    userRole.value
      ? userRole.value.includes(Roles.USER) && userRole.value.length === 4
      : false
  )

  const isAuth = computed<boolean>(() => user.value !== null)

  const setUser = (_user: IUserWithoutPassword | null) => {
    user.value = _user
  }

  const login = async (_user: IUserLogin) => {
    try {
      const data = await $fetch('/api/user', {
        method: 'POST',
        body: _user,
      })

      setUser(data.user)

      return { error: null, user: data.user }
    } catch (error: unknown) {
      return {
        error: {
          message: (error as unknown as H3Error<any>).data.message,
        },
        user: null,
      }
    }
  }

  const register = async (_user: IUserCreate) => {
    try {
      const data = await $fetch('/api/user/register', {
        method: 'POST',
        body: _user,
      })

      setUser(data.user)

      return { error: null }
    } catch (error: unknown) {
      return {
        error: {
          message: (error as unknown as H3Error<any>).data.message,
        },
      }
    }
  }

  const userLoggedIn = async () => {
    if (!user.value) {
      const data = await $fetch('/api/user/refresh', {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
      })

      setUser(data.user)
    }
  }

  const logout = async () => {
    try {
      const data = await $fetch('/api/user/logout', {
        method: 'GET',
      })

      setUser(data.user)
    } catch (error: unknown) {
      console.error((error as unknown as H3Error<any>).data.message)
    }
  }

  const updateUser = async (data: IUserUpdate) => {
    try {
      const dataFetch = await $fetch('/api/user', {
        method: 'PATCH',
        body: {
          ...data,
        },
      })

      setUser(dataFetch.user)

      return { error: null, user: dataFetch.user }
    } catch (error: unknown) {
      return {
        error: {
          message: (error as unknown as H3Error<any>).data.message,
        },
        user: null,
      }
    }
  }

  return {
    user,
    isAuth,
    isUser,
    isAdmin,
    isRegUser,
    register,
    login,
    userLoggedIn,
    logout,
    updateUser,
  }
})
