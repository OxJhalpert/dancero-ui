import Fab from "@mui/material/Fab";
import basic from "../images/basic.png";
import standard from "../images/standard.png";
import premium from "../images/premium.png"
import goBackIcon from "../images/go-back.png"
import "../scss/step.scss";
import "../scss/layout.scss";

function StepSix({ update, goBackPage }) {
  return (
    <div className="container flex-container">
      <div className="section-title">
        <p>
        <b>Basic:</b> You’re connected with an instructor that matches the requirements. <b>Standard:</b> You have the freedom to switch up your instructors. <b>Premium:</b> Enjoy a virtual concierge service to help you book taxis, hotels, tours or anything else. <a href={"https://salsaclasses.co/packs/"}> Learn more</a>
        </p>
      </div>

      <div className="cards_container">
        <div className="card" onClick={() => update("Service", "Basic")}>
          <div className="card_image">
            <img src={basic} />
          </div>
          <div className="card_name">Basic</div>
        </div>

        <div className="card" onClick={() => update("Service", "Standard")}>
          <div className="card_image">
            <img src={standard} />
          </div>
          <div className="card_name">Standard</div>
        </div>

        <div className="card" onClick={() => update("Service", "Premium")}>
          <div className="card_image">
            <img src={premium} />
          </div>
          <div className="card_name">Premium</div>
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

export default StepSix;
