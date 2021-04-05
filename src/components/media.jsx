import exitIcon from "../assets/images/exit-fullscreen-icon.svg";
const Media = ({ mediaData }) => {
  return (
    <div className="media-tab">
      <div className="media-container">
        <MediaTypeFinder mediaData={mediaData} />
      </div>
    </div>
  );
};

export default Media;

const MediaTypeFinder = ({ mediaData }) => {
  const handleClick = (e) => {
    document.getElementById("ScreenBack").classList.add("displayBackScreen");
  };
  const handleExitFullScreen = (e) => {
    document.getElementById("ScreenBack").classList.remove("displayBackScreen");
  };
  if (mediaData[0].type === "image") {
    return (
      <div className="image-container">
        <div className="image-frame small-frame">
          <img className="media-image" src={mediaData[0].url} alt=""></img>
          <img
            id="overlay-enlarge"
            onClick={handleClick}
            className="overlay-enlarge-icon"
            alt=""
            src={exitIcon}
          ></img>
        </div>
        <div id="ScreenBack" className="fullScreenBack">
          <figure id="image-frame" className="image-frame">
            <img
              onClick={handleClick}
              className="media-image-large"
              alt=""
              src={mediaData[0].url}
            ></img>
            <img
              id="overlay-enlarge"
              onClick={handleExitFullScreen}
              className="overlay-enlarge-icon"
              alt=""
              src={exitIcon}
            ></img>
          </figure>
        </div>
      </div>
    );
  } else if (mediaData[0].type === "audio") {
    return (
      <div>
        <audio
          preload="auto"
          src={mediaData[0].url}
          controls
          type="audio/mp3"
        />
      </div>
    );
  } else {
    return <p>No Media Content available!</p>;
  }
};
