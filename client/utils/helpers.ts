import badges from "./badges.json";

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

  neededPoints.forEach((points, index) => {
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
  const month = date.getMonth();
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

export function dataURItoBlob(dataURI) {
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
