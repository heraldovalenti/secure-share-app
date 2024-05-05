import axios from "axios";
import { useCallback, useState } from "react";
import { uploadFileApiUrl } from "../utils/constants";
import { FileContent } from "../dto";

export const useSendFile = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const sendFile = useCallback(
    async (file: FileContent) => {
      if (loading || sent || !!error) return;
      setLoading(true);
      try {
        console.log("sending file...", uploadFileApiUrl);
        const result = await axios.post(uploadFileApiUrl, {
          file,
        });
        setSent(true);
        console.log("file sent", result.data);
      } catch (e) {
        setError(e);
        console.warn("error sending file", e);
      }
      setLoading(false);
    },
    [error, loading, sent]
  );

  return {
    sendFile,
    loading,
    error,
    sent,
  };
};
