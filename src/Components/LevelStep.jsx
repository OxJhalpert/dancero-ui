import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import semi from "../images/semi.png";
import pro from "../images/pro.png";
import master from "../images/master.png";
import goBackIcon from "../images/go-back.png"

function StepSeven({ update, goBackPage }) {
  return (
    <div className="container flex-container">
      <div className="section-title">
        <p>
          Our pricing takes into account the experience of your instructor.<b>Pro </b> instructors earn a living from dancing: teaching, performing in shows or participating in local competitions.<b> Semi-pros </b> practice and compete, but don't earn a living from dancing.<a>Master </a> are actual champions, and often choreographers as well. The pricing is the lowest with semi-pros and highest with masters.  
        </p>
      </div>

      <div className="cards_container">
        <div className="card" onClick={() => update("Level", "Semi")}>
          <div className="card_image">
            <img src={semi} />
          </div>
          <div className="card_name">Semi</div>
        </div>

        <div className="card" onClick={() => update("Level", "Pro")}>
          <div className="card_image">
            <img src={pro} />
          </div>
          <div className="card_name">Pro</div>
        </div>

        <div className="card" onClick={() => update("Level", "Master")}>
          <div className="card_image">
            <img src={master} />
          </div>
          <div className="card_name">Master</div>
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

export default StepSeven;
