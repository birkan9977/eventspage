export function formatDate(dateObj) {
  const formattedDate =
    String(dateObj.getDate()).padStart(2, "0") +
    "/" +
    String(dateObj.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(dateObj.getFullYear()) +
    " " +
    String(dateObj.getHours()) +
    ":" +
    String(dateObj.getMinutes()) +
    ":" +
    String(dateObj.getSeconds());
  return formattedDate;
}

export function convertToDateObject(data, key, index) {
  return data.forEach((item) => {
    //item.details[0].value = new Date(item.details[0].value);
    item[key][index].value = new Date(item[key][index].value);
  });
}

export function arraySort(array) {
  array.sort((a, b) => a - b);
}

export function objectSort(obj, key, direction) {
  obj.sort(function (a, b) {
    if (direction === "descending") {
      return b[key] - a[key];
    }
    return a[key] - b[key];
  });
}

export function dateSort(obj, key, index, direction) {
  obj.sort(function (a, b) {
    if (direction === "descending") {
      return b[key][index].value - a[key][index].value;
    }
    return a[key][index].value - b[key][index].value;
  });
}

export function sortData(data, sortBy, sortDirection) {
  switch (sortBy) {
    case "date":
      dateSort(data, "details", 0, sortDirection);
      break;
    case "id":
      objectSort(data, "id", sortDirection);
      break;
    default:
  }
}
