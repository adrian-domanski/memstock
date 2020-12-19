import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
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

  .img-preview {
    width: 100%;
    display: block;
  }

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
  setAlert: React.Dispatch<
    React.SetStateAction<{
      msg: string;
      type: string;
    }>
  >;
}

const MyDropzone: React.FC<Props> = ({
  setFile,
  previewURL,
  setPreviewURL,
  setAlert,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    const [file] = acceptedFiles;
    if (!isFileImage(file)) {
      return setAlert({ msg: "Niepoprawny format pliku", type: "danger" });
    } else if (file.size / 1024 / 1024 > 2) {
      return setAlert({
        msg: "Rozmiar pliku nie może przekraczać 2MB",
        type: "danger",
      });
    }

    setPreviewURL(URL.createObjectURL(file));
    setFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <StyledWrapper
      className="image-wrapper"
      hasImage={!!previewURL}
      {...getRootProps()}
    >
      <input {...getInputProps({ multiple: false })} />
      {isDragActive ? (
        <p>No puszczaj, postaram się złapać!</p>
      ) : previewURL ? (
        <img
          src={previewURL}
          alt="Podgląd wysyłanego zdjęcia"
          className="img-preview"
        />
      ) : (
        <IconWrapper>
          <p className="has-text-centered-mobile">
            Przeciągnij zdjęcie, lub kliknij tutaj
          </p>
          <i className="fas fa-upload" aria-hidden="true"></i>
        </IconWrapper>
      )}
    </StyledWrapper>
  );
};

export default MyDropzone;
