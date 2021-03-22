import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  background: ${(props) => (props.primary ? "#3BA935" : "#172C49")};
  font-size: 1.3rem;
  width: ${(props) => (props.large ? "49%" : "30%")};
  color: white;
  letter-spacing: 0.06rem;
  padding: 0.7rem 0.6rem;
  margin: 0.3rem 0;
  border: none;
  border-radius: 3px;
  text-transform: uppercase;
  cursor: pointer;
`;

export default function StyledButton({ text, action, large, onClick, cls }) {
  return (
    <Button primary={action} large={large} onClick={onClick} className={cls}>
      {text}
    </Button>
  );
}
