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
  if (rank < 500) return "Początkujący śmieszek";
  else if (rank < 1000) return "Śmieszek";
  else if (rank < 1500) return "Fanatyk wędkarstwa";
  else if (rank < 2000) return "Fanatyk leczo";
  else {
    return "Kozak totalny";
  }
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
