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
import MyDropzone from "../../components/Dropzone";
import { StyledForm } from "../../utils/styled/pages/authPages";
import MemTemplates from "../../components/Mem/MemTemplates";
import { MemGeneratorTemplate } from "../../utils/types";
import { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";

export interface ITextField {
  id: string;
  x: number;
  y: number;
  value: string;
  fontSizeRatio: string;
}

interface Props {
  templates: {
    memes: MemGeneratorTemplate[];
  };
}

const MemGenerator: NextPage<Props> = ({ templates }) => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef(null);
  const [textFields, setTextFields] = useState<ITextField[]>(() => {
    let state = [];
    if (canvasRef.current) {
      console.log(canvasRef);
      state = [
        {
          id: uuidv4(),
          fontSizeRatio: "0.15",
          value: "",
          x: canvasRef.current.width / 2,
          y: canvasRef.current.height / 2,
        },
      ];
    }
    return state;
  });
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [previewURL, setPreviewURL] = useState("");
  const [uploadedLink, setUploadedLink] = useState("");
  const [file, setFile] = useState<File | Blob>(null);

  const handleChange = ({
    target: { name, value, dataset },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let currentTextFields = textFields;
    switch (name) {
      case "textField":
        currentTextFields.forEach((textField) => {
          if (textField.id === dataset.id) textField.value = value;
        });
        return setTextFields([...currentTextFields]);
      case "textFieldFontRange":
        currentTextFields.forEach((textField) => {
          if (textField.id === dataset.id) textField.fontSizeRatio = value;
        });
        return setTextFields([...currentTextFields]);
      default:
        return;
    }
  };

  const handleAddTextField = () => {
    const newTextField: ITextField = {
      id: uuidv4(),
      fontSizeRatio: "0.15",
      value: "",
      x: canvasRef.current.width / 2,
      y: canvasRef.current.height / 2,
    };
    setTextFields([...textFields, newTextField]);
  };

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <ContentHeader>
        <StyledTitleWithLine className="is-size-4">
          Generator memów
        </StyledTitleWithLine>
      </ContentHeader>
      <ContentBody>
        <div className="section columns">
          <div className="column is-6">
            <MyDropzone
              previewURL={previewURL}
              setPreviewURL={setPreviewURL}
              disabled
              setFile={setFile}
              canvasProps={{
                textFields,
                setTextFields,
                canvasRef,
              }}
            />
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

              {textFields.map((field, i) => (
                <div key={field.id} className="field">
                  <label className="label" htmlFor={`textField-${field.id}`}>
                    Pole tekstowe numer {i + 1}
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
                    min="0.05"
                    max="0.25"
                    value={field.fontSizeRatio}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>
              ))}

              <Button
                className="is-primary is-fullwidth is-block light mb-5 px-6"
                onClick={handleAddTextField}
                type="button"
              >
                Dodaj pole tekstowe
              </Button>
              <button className="button is-link px-6" type="submit">
                Generuj mema
              </button>
            </StyledForm>
          </div>
        </div>
      </ContentBody>

      <MemTemplates
        setPreviewURL={setPreviewURL}
        previewURL={previewURL}
        templates={templates}
      />
    </Layout>
  );
};

MemGenerator.getInitialProps = async () => {
  const res = await fetch(`https://api.imgflip.com/get_memes`);
  const json = await res.json();
  return { templates: json.data };
};

export default MemGenerator;
