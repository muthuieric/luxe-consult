

"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

const UploadExample = () => {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      return data; // contains {signature, expire, token, publicKey, urlEndpoint}
    } catch (err) {
      console.error("Authentication error:", err);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) {
      alert("Please select a file to upload");
      return;
    }
    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch {
      return;
    }

    try {
      const uploadResponse = await upload({
        file,
        fileName: file.name,
        expire: authParams.expire,
        token: authParams.token,
        signature: authParams.signature,
        publicKey: authParams.publicKey,
        urlEndpoint: authParams.urlEndpoint,
        onProgress: (event) => {
          const percent = (event.loaded / event.total) * 100;
          console.log(`Upload progress: ${percent.toFixed(2)}% (${event.loaded}/${event.total} bytes)`);
          setProgress(percent);
        },
        abortSignal: abortController.signal,
      });
      console.log("Upload successful:", uploadResponse);
    } catch (error) {
      if (error instanceof ImageKitAbortError) console.error("Upload aborted:", error.reason);
      else if (error instanceof ImageKitInvalidRequestError) console.error("Invalid request:", error.message);
      else if (error instanceof ImageKitUploadNetworkError) console.error("Network error:", error.message);
      else if (error instanceof ImageKitServerError) console.error("Server error:", error.message);
      else console.error("Unknown upload error:", error);
    }
  };

  return (
    <>
      <input type="file" ref={fileInputRef} />
      <button type="button" onClick={handleUpload}>Upload file</button>
      <br />
      Upload progress: <progress value={progress} max={100}></progress>
    </>
  );
};

export default UploadExample;




// "use client";

// import {
//   ImageKitAbortError,
//   ImageKitInvalidRequestError,
//   ImageKitServerError,
//   ImageKitUploadNetworkError,
//   upload,
// } from "@imagekit/next";
// import { useRef, useState } from "react";

// const UploadExample = () => {
//   const [progress, setProgress] = useState(0);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const abortController = new AbortController();

//   const authenticator = async () => {
//     try {
//       const response = await fetch("/api/upload-auth");
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Request failed with status ${response.status}: ${errorText}`);
//       }
//       const data = await response.json();
//       return data; // contains {signature, expire, token, publicKey, urlEndpoint}
//     } catch (err) {
//       console.error("Authentication error:", err);
//       throw new Error("Authentication request failed");
//     }
//   };

//   const handleUpload = async () => {
//     const fileInput = fileInputRef.current;
//     if (!fileInput?.files?.length) {
//       alert("Please select a file to upload");
//       return;
//     }
//     const file = fileInput.files[0];

//     let authParams;
//     try {
//       authParams = await authenticator();
//     } catch {
//       return;
//     }

//     try {
//       const uploadResponse = await upload({
//         file,
//         fileName: file.name,
//         expire: authParams.expire,
//         token: authParams.token,
//         signature: authParams.signature,
//         publicKey: authParams.publicKey,
//         urlEndpoint: authParams.urlEndpoint,
//         onProgress: (event) => {
//           const percent = (event.loaded / event.total) * 100;
//           console.log(`Upload progress: ${percent.toFixed(2)}% (${event.loaded}/${event.total} bytes)`);
//           setProgress(percent);
//         },
//         abortSignal: abortController.signal,
//       });
//       console.log("Upload successful:", uploadResponse);
//     } catch (error) {
//       if (error instanceof ImageKitAbortError) console.error("Upload aborted:", error.reason);
//       else if (error instanceof ImageKitInvalidRequestError) console.error("Invalid request:", error.message);
//       else if (error instanceof ImageKitUploadNetworkError) console.error("Network error:", error.message);
//       else if (error instanceof ImageKitServerError) console.error("Server error:", error.message);
//       else console.error("Unknown upload error:", error);
//     }
//   };

//   return (
//     <>
//       <input type="file" ref={fileInputRef} />
//       <button type="button" onClick={handleUpload}>Upload file</button>
//       <br />
//       Upload progress: <progress value={progress} max={100}></progress>
//     </>
//   );
// };

// export default UploadExample;
