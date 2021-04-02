import loader from "../assets/images/loader.svg";

export default function Loader() {
  return (
    <div className="loader-container">
      <img className="icon-loader" src={loader} alt=""></img>
    </div>
  );
}
