import Compressor from "compressorjs";
import badges from "./badges.json";
import { v4 as uuidv4 } from "uuid";

// Compress image, add watermark, get ready to download / server upload
export const convertImage = async (file: Blob | File, titleBase?: string) =>
  new Promise<Blob>(async (resolve, reject) => {
    const watermark = (await import("watermarkjs")).default;
    try {
      new Compressor(file, {
        maxWidth: 800,
        quality: 0.7,
        mimeType: "image/jpeg",
        async success(resizedImage) {
          // Watermark
          const getXPos = (
            resizedImage: HTMLCanvasElement,
            watermark: HTMLCanvasElement
          ) => {
            return resizedImage.width - watermark.width - 10;
          };

          const getYPos = (
            resizedImage: HTMLCanvasElement,
            watermark: HTMLCanvasElement
          ) => {
            return resizedImage.height / 2 - watermark.height / 2;
          };

          watermark([resizedImage, "img/watermark.png"])
            .image(watermark.image.atPos(getXPos, getYPos, 0.7))
            .then(async (image: HTMLImageElement) => {
              const imageName = `${
                titleBase ? encodeURIComponent(titleBase) : ""
              }${uuidv4()}.jpg`;
              const imgWithWatermark = dataURLtoFile(image.src, imageName);

              // PNG => JPG
              new Compressor(imgWithWatermark, {
                quality: 0.7,
                maxWidth: 800,
                mimeType: "image/jpeg",
                success(compressedImage) {
                  resolve(compressedImage);
                },
              });
            });
        },
      });
    } catch (err) {
      reject(err);
    }
  });

export const isServer = () => typeof window === "undefined";

export const getCookie = (name) => {
  if (!process.browser) return;
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

export const isFileImage = (file) => {
  const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

  return file && acceptedImageTypes.includes(file["type"]);
};

export const isPageAdmin = (role) => {
  try {
    if (role.name === "PageAdmin") return true;
  } catch {
    return false;
  }
};

export const getRankName = (rank: number) => {
  const neededPoints = Object.keys(badges);
  let badge = "None";

  neededPoints.forEach((points) => {
    if (rank >= parseFloat(points)) {
      badge = badges[points];
    }
  });

  return badge;
};

interface formatDateOptions {
  getExactTime: boolean;
}

export const formatDate = (date: Date, options?: formatDateOptions) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (options && options.getExactTime) {
    let hours: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    return `${hours}:${minutes} | ${day}.${month}.${year}`;
  }

  return `${day}.${month}.${year}`;
};

export const isObjectEmpty = (obj: {}) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const blobToFile = (theBlob: Blob, fileName: string) => {
  return new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
};

export const dataURLtoFile = (dataUrl, filename) => {
  var arr = dataUrl.split(","),
    mime = "image/jpeg",
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const setCommentCooldown = () => {
  const date = new Date();

  localStorage.setItem("comment_cooldown", date.toString());
};

export const checkCommentCooldown = () => {
  if (localStorage.getItem("comment_cooldown")) {
    const now = new Date();
    const lastCommentDate = Date.parse(
      localStorage.getItem("comment_cooldown")
    );
    const timeInSec = Math.abs(lastCommentDate - now.getTime()) / 1000;
    if (timeInSec < 30) return true;
  }
  return false;
};

export const setMemCooldown = () => {
  const date = new Date();

  localStorage.setItem("mem_cooldown", date.toString());
};

export const checkMemCooldown = () => {
  if (localStorage.getItem("mem_cooldown")) {
    const now = new Date();
    const lastMemDate = Date.parse(localStorage.getItem("mem_cooldown"));
    const timeInSec = Math.abs(lastMemDate - now.getTime()) / 1000;
    if (timeInSec < 60) return true;
  }
  return false;
};
