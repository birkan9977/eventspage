import TextBox from "./text-box";

export default function TakeActionTab({
  selectedOptionData,
  handleTextChange,
  textValue,
}) {
  return (
    <div className="option-selected-container">
      <h5>{selectedOptionData.title}</h5>
      <p>{selectedOptionData.text}</p>
      <TextBox handleTextChange={handleTextChange} textValue={textValue} />
    </div>
  );
}
