import CryptoJS from "crypto-js";

export const passphrase = "KochamStudiowac123!";

export function encode(text: string, passphrase: string) {
  const encryptedUid = CryptoJS.AES.encrypt(text, passphrase).toString();
  const encodedUid = encodeURIComponent(encryptedUid)
  return encodedUid
}

export function decode(text: string, passphrase: string) {
  const decodedText = decodeURIComponent(text)
  const bytes = CryptoJS.AES.decrypt(decodedText, passphrase);
  const decryptedUid = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedUid;
}
