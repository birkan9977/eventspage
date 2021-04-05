import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  background: ${(props) => (props.type === "primary" ? "#3BA935" : "#172C49")};
  font-size: 1.3rem;
  width: ${(props) => (props.size === "large" ? "16rem" : "12rem")};
  color: white;
  letter-spacing: 0.06rem;
  font-weight: 200;
  padding: 0.7rem 0.6rem;
  margin: 0.3rem 0;
  border: none;
  border-radius: 3px;
  text-transform: uppercase;
  cursor: pointer;
  disabled: ${(props) => (props.disabled ? "true" : "false")};
`;

export default function StyledButton({
  text,
  type,
  size,
  onClick,
  disabled,
  buttonValue,
  clsName,
}) {
  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      disabled={disabled}
      value={buttonValue}
      className={clsName}
    >
      {text}
    </Button>
  );
}
