export function convertToDateTime(milliseconds) {
  const dateObj = new Date(milliseconds);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  // Add leading zeros to single-digit values
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Return the formatted date and time string
  return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function checkNullValues(obj, skipKeys) {
  if (obj === null) return true;
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return true;
    }
    for (let i = 0; i < obj.length; i++) {
      if (checkNullValues(obj[i], skipKeys)) {
        return true;
      }
    }
  } else if (typeof obj === "object") {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const prop = keys[i];
      if (
        (obj[prop] === null || obj[prop] === "") &&
        !skipKeys.includes(prop)
      ) {
        return true;
      } else if (
        typeof obj[prop] === "object" &&
        (obj[prop] !== null || obj[prop] === "")
      ) {
        if (checkNullValues(obj[prop], skipKeys)) {
          return true;
        }
      }
    }
  }
  return false;
}

export function maskAccountNumber(accountNumber) {
  if (!accountNumber) {
    return null;
  }
  let length = accountNumber.length;
  if (length < 4) {
    return accountNumber;
  }
  let masked = "";
  for (let i = 0; i < length - 4; i++) {
    masked += "*";
  }
  let lastFour = accountNumber.substring(length - 4);
  return masked + lastFour;
}
