import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Compressor from "compressorjs";
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

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.4rem;
  align-items: center;

  i {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem;
    margin-top: 2rem;
  }
`;

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | Blob>>;
  previewURL: string;
  setPreviewURL: React.Dispatch<React.SetStateAction<string>>;
}

const MyDropzone: React.FC<Props> = ({
  setFile,
  previewURL,
  setPreviewURL,
}) => {
  const [alert, setAlert] = useState({ msg: "", type: "" });

  const onDrop = useCallback(async (acceptedFiles) => {
    const [file] = acceptedFiles;
    if (!isFileImage(file)) {
      return setAlert({ msg: "Niepoprawny format pliku", type: "danger" });
    } else if (alert.msg) {
      setAlert({ msg: "", type: "" });
    }

    try {
      new Compressor(file, {
        maxWidth: 800,
        quality: 0.5,
        success(result) {
          setPreviewURL(URL.createObjectURL(result));
          setFile(result);
        },
      });
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
        <IconWrapper>
          <p>Przeciągnij zdjęcie, lub kliknij tutaj</p>
          <i className="fas fa-upload"></i>
        </IconWrapper>
      )}
    </StyledWrapper>
  );
};

export default MyDropzone;
