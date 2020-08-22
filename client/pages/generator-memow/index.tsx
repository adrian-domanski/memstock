import React, { useState, useRef } from "react";
import Layout from "../../components/layout/Layout";
import {
  ContentHeader,
  StyledTitleWithLine,
  ContentBody,
  Button,
  StyledTextArea,
} from "../../utils/styled/components/components";
import Alert from "../../components/Alert";
import { StyledForm } from "../../utils/styled/pages/authPages";
import MemTemplates from "../../components/Mem/MemTemplates";
import { MemGeneratorTemplate } from "../../utils/types";
import { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";
import AddNewMem from "../../components/Mem/AddNewMem";
import styled from "styled-components";
import { isFileImage } from "../../utils/helpers";
import MemCanvas from "../../components/Mem/MemCanvas";

const StyledFileButton = styled.div`
  width: 100%;

  label {
    width: 100%;
  }

  .file-cta {
    width: 100%;
    justify-content: center;
  }
`;

export interface ITextField {
  id: string;
  x: number;
  y: number;
  value: string;
  fontSizeRatio: number;
  strokeSizeRatio: number;
  blackText: boolean;
}

interface Props {
  templates: {
    memes: MemGeneratorTemplate[];
  };
}

const MemGenerator: NextPage<Props> = ({ templates }) => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
  const [textFields, setTextFields] = useState<ITextField[]>([]);
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [canvasBaseImage, setCanvasBaseImage] = useState("");
  const [generatedMem, setGeneratedMem] = useState<File | Blob>(null);

  const handleChange = ({
    target: { name, value, dataset, checked },
  }: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    let currentTextFields = textFields;
    switch (name) {
      case "textField":
        currentTextFields.forEach((textField) => {
          if (textField.id === dataset.id) textField.value = value;
        });
        return setTextFields([...currentTextFields]);
      case "textFieldFontRange":
        currentTextFields.forEach((textField) => {
          if (textField.id === dataset.id) textField.fontSizeRatio = +value;
        });
        return setTextFields([...currentTextFields]);
      case "textStrokeRange":
        currentTextFields.forEach((textField) => {
          if (textField.id === dataset.id) textField.strokeSizeRatio = +value;
        });
        return setTextFields([...currentTextFields]);
      case "textFieldBlackText":
        currentTextFields.forEach((textField) => {
          console.log(value);
          if (textField.id === dataset.id) textField.blackText = checked;
        });
        return setTextFields([...currentTextFields]);
      default:
        return;
    }
  };

  const handleAddTextField = () => {
    const newTextField: ITextField = {
      id: uuidv4(),
      fontSizeRatio: 0.1,
      strokeSizeRatio: 0.03,
      value: "Dodaj tekst",
      x: canvasRef.current.width / 2,
      y: canvasRef.current.height / 2,
      blackText: false,
    };
    setTextFields([...textFields, newTextField]);
  };

  const handleDeleteTextField = (fieldId: string) => {
    const filteredTextFields = textFields.filter((f) => f.id !== fieldId);
    setTextFields([...filteredTextFields]);
  };

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    canvasRef.current.toBlob(
      (blob) => {
        setGeneratedMem(blob);
      },
      "image/jpeg",
      0.8
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files;
    if (file) {
      if (isFileImage(file)) {
        setCanvasBaseImage(URL.createObjectURL(file));
      } else {
        setAlert({ msg: "Niepoprawny format zdjęcia", type: "danger" });
      }
    }
  };

  return (
    <Layout>
      {generatedMem ? (
        <AddNewMem generatedMem={generatedMem} download />
      ) : (
        <>
          <ContentHeader>
            <StyledTitleWithLine className="is-size-4">
              Generator memów
            </StyledTitleWithLine>
          </ContentHeader>
          <ContentBody>
            <div className="section columns">
              <div className="column is-7">
                <MemCanvas
                  canvasProps={{ textFields, setTextFields, canvasRef }}
                  canvasBaseImage={canvasBaseImage}
                />
              </div>
              <div className="column is-5">
                <StyledForm
                  className="mt-0"
                  onSubmit={handleSubmit}
                  action="submit"
                >
                  <Alert
                    alert={alert}
                    clearAlert={() => setAlert({ msg: "", type: "" })}
                  />

                  {textFields.map((field, i) => (
                    <div key={field.id} className="field mb-5">
                      <label
                        className="label"
                        htmlFor={`textField-${field.id}`}
                      >
                        Pole tekstowe numer {i + 1} -{" "}
                        <button
                          className="is-size-6 has-text-danger button-link"
                          type="button"
                          onClick={handleDeleteTextField.bind(null, field.id)}
                        >
                          Usuń
                        </button>
                      </label>
                      <StyledTextArea
                        className="textarea"
                        id={`textField-${field.id}`}
                        name="textField"
                        data-id={field.id}
                        placeholder="Dodatkowe pole tekstowe"
                        value={field.value}
                        onChange={handleChange}
                      />
                      <div className="columns">
                        <div className="column">
                          <label
                            className="label mt-4"
                            htmlFor={`textFieldRange-${field.id}`}
                          >
                            Wielkość czcionki:
                          </label>
                          <input
                            type="range"
                            id={`textFieldRange-${field.id}`}
                            data-id={field.id}
                            className="range"
                            name="textFieldFontRange"
                            min="0.03"
                            max="0.20"
                            value={field.fontSizeRatio}
                            onChange={handleChange}
                            step="0.01"
                          />
                        </div>
                        <div className="column">
                          <label
                            className="label mt-4"
                            htmlFor={`textFieldRange-${field.id}`}
                          >
                            Grubość konturu:
                          </label>
                          <input
                            type="range"
                            id={`textStrokeRange-${field.id}`}
                            data-id={field.id}
                            className="range"
                            name="textStrokeRange"
                            min="0"
                            max="0.05"
                            value={field.strokeSizeRatio}
                            onChange={handleChange}
                            step="0.01"
                          />
                        </div>
                        <div className="column is-vertical-center">
                          <input
                            type="checkbox"
                            id={`textFieldBlackText-${field.id}`}
                            data-id={field.id}
                            name="textFieldBlackText"
                            checked={field.blackText}
                            onChange={handleChange}
                          />
                          <label
                            className="checkbox ml-1"
                            htmlFor={`textFieldBlackText-${field.id}`}
                          >
                            Czarny tekst
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    className="is-primary is-fullwidth is-block light mb-5 px-6"
                    onClick={handleAddTextField}
                    type="button"
                  >
                    Dodaj pole tekstowe
                  </Button>
                  <StyledFileButton className="field is-fullwidth">
                    <div className="file is-primary">
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
                          <span className="file-label">Wybierz tło</span>
                        </span>
                      </label>
                    </div>
                  </StyledFileButton>
                  <button className="button is-link px-6" type="submit">
                    Generuj mema
                  </button>
                </StyledForm>
              </div>
            </div>
          </ContentBody>

          <MemTemplates
            setCanvasBaseImage={setCanvasBaseImage}
            canvasBaseImage={canvasBaseImage}
            templates={templates}
          />
        </>
      )}
    </Layout>
  );
};

MemGenerator.getInitialProps = async () => {
  const res = await fetch(`https://api.imgflip.com/get_memes`);
  const json = await res.json();
  return { templates: json.data };
};

export default MemGenerator;
