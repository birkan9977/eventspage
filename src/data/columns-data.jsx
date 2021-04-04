//customize columns data
export default function columnsData(data) {
  return [
    {
      address: ["details", 0, "value"],
      type: "date",
      name: data["details"][0]["title"],
    },
    {
      address: ["id"],
      type: "number",
      name: "Id",
    },
    {
      address: ["details", 1, "value"],
      type: "string",
      name: data["details"][1]["title"],
    },
    {
      address: ["details", 2, "value"],
      type: "string",
      name: data["details"][2]["title"],
    },
    {
      address: ["details", 6, "value"],
      type: "string",
      name: data["details"][6]["title"],
    },
    {
      address: ["details", 4, "value"],
      type: "string",
      name: data["details"][4]["title"],
    },
  ];
}
