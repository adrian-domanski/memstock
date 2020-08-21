import React, { useEffect, useState } from "react";
import { ITextField } from "../../pages/generator-memow";

export interface CanvasProps {
  textFields: ITextField[];
  setTextFields: React.Dispatch<React.SetStateAction<ITextField[]>>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
}

interface Props {
  className: string;
  canvasProps: CanvasProps;
  previewURL?: string;
}

const MemCanvas: React.FC<Props> = ({
  className,
  canvasProps: { textFields, setTextFields, canvasRef },
  previewURL,
}) => {
  const [ctx, setContext] = useState<CanvasRenderingContext2D>(null);
  const [image, setImage] = useState<HTMLImageElement>(null);
  const [memConfig, setMemConfig] = useState({
    textPadding: 25,
    lineHeight: 12,
    lineWidthRatio: 22,
    getFontSize: (fontRatio: number) => fontRatio * canvasRef.current.width,
  });
  const [selectedTextId, setSelectedTextIndex] = useState<string>(null);

  useEffect(() => {
    setContext(canvasRef.current.getContext("2d"));
  }, []);

  useEffect(() => {
    if (previewURL) {
      const image = new Image();
      image.src = previewURL;
      image.onload = () => {
        setImage(image);
        canvasRef.current.height = image.height;
        canvasRef.current.width = image.width;
      };
    }
  }, [previewURL]);

  useEffect(() => {
    if (image) {
      clearCanvas();
      ctx.drawImage(image, 0, 0);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      textFields.forEach((textField) => drawText(textField));
    }
  }, [image, textFields]);

  const clearCanvas = () =>
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  const drawText = (textField: ITextField) => {
    const canvas = canvasRef.current;
    const fontSize = memConfig.getFontSize(+textField.fontSizeRatio);
    ctx.font = `${fontSize}px Impact`;
    ctx.lineWidth = fontSize / memConfig.lineWidthRatio;
    let splitedText = textField.value.split("\n");
    splitedText.forEach((line, i) => {
      ctx.fillText(
        line,
        textField.x,
        textField.y + i * fontSize,
        canvas.width - memConfig.textPadding
      );
      ctx.strokeText(
        line,
        textField.x,
        textField.y + i * fontSize,
        canvas.width - memConfig.textPadding
      );
    });
  };

  const isActionInsideText = (
    x: number,
    y: number,
    currentTextField: ITextField
  ) => {
    const fontSize = memConfig.getFontSize(+currentTextField.fontSizeRatio);
    let longestLine = "";
    let splitedText = currentTextField.value.split("\n");
    splitedText.forEach((line) => {
      if (line.length > longestLine.length) longestLine = line;
    });
    const { width } = ctx.measureText(longestLine);

    return (
      x >= currentTextField.x &&
      x <= currentTextField.x + width &&
      y >= currentTextField.y - fontSize &&
      y <= currentTextField.y + fontSize * (splitedText.length - 1)
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
        setSelectedTextIndex(textField.id);
      }
    });
  };

  const handleStopDragging = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSelectedTextIndex(null);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selectedTextId === null) return;
    const currentTextFields = textFields;
    const selectedText = currentTextFields.find(
      (textField) => textField.id === selectedTextId
    );
    if (!selectedText) return;
    const fontSize = memConfig.getFontSize(+selectedText.fontSizeRatio);
    const mousePosition = getMousePosition(e);
    let longestLine = "";
    let splitedText = selectedText.value.split("\n");
    splitedText.forEach((line) => {
      if (line.length > longestLine.length) longestLine = line;
    });
    const { width } = ctx.measureText(longestLine);

    const dx = mousePosition.x - selectedText.x - width / 2;
    const dy =
      mousePosition.y -
      selectedText.y -
      ((splitedText.length - 2) * fontSize) / 2;

    selectedText.x += dx;
    selectedText.y += dy;

    setTextFields([...textFields, selectedText]);
  };

  return (
    <canvas
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleStopDragging}
      onMouseOut={handleStopDragging}
      onMouseMove={handleMouseMove}
      ref={canvasRef}
    />
  );
};

export default MemCanvas;
