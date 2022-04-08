import Grid from "@mui/material/Grid";
import studio from "../images/studio.png";
import home from "../images/home.png";
import goBackIcon from "../images/go-back.png"
import Fab from "@mui/material/Fab";
import "../scss/cards.scss";
import "../scss/layout.scss";

function HomeStudioStep({ update, goBackPage }) {
  return (
    <div className="container flex-container">
      <div className="section-title">
        <p>
          Your instructor(s) can come to your home (or any other place you may
          have available to you, <b>including hotel, park, terrace</b> - a flat ground
          is really all what’s needed) or we can book a studio close to your
          location.
        </p>
      </div>
      <div className="cards_container">
        <div
          className="card"
          onClick={() => update("place", "home")}
        >
          <div className="card_image">
            <img src={home} />
          </div>
          <div className="card_name">Home</div>
        </div>

        <div
          className="card"
          onClick={() => update("place", "studio")}
        >
          <div className="card_image">
            <img src={studio} />
          </div>
          <div className="card_name">Studio</div>
        </div>
      </div>
      <div className="go-back">
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => goBackPage()}
          >
            <img src={goBackIcon} alt="" /> 
            Back 
          </Fab>
      </div>
    </div>
  );
}

export default HomeStudioStep;
