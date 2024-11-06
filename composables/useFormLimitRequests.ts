type TTimeoutRef = null | ReturnType<typeof setTimeout>
type TIntervalRef = null | ReturnType<typeof setInterval>

interface IUseFormLimitRequestsArgs {
  submitCount: Ref<number>
  onResetLimit: () => void
  onSetLimit: () => void
  onTimer: (time: number) => void
}

export const useFormLimitRequests = ({
  submitCount,
  onResetLimit,
  onSetLimit,
  onTimer,
}: IUseFormLimitRequestsArgs) => {
  const DEFAULT_TIME = 60 // стандартное время таймера
  const MAX_SUMBIT_COUNT = 3 // кол-во попыток, после которых сработает таймер

  const timeoutForLimitRequests = useState<TTimeoutRef>(
    'timeoutFormRequests',
    () => null
  )
  const timerForLimitRequests = useState<TIntervalRef>(
    `timerFormRequests`,
    () => null
  )

  // текущее время таймера
  const currentTimeInTimer = useState<number>(
    'currentTimeInTimerFormRequests',
    () => DEFAULT_TIME
  )

  // сохраненное время таймера в куки, если юзер вышел
  const cookieRemainingTime = useCookie<number | null>(
    '__requests_remaining_time',
    {
      default: () => null,
      maxAge: currentTimeInTimer.value,
    }
  )

  // оставшееся/начальное время таймера
  const limitRequests = cookieRemainingTime.value
    ? cookieRemainingTime.value
    : currentTimeInTimer.value

  // если превышен лимит запросов, вернет true
  const isLimitRequests = computed<boolean>(() =>
    cookieRemainingTime.value
      ? !!cookieRemainingTime.value
      : submitCount.value > MAX_SUMBIT_COUNT
  )

  const _destroyTimer = () => {
    if (timerForLimitRequests.value) {
      clearInterval(timerForLimitRequests.value)
    }

    if (timeoutForLimitRequests.value) {
      clearTimeout(timeoutForLimitRequests.value)
    }
  }

  const _destroyState = () => {
    currentTimeInTimer.value = DEFAULT_TIME

    _destroyTimer()

    if (cookieRemainingTime.value) {
      cookieRemainingTime.value = null
    }

    onResetLimit()
  }

  // Функция инициализация таймера
  const initTimer = (isInit: boolean = false) => {
    if (isLimitRequests.value || isInit) {
      onSetLimit()

      timeoutForLimitRequests.value = setTimeout(() => {
        _destroyState()

        timerForLimitRequests.value = null
        timeoutForLimitRequests.value = null
      }, limitRequests * 1000)

      timerForLimitRequests.value = setInterval(() => {
        currentTimeInTimer.value = currentTimeInTimer.value - 1
      }, 1000)
    }
  }

  // Функция для обработки события перед выгрузкой страницы
  const handleBeforeUnload = () => {
    if (timerForLimitRequests.value) {
      cookieRemainingTime.value = currentTimeInTimer.value
    }
  }

  watch(isLimitRequests, initTimer)

  watch(currentTimeInTimer, (timerValue) => {
    if (timerForLimitRequests.value) {
      onTimer(timerValue)
    }
  })

  onMounted(() => {
    onResetLimit()

    if (submitCount.value === 0 && timerForLimitRequests.value) {
      initTimer(true)
    }

    if (cookieRemainingTime.value && !timerForLimitRequests.value) {
      currentTimeInTimer.value = cookieRemainingTime.value
      initTimer()
      cookieRemainingTime.value = null
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
  })

  onBeforeUnmount(() => {
    _destroyTimer()

    window.removeEventListener('beforeunload', handleBeforeUnload)
  })

  return {
    timeoutForLimitRequests,
    timerForLimitRequests,
    currentTimeInTimer,
    isLimitRequests,
    cookieRemainingTime,
  }
}
