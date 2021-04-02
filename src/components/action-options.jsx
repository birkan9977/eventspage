import clsx from "clsx";

export default function ActionOptions({
  title,
  text,
  option,
  selectedOption,
  handleSelectedOption,
}) {
  return (
    <div
      className={clsx(
        "option-box",
        selectedOption === option && "selected-option-box"
      )}
    >
      <button
        value={option}
        className="overlay-rectangle"
        onClick={handleSelectedOption}
      ></button>
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  );
}
