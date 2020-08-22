import React, { useEffect, useState } from "react";
import { ITextField } from "../../pages/generator-memow";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const StyledCanvas = styled.canvas`
  &&& {
    width: 100%;
    display: block;
  }
`;

export interface CanvasProps {
  textFields: ITextField[];
  setTextFields: React.Dispatch<React.SetStateAction<ITextField[]>>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
}

interface Props {
  canvasProps: CanvasProps;
  canvasBaseImage: string;
}

const MemCanvas: React.FC<Props> = ({
  canvasProps: { textFields, setTextFields, canvasRef },
  canvasBaseImage,
}) => {
  const [ctx, setContext] = useState<CanvasRenderingContext2D>(null);
  const [image, setImage] = useState<HTMLImageElement>(null);
  const [selectedTextId, setSelectedTextId] = useState<string>(null);
  const [memConfig, setMemConfig] = useState({
    textPadding: 25,
    getFontSize: (fontRatio: number) => fontRatio * canvasRef.current.width,
  });

  useEffect(() => {
    setContext(canvasRef.current.getContext("2d"));
  }, []);

  useEffect(() => {
    if (canvasBaseImage) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = canvasBaseImage;
      image.onload = () => {
        setImage(image);
        canvasRef.current.height = image.height;
        canvasRef.current.width = image.width;

        setTextFields([
          {
            fontSizeRatio: 0.1,
            id: uuidv4(),
            value: `Przeciągnij mnie \n w dowolne miejsce`,
            x: canvasRef.current.width / 2,
            y: memConfig.getFontSize(0.15) / 2,
            blackText: false,
            strokeSizeRatio: 0.03,
          },
          {
            fontSizeRatio: 0.1,
            id: uuidv4(),
            value: "Tekst na dole",
            x: canvasRef.current.width / 2,
            y: canvasRef.current.height - memConfig.getFontSize(0.15) / 2,
            blackText: false,
            strokeSizeRatio: 0.03,
          },
        ]);
      };
    }
  }, [canvasBaseImage]);

  useEffect(() => {
    if (image) {
      clearCanvas();
      ctx.drawImage(image, 0, 0);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      textFields.forEach((textField) => drawText(textField));
    }
  }, [image, textFields]);

  const clearCanvas = () =>
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  const drawText = (textField: ITextField) => {
    const canvas = canvasRef.current;
    const fontSize = memConfig.getFontSize(textField.fontSizeRatio);
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = textField.blackText ? "black" : "white";
    ctx.lineWidth = fontSize * textField.strokeSizeRatio;
    let splitedText = textField.value.split("\n");
    splitedText.forEach((line, i) => {
      ctx.fillText(
        line,
        textField.x,
        textField.y + i * fontSize,
        canvas.width - memConfig.textPadding
      );
      if (!textField.blackText && textField.strokeSizeRatio > 0) {
        ctx.strokeText(
          line,
          textField.x,
          textField.y + i * fontSize,
          canvas.width - memConfig.textPadding
        );
      }
    });
  };

  const isActionInsideText = (
    x: number,
    y: number,
    currentTextField: ITextField
  ) => {
    const fontSize = memConfig.getFontSize(currentTextField.fontSizeRatio);
    let longestLine = "";
    let splitedText = currentTextField.value.split("\n");
    splitedText.forEach((line) => {
      if (line.length > longestLine.length) longestLine = line;
    });
    const { width } = ctx.measureText(longestLine);

    return (
      x >= currentTextField.x - width / 2 &&
      x <= currentTextField.x + width / 2 &&
      y >= currentTextField.y - fontSize / 2 &&
      y <= currentTextField.y + (fontSize * splitedText.length - fontSize / 2)
    );
  };

  const getMousePosition = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x:
        ((e.pageX - rect.left - scrollX) / rect.width) *
        canvasRef.current.width,
      y:
        ((e.pageY - rect.top - scrollY) / rect.height) *
        canvasRef.current.height,
    };
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    e.preventDefault();
    const mousePosition = getMousePosition(e);
    textFields.forEach((textField) => {
      if (isActionInsideText(mousePosition.x, mousePosition.y, textField)) {
        setSelectedTextId(textField.id);
      }
    });
  };

  const handleStopDragging = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSelectedTextId(null);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selectedTextId === null) return;
    const currentTextFields = textFields;
    currentTextFields.find((textField) => {
      console.log(textField);
      if (textField.id === selectedTextId) {
        const fontSize = memConfig.getFontSize(+textField.fontSizeRatio);
        const mousePosition = getMousePosition(e);
        let longestLine = "";
        let splitedText = textField.value.split("\n");
        splitedText.forEach((line) => {
          if (line.length > longestLine.length) longestLine = line;
        });
        const { width } = ctx.measureText(longestLine);

        const dx = mousePosition.x - (textField.x - width / 2) - width / 2;
        const dy =
          mousePosition.y -
          (textField.y + (fontSize * splitedText.length) / 2) +
          fontSize / 2;

        textField.x += dx;
        textField.y += dy;
        return true;
      }
    });

    setTextFields([...currentTextFields]);
  };

  return (
    <StyledCanvas
      onMouseDown={handleMouseDown}
      onMouseUp={handleStopDragging}
      onMouseOut={handleStopDragging}
      onMouseMove={handleMouseMove}
      ref={canvasRef}
    />
  );
};

export default MemCanvas;
