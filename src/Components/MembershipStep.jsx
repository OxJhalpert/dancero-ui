import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";
import Fab from "@mui/material/Fab";
import "../scss/cards.scss";
import "../scss/layout.scss";

function StepSix({ update, goBackPage }) {
  return (
    <div className="container">
      <div className="section-title">
        <p>
          The basic service connects you to an instructor that matches the
          requirements. The standard service is a bit more expensive but you
          have the freedom to switch up your instructors. And with the premium
          option, you get a concierge service to help you book taxis, hotels,
          tours or anything else you need during your trip.{" "}
          <a href={"https://salsaclasses.co/packs/"}>Lear more here.</a>
        </p>
      </div>

      <div className="cards_container">
        <div className="card" onClick={() => update("Service", "Basic")}>
          <div className="card_image">
            <DoneIcon />
          </div>
          <div className="card_name">Basic</div>
        </div>

        <div className="card" onClick={() => update("Service", "Standard")}>
          <div className="card_image">
            <StarIcon />
          </div>
          <div className="card_name">Standard</div>
        </div>

        <div className="card" onClick={() => update("Service", "Premium")}>
          <div className="card_image">
            <DiamondIcon />
          </div>
          <div className="card_name">Premium</div>
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

export default StepSix;
