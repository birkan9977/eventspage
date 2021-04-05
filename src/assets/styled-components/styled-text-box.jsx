import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
const TextBox = styled.textarea`
  display: block;
  width: 100%;
  border: 0.5px solid #596680;
  border-radius: 6px;
  opacity: 1;
  background: #ffffff 0% 0% no-repeat padding-box;
  resize: none;
  padding: 1rem;
  padding-right: 8rem;
  padding-bottom: 3rem;
  font-size: 1.4rem;
  font-weight: 1.9rem;
  font-family: inherit;
  &::placeholder {
    color: #454f63;
    opacity: 0.3;
  }
`;
const Span = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 2rem;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: #454f63;
  opacity: 0.3;
`;

const Div = styled.div`
  position: relative;
`;

export default function StyledTextBox({
  placeHolderText,
  rows,
  maxLength,
  handleTextChange,
  textValue,
}) {
  const [characterNumber, setCharacterNumber] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    const elem = document.getElementById("styled-text-box-with-char-count");
    elem.defaultValue = textValue;
    elem.focus();
    elem.selectionStart = textValue.length;
    inputRef.current.focus();
    return () => {
      handleTextChange(elem.value);
    };
  }, []);

  const handleChange = (evt) => {
    const input = evt.target.value;
    setCharacterNumber(input.length);
  };

  return (
    <Div>
      <TextBox
        id="styled-text-box-with-char-count"
        ref={inputRef}
        onChange={handleChange}
        rows={rows}
        placeholder={placeHolderText}
        maxLength={maxLength}
      />
      <Span>{`(${maxLength}/${characterNumber})`}</Span>
    </Div>
  );
}
