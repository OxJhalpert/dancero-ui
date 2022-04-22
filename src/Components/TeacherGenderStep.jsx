import Grid from "@mui/material/Grid";
import man from "../images/man.png";
import woman from "../images/woman.png";
import Fab from "@mui/material/Fab";
import goBackIcon from "../images/go-back.png"
import "../scss/step.scss";
import "../scss/layout.scss";

function StepTwo({ data, update, goBackPage, setPage }) {
  return (
    <div className="container flex-container">
      <div className="section-title">
        <p>
          Would you prefer to learn from a man or a woman? An instructor from
          the opposite sex is typically better for couple dancing, while an
          instructor from the same sex is ideal for solo dancing.
        </p>
      </div>
      <div className="cards_container">
        <div
          className="card tall-card"
          onClick={() => update("Gender", "Woman")}
        >
          <div className="card_image">
            <img src={woman} />
          </div>
          <div className="card_name">Woman</div>
        </div>

        <div className="card tall-card" onClick={() => update("Gender", "Man")}>
          <div className="card_image">
            <img src={man} />
          </div>
          <div className="card_name">Man</div>
        </div>
      </div>
      <div className="go-back">
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          onClick={() => {
            if (data.Venue === "Online") {
              setPage(3);
            }
            goBackPage();
          }}
        >
          <img src={goBackIcon} alt="" /> 
          Back 
        </Fab>
      </div>
    </div>
  );
}
export default StepTwo;
