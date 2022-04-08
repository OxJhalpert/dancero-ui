import Grid from "@mui/material/Grid";
import salsa from "../images/salsa.png";
import otherImg from "../images/other.png";
import bachata from "../images/bachata.png";
import kizomba from "../images/kizomba.png";
import Fab from "@mui/material/Fab";
import goBackIcon from "../images/go-back.png"
import "../scss/cards.scss";
import "../scss/layout.scss";

function StepThree({ update, goBackPage }) {
  return (
    <div className="container flex-container">
      <div className="section-title">
        <p>
          We can find instructors for pretty much any dance style, and even sub-styles specialists (for instance Salsa Cali-style, Cuban Salsa, Dominican Bachata etc.) If the dance style you’re looking for is not listed below or you’d like something more specific, just <b> use the chat feature </b>in the bottom right corner to let us know.
 
        </p>
      </div>
      <div className="cards_container">
        <div className="card" onClick={() => update("Musical_gender", "Salsa")}>
          <div className="card_image">
            <img src={salsa} />
          </div>
          <div className="card_name">Salsa</div>
        </div>
        <div
          className="card"
          onClick={() => update("Musical_gender", "Bachata")}
        >
          <div className="card_image">
            <img src={bachata} />
          </div>
          <div className="card_name">Bachata</div>
        </div>
        <div
          className="card"
          onClick={() => update("Musical_gender", "Kizomba")}
        >
          <div className="card_image">
            <img src={kizomba} />
          </div>
          <div className="card_name">Kizomba</div>
        </div>
        <div
          className="card"
          onClick={() => update("Musical_gender", "Something else")}
        >
          <div className="card_image">
            <img src={otherImg} />
          </div>
          <div className="card_name">Something else</div>
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
export default StepThree;
