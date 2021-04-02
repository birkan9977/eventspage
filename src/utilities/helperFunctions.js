export function formatDate(date) {
  const newDate = new Date(date);
  const formattedDate =
    String(newDate.getDate()).padStart(2, "0") +
    "/" +
    String(newDate.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(newDate.getFullYear()) +
    " " +
    String(newDate.getHours()).padStart(2, "0") +
    ":" +
    String(newDate.getMinutes()).padStart(2, "0") +
    ":" +
    String(newDate.getSeconds()).padStart(2, "0");
  return formattedDate;
}

export function changeArrayValue(array, indexToBeChanged, prop, value) {
  return array.map((item, index) => {
    if (Number(index) !== Number(indexToBeChanged)) {
      return item;
    }
    return {
      ...item,
      [prop]: value,
    };
  });
}

function objectSort(obj, key, direction) {
  obj.sort(function (a, b) {
    if (direction === "descending") {
      return b[key] - a[key];
    }
    return a[key] - b[key];
  });
}

function dateSort(obj, key, index, prop, direction) {
  obj.sort(function (a, b) {
    if (direction === "descending") {
      return new Date(b[key][index][prop]) - new Date(a[key][index][prop]);
    }
    return new Date(a[key][index][prop]) - new Date(b[key][index][prop]);
  });
}

export function sortData(data, sortBy, sortDirection) {
  const newCopyObj = data.map((item) => {
    return {
      ...item,
    };
  });

  switch (sortBy) {
    case "date":
      dateSort(newCopyObj, "details", 0, "value", sortDirection);
      break;
    case "id":
      objectSort(newCopyObj, "id", sortDirection);
      break;
    default:
  }

  return newCopyObj;
}
