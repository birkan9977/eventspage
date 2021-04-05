//customize columns data
export default function columnsData(data) {
  const arrayIndex = [0, 1, 2, 6, 4];
  return [
    {
      address: ["details", arrayIndex[0], "value"],
      type: "date",
      name: data["details"][arrayIndex[0]]["title"],
    },
    {
      address: ["id"],
      type: "number",
      name: "Id",
    },
    {
      address: ["details", arrayIndex[1], "value"],
      type: "string",
      name: data["details"][arrayIndex[1]]["title"],
    },
    {
      address: ["details", arrayIndex[2], "value"],
      type: "string",
      name: data["details"][arrayIndex[2]]["title"],
    },
    {
      address: ["details", arrayIndex[3], "value"],
      type: "string",
      name: data["details"][arrayIndex[3]]["title"],
    },
    {
      address: ["details", arrayIndex[4], "value"],
      type: "string",
      name: data["details"][arrayIndex[4]]["title"],
    },
  ];
}

export function extraColumns(data) {
  const arrayIndex = [4, 7, 3, 5];
  const extrColumnsArray = [
    {
      title: data["details"][arrayIndex[0]]["title"],
      value: ["details", arrayIndex[0], "value"],
      detail: ["details", arrayIndex[0], "detail"],
    },
    {
      title: data["details"][arrayIndex[1]]["title"],
      value: ["details", arrayIndex[1], "value"],
    },
    {
      title: data["details"][arrayIndex[2]]["title"],
      value: ["details", arrayIndex[2], "value"],
    },
    {
      title: data["details"][arrayIndex[2]]["title"],
      value: ["details", arrayIndex[2], "value"],
    },
  ];
  return extrColumnsArray;
}
