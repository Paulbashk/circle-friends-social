// латиница и цифры
export const regExpLatinAndNumber = /^[a-zA-Z0-9]+$/
// латиница и кириллица
export const regExpLatinAndCirilic = /^[a-zA-Zа-яА-ЯёЁ]*$/
// правила для заполнения пароляф
export const regExpPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// пробелы
export const regExpSpace = /^(?!.*\s).+$/
// логин или email
export const regExpLoginOrEmail =
  /^(?:(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(?:[a-zA-Z0-9]+))$/
// дата
export const regExpFormatDate = /^(?:\d{2}\.\d{2}\.\d{4}|)$/
