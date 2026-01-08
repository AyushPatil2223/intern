import CryptoJS from "crypto-js";

const SECRET_KEY = "aaUIpGnapISrKsHL"; // 16 characters
const IV = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16 characters

export const encryptPassword = (password: string) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};