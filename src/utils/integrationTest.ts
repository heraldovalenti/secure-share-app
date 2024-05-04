import { ab2str } from "./adapters";
import {
  generateAESKey,
  encryptMessageWithAES,
  exportAESKey,
  importPublicRsaKey,
  encryptMessageWithRSA,
  importPrivateRsaKey,
  decryptMessageWithRSA,
  importAESKey,
  decryptMessageWithAES,
} from "./crypto";

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAy/gRf/xMjZa6k32Lx4F4
qTUT0lJrFKKimgCI8XC4y/F9PtarRM+pzG4tL4eHFprzqmcN7SsNP0SgiGDF62U8
P4Kx2QKzabQ8XgDFCHCfirKAm6tZ3wCY4p7d72uDG7vg4rvMeZw6ScD/kPnP6vEd
rwJYoUVjOqm97j5ELdEP2hKhPzRMDLtz1tE9b9SoULGK8p3E2WLzwk1ukABH6frg
wA09B++3J06OIKjER7NdHS1B85Selea3Fy57/kK0M0HhnbHR5P6Z3166zFuRgeY6
nBktmFoA25FMKekOB+z/P9cDdDffufajZAMqxthw5JNma3mNMtLGBMP9CtXJi3Gm
tDFoLcf9Gdktn0aRcBhKHQuG/kIGN9w6Bi/fhsBR5YEORxMi8hLqPkL6zMgxrA+5
oZ3go6tuW6vmy4Eqrk4B2y/jtgBrfZzkONrlMpcsXq7wf2MPY51VjeK3V3orLdzC
HiE1kka2W2uInN0/BieUNXwlorDu1RFIYT8DCi9NNQrYpy9A/HDlB1HbrMeggyrz
UYbKjOr9T3y/4ebhTqgLr0boUezEOlUPtMLXqvgzmnjtK71zq+hUEGA4GMzZhID4
ub+r55wQbKh/422o9fFKQyiL3KdH0r7425k2iegsed9VLi/ec9Y6csp/kbbKJrf8
DfbOQ7zFDvIi2wzlBJfSimcCAwEAAQ==
-----END PUBLIC KEY-----`;
const pkPem = `-----BEGIN PRIVATE KEY-----
  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
  GzB41ccHfWrAyec/CrxJYUMDGoOyjw==
  -----END PRIVATE KEY-----`;
export const test = async (message: string) => {
  // client side
  console.log("AES key generation");
  const { key, iv } = await generateAESKey();
  console.log("encrypt data with AES key");
  const cipherText = await encryptMessageWithAES({ key, iv }, message);
  console.log("export AES key");
  const aesKey = await exportAESKey(key);
  console.log("import RSA key");
  const publicKey = await importPublicRsaKey(publicKeyPem);
  console.log("encrypt AES key with RSA");
  const encryptedAesKey = await encryptMessageWithRSA(
    publicKey,
    ab2str(aesKey)
  );
  console.log("encrypt AES IV with RSA");
  const encryptedAesIV = await encryptMessageWithRSA(publicKey, ab2str(iv));
  const payload = {
    cipherText: btoa(ab2str(cipherText)),
    aesKey: btoa(ab2str(encryptedAesKey)),
    aesIV: btoa(ab2str(encryptedAesIV)),
  };
  console.log("payload to transmit", payload);

  // server side
  const result = await decryptServerSide(payload);
  console.log("match ?? ", message === result);
};

const decryptServerSide = async (payload: {
  cipherText: string;
  aesKey: string;
  aesIV: string;
}) => {
  console.log("import PK");
  const pk = await importPrivateRsaKey(pkPem);
  console.log("decrypt AES IV with PK");
  const ivAB = await decryptMessageWithRSA(pk, atob(payload.aesIV));
  const iv = new Uint8Array(ivAB);
  console.log("decrypt AES key with PK");
  const aesKey = await decryptMessageWithRSA(pk, atob(payload.aesKey));
  console.log("import AES key");
  const key = await importAESKey(aesKey);
  console.log("decrypting with AES key");
  const result = await decryptMessageWithAES(
    { iv, key },
    atob(payload.cipherText)
  );
  return ab2str(result);
};
