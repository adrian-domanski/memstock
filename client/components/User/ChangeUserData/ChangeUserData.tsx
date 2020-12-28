import { useMutation } from "@apollo/react-hooks";
import Compressor from "compressorjs";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { uploadFileMutation } from "../../../queries/memQueries";
import { updateUserMutation } from "../../../queries/userQueries";
import { isFileImage } from "../../../utils/helpers";
import {
  Button,
  Input,
  StyledTitle,
} from "../../../utils/styled/components/components";
import {
  StyledFileInput,
  StyledModal,
  StyledNoScroll,
} from "../../../utils/styled/components/Modal";
import Alert from "../../Alert";
import { StyledAvatar, StyledSeparator, StyledWrapper } from "./styled";

interface Props {
  actionClose: () => void;
  isOpen: boolean;
}

enum ErrorTypes {
  USERNAME = "USERNAME",
  AVATAR = "AVATAR",
}

const ChangeUserData: React.FC<Props> = ({ actionClose, isOpen }) => {
  const {
    ctx: { user },
    dispatch: authDispatch,
  } = useContext(AuthContext);

  const [uploadFile] = useMutation(uploadFileMutation);
  const [updateUser] = useMutation(updateUserMutation);

  const [avatarFile, setFile] = useState<File | Blob>(null);
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [previewURL, setPreviewURL] = useState(
    user && user.avatar
      ? `${process.env.SERVER_URL}${user.avatar.url}`
      : "/img/avatar-placeholder.jpg"
  );
  const [actionProgress, setActionProgress] = useState(false);

  const [errors, setErrors] = useState({
    USERNAME: false,
    AVATAR: false,
  });

  const [username, setUsername] = useState("");

  // Set current values from ctx
  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

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
      } catch (e) {
        setActionProgress(false);
        setAlert({ msg: "", type: "" });
      }
    }
  };

  const handleSubmitChanges = async () => {
    setAlert({ msg: "Proszę czekać...", type: "warning" });
    try {
      // Check if new avatar
      if (avatarFile) {
        await upadateAvatar();
      }

      // Check if new username
      if (username !== user.username) {
        await updateUsername();
      }
      setErrors({ USERNAME: false, AVATAR: false });
      handleCloseModal();
    } catch (e) {
      if (e.type && e.msg) {
        setAlert({ msg: e.msg, type: "danger" });
        setErrors({ ...errors, [e.type]: true });
      } else {
        setAlert({ msg: "Wystąpił nieoczekiwany błąd.", type: "danger" });
      }
    }
  };

  const updateUsername = async () => {
    // Validation
    if (
      !username.match(
        /^(?=.{3,14}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
      )
    ) {
      throw {
        type: ErrorTypes.USERNAME,
        msg:
          "Nazwa użytkownika musi zawierać od 3 do 14 znaków. Może składać się wyłącznie z liter, cyfr oraz znaków takich jak . lub _ użytych w celu połączenia wyrazów.",
      };
    }

    // Update
    try {
      const { data: updateUserData } = await updateUser({
        variables: {
          input: { data: { username }, where: { id: user.id } },
        },
      });

      authDispatch({
        type: "UPDATE_USER",
        payload: updateUserData.updateUser.user,
      });
    } catch (e) {
      throw {
        type: ErrorTypes.USERNAME,
        msg: "Użytkownik o takiej nazwie już istnieje",
      };
    }
  };

  const upadateAvatar = async () => {
    try {
      const { data: uploadFileData } = await uploadFile({
        variables: { file: avatarFile },
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
    } catch (e) {
      throw {
        type: ErrorTypes.AVATAR,
        msg: "Wystąpił błąd, podczas dodawania zdjęcia.",
      };
    }
  };

  return (
    <StyledWrapper>
      {isOpen && <StyledNoScroll />}
      <StyledModal className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head is-radiusless">
            <p className="modal-card-title">Informacje o mnie</p>
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

            {/* Avatar */}
            <StyledTitle className="has-text-centered mb-3">
              Zdjęcie profilowe
            </StyledTitle>
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
            <StyledSeparator />
            <StyledTitle className="has-text-centered mb-3 mt-5">
              Nazwa użytkownika
            </StyledTitle>
            <Input
              className={`has-text-centered is-fullwidth ${
                errors.USERNAME ? "is-danger" : ""
              }`}
              type="text"
              id="username"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={handleUsernameChange}
            />
          </section>
          <footer className="modal-card-foot is-radiusless is-flex is-justify-content-flex-end">
            <Button className="ml-auto is-primary" onClick={handleCloseModal}>
              Anuluj
            </Button>
            <Button
              className={`is-primary light ${
                actionProgress ? "is-loading" : ""
              }`}
              onClick={handleSubmitChanges}
            >
              Zapisz zmiany
            </Button>
          </footer>
        </div>
      </StyledModal>
    </StyledWrapper>
  );
};

export default ChangeUserData;
