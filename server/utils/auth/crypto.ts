import CryptoJS from 'crypto-js'

function encrypt(obj: object, secretKey: string): string {
  const jsonString = JSON.stringify(obj) // Преобразуем объект в строку JSON
  return CryptoJS.AES.encrypt(jsonString, secretKey).toString() // Шифруем
}

function decrypt(encryptedText: string, secretKey: string): object {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey) // Дешифруем
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8) // Преобразуем в строку
  return JSON.parse(decryptedData) // Преобразуем обратно в объект
}

export { encrypt, decrypt }
