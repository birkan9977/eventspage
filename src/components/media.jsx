import exitIcon from "../assets/images/exit-fullscreen-icon.svg";
const Media = ({ mediaData }) => {
  const handleClick = (e) => {
    document.getElementById("ScreenBack").classList.add("displayBackScreen");
  };

  const handleExitFullScreen = (e) => {
    document.getElementById("ScreenBack").classList.remove("displayBackScreen");
  };
  return (
    <div className="media-tab">
      <div className="image-container">
        <MediaTypeFinder mediaData={mediaData} />
        <img
          id="overlay-enlarge"
          onClick={handleClick}
          className="overlay-enlarge-icon"
          alt=""
          src={exitIcon}
        ></img>
      </div>
      <div
        onClick={handleExitFullScreen}
        id="ScreenBack"
        className="fullScreenBack"
      >
        <figure id="image-frame" className="image-frame">
          <img
            onClick={handleClick}
            className="media-image-large"
            alt=""
            src={mediaData[0].url}
          ></img>
        </figure>
      </div>
    </div>
  );
};

export default Media;

const MediaTypeFinder = ({ mediaData }) => {
  if (mediaData[0].type === "image") {
    return <img className="media-image" src={mediaData[0].url} alt=""></img>;
  } else if (mediaData[0].type === "audio") {
    return (
      <div>
        <audio src={mediaData[0].url} controls autoPlay />
      </div>
    );
  } else {
    return <p>No Media Content available.</p>;
  }
};
