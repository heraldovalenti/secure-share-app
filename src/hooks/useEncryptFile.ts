import { useCallback, useState } from "react";
import { ab2str } from "../utils/adapters";
import {
  generateAESKey,
  encryptMessageWithAES,
  exportAESKey,
  importPublicRsaKey,
  encryptMessageWithRSA,
} from "../utils/crypto";
import { publicKeyPem } from "../utils/constants";
import { FileContent } from "../dto";

export const useEncryptFile = () => {
  const [loading, setLoading] = useState(false);
  const encryptFile = useCallback(
    async (content: string) => {
      if (loading) return;
      setLoading(true);
      console.log("AES key generation");
      const { key, iv } = await generateAESKey();
      console.log("encrypt data with AES key");
      const cipherText = await encryptMessageWithAES({ key, iv }, content);
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
      const payload: FileContent = {
        cipherText: btoa(ab2str(cipherText)),
        key: btoa(ab2str(encryptedAesKey)),
        iv: btoa(ab2str(encryptedAesIV)),
      };
      console.log("payload to transmit", payload);
      setLoading(false);
      return payload;
    },
    [loading]
  );
  return {
    encryptFile,
    loading,
  };
};
