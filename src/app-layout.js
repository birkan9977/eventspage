import Events from "./components/events-layout.jsx";
import Store from "./store/store";
const AppLayout = () => {
  return (
    <div className="main-container">
      <div className="app-container">
        <div className="events-container">
          <Store>
            <Events />
          </Store>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
