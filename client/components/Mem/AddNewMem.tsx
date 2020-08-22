import React, { useState } from "react";
import {
  ContentHeader,
  StyledTitleWithLine,
  ContentBody,
  Button,
  StyledSelect,
} from "../../utils/styled/components/components";
import {
  getCategoriesQuery,
  uploadFileMutation,
  createMemMutation,
} from "../../queries/memQueries";
import Alert from "../../components/Alert";
import styled from "styled-components";
import MyDropzone from "../../components/Dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import { StyledForm } from "../../utils/styled/pages/authPages";

const InlineButton = styled.button`
  &&& {
    background: unset;
    border: none;
    padding: 0;
    display: block;
    justify-content: flex-start;

    :hover {
      color: ${({ theme }) => theme.colors.primaryDarker};
    }

    :active,
    :focus {
      outline: none;
      box-shadow: unset;
      border: none;
    }
  }
`;

interface IProps {
  generatedMem?: File | Blob;
  download?: boolean;
}

const AddNewMem: React.FC<IProps> = (props) => {
  const [upload] = useMutation(uploadFileMutation);
  const [createMem] = useMutation(createMemMutation);
  const { data, loading } = useQuery(getCategoriesQuery);

  const [title, setTitle] = useState("");
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [previewURL, setPreviewURL] = useState("");
  const [uploadedLink, setUploadedLink] = useState("");
  const [file, setFile] = useState<File | Blob>(props.generatedMem ?? null);
  const [categories, setCategories] = useState<string[]>([""]);

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    if (!title || !file) {
      return setAlert({
        msg: "Proszę wypełnić wszystkie pola i wybrać minimum 1 kategorię",
        type: "danger",
      });
    }

    for (let value of categories) {
      if (!value)
        return setAlert({
          msg: "Proszę wybrać minimum 1 kategorię",
          type: "danger",
        });
    }

    try {
      setAlert({ msg: "Proszę czekać...", type: "warning" });
      const { data: uploadFileData } = await upload({ variables: { file } });
      const uploadedImgID = uploadFileData.upload.id;
      const { data: createMemData } = await createMem({
        variables: { title, categories, image: uploadedImgID },
      });
      setUploadedLink(`/mem/${createMemData.createMem.mem.id}`);

      setAlert({
        msg:
          "Sukces! Twój obrazek trafił do poczekalni i oczekuje na akceptację",
        type: "success",
      });
    } catch (err) {
      setAlert({
        msg: "Wystąpił błąd, podczas dodawania zdjęcia",
        type: "warning",
      });
    }
  };

  const handleChangeTitle = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    let currentCategories = [...categories];
    if (!currentCategories.includes(e.target.value)) {
      currentCategories[index] = e.target.value;
      setCategories(currentCategories);
    }
  };

  const clearFields = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setTitle("");
    setCategories([""]);
    setAlert({ msg: "", type: "" });
    setFile(null);
    setPreviewURL("");
    setUploadedLink("");
  };

  return (
    <>
      <ContentHeader>
        <StyledTitleWithLine className="is-size-4">
          Dodawanie własnego mema
        </StyledTitleWithLine>
      </ContentHeader>
      <ContentBody>
        <div className="section columns">
          <div className="column is-6">
            {props.generatedMem ? (
              <img
                className="image is-fullwidth"
                src={URL.createObjectURL(props.generatedMem)}
                alt="Wygenerowany mem"
              />
            ) : (
              <MyDropzone
                previewURL={previewURL}
                setPreviewURL={setPreviewURL}
                setFile={setFile}
              />
            )}
          </div>
          <div className="column is-6">
            <StyledForm
              className="mt-0"
              onSubmit={handleSubmit}
              action="submit"
            >
              <Alert
                alert={alert}
                clearAlert={() => setAlert({ msg: "", type: "" })}
              />

              {uploadedLink && (
                <div className="notification is-info is-light">
                  <button
                    className="delete"
                    onClick={() => setUploadedLink("")}
                  ></button>
                  <p>
                    Link do twojego mema:&nbsp;
                    <Link href={uploadedLink}>
                      <a className="has-text-weight-bold">{`${process.env.CLIENT_URL}${uploadedLink}`}</a>
                    </Link>
                  </p>
                </div>
              )}

              {!uploadedLink && (
                <>
                  <div className="field">
                    <label className="label" htmlFor="title">
                      Tytuł mema
                    </label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="text"
                        id="title"
                        placeholder="Tytuł mema"
                        value={title}
                        onChange={handleChangeTitle}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field mb-5">
                    <label className="label" htmlFor="password">
                      Kategorie
                    </label>

                    {categories.map((_, index) => (
                      <StyledSelect
                        key={index}
                        className="select is-fullwidth mb-2"
                      >
                        <select
                          value={categories[index]}
                          name="select"
                          onChange={(e) => handleCategoryChange(e, index)}
                        >
                          <option disabled value="">
                            Wybierz kategorię
                          </option>
                          {!loading
                            ? data.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))
                            : null}
                        </select>
                      </StyledSelect>
                    ))}
                    {categories.length < 3 && (
                      <InlineButton
                        className="button has-text-primary"
                        type="button"
                        onClick={() => setCategories([...categories, ""])}
                      >
                        Dodaj kategorię (maksymalnie 3)
                      </InlineButton>
                    )}
                    {categories.length > 1 && (
                      <InlineButton
                        className="button has-text-primary"
                        type="button"
                        onClick={() =>
                          setCategories(
                            categories.slice(0, categories.length - 1)
                          )
                        }
                      >
                        Usuń kategorię
                      </InlineButton>
                    )}
                  </div>
                </>
              )}

              {props.download && file && (
                <a
                  className="button is-link mb-3"
                  href={URL.createObjectURL(file)}
                  download
                >
                  Pobierz
                </a>
              )}
              {uploadedLink ? (
                <Button
                  className="is-primary light mb-5 px-6"
                  onClick={clearFields}
                  type="button"
                >
                  Dodaj następnego mema
                </Button>
              ) : (
                <Button className="is-primary light mb-5 px-6" type="submit">
                  Dodaj mema
                </Button>
              )}
            </StyledForm>
          </div>
        </div>
      </ContentBody>
    </>
  );
};

export default AddNewMem;
