import { str2ab } from "../utils/adapters";

const name = "AES-CBC";
export const generateAESKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    { name, length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  return { key, iv };
};
export const exportAESKey = async (key: CryptoKey) => {
  const raw = await window.crypto.subtle.exportKey("raw", key);
  return raw;
};
export const importAESKey = async (raw: ArrayBuffer) => {
  const key = await window.crypto.subtle.importKey(
    "raw",
    raw,
    {
      name: "AES-CBC",
    },
    true,
    ["encrypt", "decrypt"]
  );

  return key;
};
export const importPublicRsaKey = async (pem: string) => {
  // fetch the part of the PEM string between header and footer
  // there is no need to remove the \n chars, works either way
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length - 1
  );
  // base64 decode the string to get the binary data
  const binaryDerString = atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  const key = await window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
  return key;
};
export const importPrivateRsaKey = async (pem: string) => {
  // fetch the part of the PEM string between header and footer
  // there is no need to remove the \n chars, works either way
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length - 1
  );
  // base64 decode the string to get the binary data
  const binaryDerString = atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  const key = await window.crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
  return key;
};
export const encryptMessageWithRSA = async (
  publicKey: CryptoKey,
  message: string
) => {
  const cipherText = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    str2ab(message)
  );
  return cipherText;
};
export const decryptMessageWithRSA = async (
  key: CryptoKey,
  message: string
) => {
  const cipherText = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    key,
    str2ab(message)
  );
  return cipherText;
};
export const encryptMessageWithAES = async (
  { key, iv }: { iv: Uint8Array; key: CryptoKey },
  message: string
) => {
  const cipherText = await window.crypto.subtle.encrypt(
    { name, iv },
    key,
    str2ab(message)
  );
  return cipherText;
};
export const decryptMessageWithAES = async (
  { iv, key }: { iv: Uint8Array; key: CryptoKey },
  message: string
) => {
  const plainText = await window.crypto.subtle.decrypt(
    { name, iv },
    key,
    str2ab(message)
  );
  return plainText;
};
