import { useMutation } from "@apollo/react-hooks";
import Compressor from "compressorjs";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import { uploadFileMutation } from "../../queries/memQueries";
import { updateUserMutation } from "../../queries/userQueries";
import { isFileImage } from "../../utils/helpers";
import { Button } from "../../utils/styled/components/components";
import {
  StyledFileInput,
  StyledModal,
  StyledNoScroll,
} from "../../utils/styled/components/Modal";
import Alert from "../Alert";

const StyledAvatar = styled.figure`
  img {
    display: block;
    height: 128px;
    width: 128px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin: 0 auto;
    object-position: center;
  }
`;

interface Props {
  actionClose: () => void;
  isOpen: boolean;
}

const ChangeUserAvatar: React.FC<Props> = ({ actionClose, isOpen }) => {
  const {
    ctx: { user },
    dispatch: authDispatch,
  } = useContext(AuthContext);

  const [uploadFile] = useMutation(uploadFileMutation);
  const [updateUser] = useMutation(updateUserMutation);

  const [file, setFile] = useState<File | Blob>(null);
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [previewURL, setPreviewURL] = useState(
    user && user.avatar
      ? `${process.env.SERVER_URL}${user.avatar.url}`
      : "/img/avatar-placeholder.jpg"
  );
  const [actionProgress, setActionProgress] = useState(false);

  const handleCloseModal = () => {
    setFile(null);
    setAlert({ msg: "", type: "" });
    setActionProgress(false);
    actionClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length) {
      setActionProgress(true);
      setAlert({ msg: "Proszę czekać...", type: "warning" });
      const [file] = e.target.files;
      if (!isFileImage(file)) {
        return setAlert({ msg: "Niepoprawny format pliku", type: "danger" });
      } else if (alert.msg) {
        setAlert({ msg: "", type: "" });
      }

      try {
        new Compressor(file, {
          maxWidth: 128,
          quality: 0.5,
          mimeType: "image/jpeg",
          success(result) {
            setPreviewURL(URL.createObjectURL(result));
            setFile(result);
            setActionProgress(false);
            setAlert({ msg: "", type: "" });
          },
        });
      } catch (err) {
        setActionProgress(false);
        setAlert({ msg: "", type: "" });
      }
    }
  };

  const handleChangeAvatar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file)
      return setAlert({ msg: "Proszę wybrać zdjęcie", type: "danger" });
    try {
      setAlert({ msg: "Proszę czekać...", type: "warning" });
      const { data: uploadFileData } = await uploadFile({
        variables: { file },
      });
      const uploadedImgID = uploadFileData.upload.id;
      const { data: updateUserData } = await updateUser({
        variables: {
          input: { data: { avatar: uploadedImgID }, where: { id: user.id } },
        },
      });

      authDispatch({
        type: "UPDATE_USER",
        payload: updateUserData.updateUser.user,
      });

      handleCloseModal();
    } catch (err) {
      setAlert({
        msg: "Wystąpił błąd, podczas dodawania zdjęcia",
        type: "warning",
      });
    }
  };

  return (
    <>
      {isOpen && <StyledNoScroll />}
      <StyledModal className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head is-radiusless">
            <p className="modal-card-title">Zmiana zdjęcia</p>
            <button
              className="delete"
              type="button"
              onClick={handleCloseModal}
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <Alert
              alert={alert}
              clearAlert={() => setAlert({ msg: "", type: "" })}
            />
            <StyledAvatar>
              <img
                src={previewURL}
                alt={`Zdjęcie profilowe użytkownika ${user && user.username}`}
              />
              <figcaption>
                <StyledFileInput className="file">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Wybierz zdjęcie</span>
                    </span>
                  </label>
                </StyledFileInput>
              </figcaption>
            </StyledAvatar>
          </section>
          <footer className="modal-card-foot is-radiusless">
            <Button className="is-primary" onClick={handleCloseModal}>
              Anuluj
            </Button>
            <Button
              className={`is-primary light ${
                actionProgress ? "is-loading" : ""
              }`}
              onClick={handleChangeAvatar}
            >
              Zmień zdjęcie
            </Button>
          </footer>
        </div>
      </StyledModal>
    </>
  );
};

export default ChangeUserAvatar;
