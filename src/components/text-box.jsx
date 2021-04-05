import StyledTextBox from "../assets/styled-components/styled-text-box";
export default function TextBox({ handleTextChange, textValue }) {
  return (
    <div>
      <p id="resolution-detail">Resolution Detail*</p>
      <StyledTextBox
        rows="5"
        placeHolderText="Enter resolution detail…"
        maxLength={300}
        handleTextChange={handleTextChange}
        textValue={textValue}
      />
    </div>
  );
}
