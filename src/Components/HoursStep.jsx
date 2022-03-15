import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import "../scss/cards.scss";
import "../scss/layout.scss";

function StepEigth({ update, goBackPage }) {
  return (
    <div className="container">
      <div className="section-title">
        <p>
          How many hours would you like to book now? While you can always book
          more later, we’ve implemented a significant discount for bigger packs.
          If you’re sure you want to dance a lot, we recommend to book for more
          hours from the get-go to lower your price per hour. Note that we also
          have other formats available, such as{" "}
          <a href={"https://salsaclasses.co/holidays/"}>holidays</a>,{" "}
          <a href={"https://salsaclasses.co/night/"}>nights</a>,{" "}
          <a href={"https://salsaclasses.co/memberships/"}>memberships</a>,{" "}
          <a href={"https://salsaclasses.co/choreo/"}>choreo</a>. You can use
          the live chat feature in the bottom right corner if you’d like a
          custom quote.
        </p>
      </div>

      <div className="cards_container">
        <div
          className="card short-card only-text"
          onClick={() => update("Hours", "5")}
        >
          <div className="card_name">5</div>
        </div>

        <div
          className="card short-card only-text"
          onClick={() => update("Hours", "10")}
        >
          <div className="card_name">10</div>
        </div>

        <div
          className="card short-card only-text"
          onClick={() => update("Hours", "15")}
        >
          <div className="card_name">15</div>
        </div>

        <div
          className="card short-card only-text"
          onClick={() => update("Hours", "20")}
        >
          <div className="card_name">20</div>
        </div>

        <div
          className="card short-card only-text"
          onClick={() => update("Hours", "25")}
        >
          <div className="card_name">25</div>
        </div>

        <div
          className="card short-card only-text"
          onClick={() => update("Hours", "30")}
        >
          <div className="card_name">30</div>
        </div>

        <div
          className="card short-card only-text"
          onClick={() => update("Hours", "40")}
        >
          <div className="card_name">40</div>
        </div>

        <div
          className="card short-card only-text"
          onClick={() => update("Hours", "50")}
        >
          <div className="card_name">50</div>
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
    </div>
  );
}

export default StepEigth;
