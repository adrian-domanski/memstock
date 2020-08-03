import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { isFileImage } from "../utils/helpers";

export const StyledWrapper: React.FC<{ hasImage: boolean }> = styled.div`
  border: ${({ hasImage }: { hasImage: boolean }) =>
    hasImage ? "none" : "2px dashed #ad8108"};
  padding: ${({ hasImage }: { hasImage: boolean }) =>
    hasImage ? "0" : "2rem"};
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: color 0.1s ease-in-out;

  :hover {
    color: ${({ theme }) => theme.colors.primaryDarker};
  }
`;

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | Blob>>;
}

const MyDropzone: React.FC<Props> = ({ setFile }) => {
  const [previewURL, setPreviewURL] = useState("");
  const [alert, setAlert] = useState({ msg: "", type: "" });

  const onDrop = useCallback(async (acceptedFiles) => {
    const [file] = acceptedFiles;
    if (!isFileImage(file)) {
      return setAlert({ msg: "Niepoprawny format pliku", type: "danger" });
    } else if (alert.msg) {
      setAlert({ msg: "", type: "" });
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.001,
        useWebWorker: true,
      });
      setPreviewURL(URL.createObjectURL(compressedFile));
      setFile(compressedFile);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <StyledWrapper hasImage={!!previewURL} {...getRootProps()}>
      <input {...getInputProps({ multiple: false })} />
      {isDragActive ? (
        <p>No puszczaj, postaram się złapać!</p>
      ) : previewURL ? (
        <img src={previewURL} alt="Podgląd zdjęcia" />
      ) : (
        <p>Przeciągnij plik lub kliknij tutaj, aby go wybrać</p>
      )}
    </StyledWrapper>
  );
};

export default MyDropzone;
