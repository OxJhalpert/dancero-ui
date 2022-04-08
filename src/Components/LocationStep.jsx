import Grid from "@mui/material/Grid";
import cali from "../images/cali.png";
import bogota from "../images/bogota.png";
import cartagena from "../images/cartagena.png";
import medellin from "../images/medellin.png";

import goBackIcon from "../images/go-back.png"
import Fab from "@mui/material/Fab";
import "../scss/cards.scss";
import "../scss/layout.scss";

function StepFour({ data, update, goBackPage, setPage }) {
  return (
    <div className="container flex-container">
      <div className="section-title">
        <p>
          We have instructors in <b> Medellin, Cali, Cartagena & Bogotá, </b> so you can
          pick a location below. Note that if you’re planning to visit and take
          classes in multiple cities, you can use the live chat feature in the
          bottom right corner for a <b>custom quote.</b>
        </p>
      </div>

      <div className="cards_container">
        <div
          className="card"
          onClick={() => {
            if (data.Venue === "Online") {
              setPage(3);
            }
            update("City", "Cartagena");
          }}
        >
          <div className="card_image">
            <img src={cartagena} />
          </div>
          <div className="card_name">Cartagena</div>
        </div>
        <div
          className="card"
          onClick={() => {
            if (data.Venue === "Online") {
              setPage(3);
            }
            update("City", "Bogota");
          }}
        >
          <div className="card_image">
            <img src={bogota} />
          </div>
          <div className="card_name">Bogotá</div>
        </div>
        <div
          className="card"
          onClick={() => {
            if (data.Venue === "Online") {
              setPage(3);
            }
            update("City", "Medellin");
          }}
        >
          <div className="card_image">
            <img src={medellin} />
          </div>
          <div className="card_name">Medellín</div>
        </div>
        <div
          className="card tall-card"
          onClick={() => {
            if (data.Venue === "Online") {
              setPage(3);
            }
            update("City", "Cali");
          }}
        >
          <div className="card_image">
            <img src={cali} />
          </div>
          <div className="card_name">Cali</div>
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

export default StepFour;
