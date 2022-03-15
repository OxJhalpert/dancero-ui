import Grid from "@mui/material/Grid";
import cali from "../images/cali.jpg";
import bogota from "../images/bogota.jpg";
import cartagena from "../images/cartagena.jpeg";
import medellin from "../images/medellin.jpg";
import Fab from "@mui/material/Fab";
import "../scss/cards.scss";
import "../scss/layout.scss";

function StepFour({ data, update, goBackPage, setPage }) {
  return (
    <div className="container">
      <div className="section-title">
        <p>
          We have instructors in Medellin, Cali, Cartagena & Bogotá, so you can
          pick a location below. Note that if you’re planning to visit and take
          classes in multiple cities, you can use the live chat feature in the
          bottom right corner for a custom quote.
        </p>
      </div>

      <div className="cards_container">
        <div
          className="card tall-card"
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
          className="card tall-card"
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
          <div className="card_name">Bogota</div>
        </div>
        <div
          className="card tall-card"
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
          <div className="card_name">Medellin</div>
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
      <Grid xs={12} item container justifyContent="center">
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          onClick={() => goBackPage()}
        >
          Go Back
        </Fab>
      </Grid>
    </div>
  );
}

export default StepFour;
