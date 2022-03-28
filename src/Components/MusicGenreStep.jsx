import Grid from "@mui/material/Grid";
import salsa from "../images/salsa.jpg";
import reggaeton from "../images/reggaeton.jpg";
import bachata from "../images/bachata.jpg";
import kizomba from "../images/Kizomba.jpg";
import Fab from "@mui/material/Fab";
import "../scss/cards.scss";
import "../scss/layout.scss";

function StepThree({ update, goBackPage }) {
  return (
    <div className="container">
      <div className="section-title">
        <h2>Please select the music genre:</h2>
      </div>
      <div className="cards_container">
        <div className="card" onClick={() => update("Musical_gender", "Salsa")}>
          <div className="card_image">
            <img src={salsa} alt="Salsa" />
          </div>
          <div className="card_name">Salsa</div>
        </div>
        <div
          className="card"
          onClick={() => update("Musical_gender", "Bachata")}
        >
          <div className="card_image">
            <img src={bachata} alt="Bachata" />
          </div>
          <div className="card_name">Bachata</div>
        </div>
        <div
          className="card"
          onClick={() => update("Musical_gender", "Kizomba")}
        >
          <div className="card_image">
            <img src={reggaeton} alt="Reggaeton" />
          </div>
          <div className="card_name">Kizomba</div>
        </div>
        <div
          className="card"
          onClick={() => update("Musical_gender", "Something else")}
        >
          <div className="card_image">
            <img src={kizomba} alt="Kizomba" />
          </div>
          <div className="card_name">Something else</div>
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
export default StepThree;
