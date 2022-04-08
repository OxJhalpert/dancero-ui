import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import goBackIcon from "../images/go-back.png"
import hourSelectedIcon from "../images/hour-selected.png"
import "../scss/hours-step.scss"
import "../scss/cards.scss";
import "../scss/layout.scss";

import fiveHours from "../images/five-hours.png"
import tenHours from "../images/ten-hours.png"
import fifteenHours from "../images/fifteen-hours.png"
import twentyHours from "../images/twenty-hours.png"
import twentyFiveHours from "../images/twenty-five-hours.png"
import thirtyHours from "../images/thirty-hours.png"
import fourtyHours from "../images/fourty-hours.png"
import fiftyHours from "../images/fifty-hours.png" 

function StepEigth({ update, goBackPage }) {
  return (
    <div className="container flex-container">
      <div className="section-title">
        <p>
        How many hours would you like to book now? While you can always book more later, we’ve implemented a significant discount for bigger packs. If you’re sure you want to dance a lot, we recommend to book for more hours from the get-go to lower your price per hour. 
        </p>
        <p>
          We also have other formats available, such as <a href={"https://salsaclasses.co/holidays/"}>holidays</a>,  <a href={"https://salsaclasses.co/night/"}>nights</a>, <a href={"https://salsaclasses.co/memberships/"}>memberships</a>, <a href={"https://salsaclasses.co/choreo/"}>choreo</a>. You can use the live chat feature in the bottom right corner if you’d like a custom quote.
        </p>
      </div>

      <div className="hours_list">
        <div
          className="hours_list-item "
          
        >
          <div className="list-item_hours-number" onClick={() => update("Hours", "5")}>
            <img src={fiveHours} alt="" />
            <div>5</div> 
          </div>
          <div className="list-item_line list-item_line-firts"></div>
        </div>

        <div
          className="hours_list-item "
        >
          <div className="list-item_hours-number" onClick={() => update("Hours", "10")}>
          <img src={tenHours} alt="" />
            <div>10</div>
          </div>
          <div className="list-item_line"></div>
        </div>

        <div
          className="hours_list-item "
          
        >
          <div className="list-item_hours-number" onClick={() => update("Hours", "15")}>
            <img src={fifteenHours} alt="" />
            <div>15</div> 
          </div>
          <div className="list-item_line"></div>
        </div>

        <div
          className="hours_list-item "
        >
          <div className="list-item_hours-number" onClick={() => update("Hours", "20")}>
            <img src={twentyHours} alt="" />
            <div>20</div> 
          </div>
          <div className="list-item_line"></div>
        </div>

        <div
          className="hours_list-item "
        >
          <div className="list-item_hours-number" onClick={() => update("Hours", "25")}>
            <img src={twentyFiveHours} alt="" />
            <div>25</div>
          </div>
          <div className="list-item_line"></div>
        </div>

        <div
          className="hours_list-item "
        >
          <div className="list-item_hours-number" onClick={() => update("Hours", "30")}>
            <img src={thirtyHours} alt="" />
            <div>30</div>
          </div>
          <div className="list-item_line"></div>
        </div>

        <div
          className="hours_list-item "
        >
          <div className="list-item_hours-number" onClick={() => update("Hours", "40")}>
              <img src={fourtyHours} alt="" />
              <div>40</div>
          </div>
          <div className="list-item_line"></div>
          
        </div>

        <div
          className="hours_list-item "
        >
          <div className="list-item_hours-number" onClick={() => update("Hours", "50")}>
            <img src={fiftyHours} alt="" />
            <div>50</div> 
          </div>
          <div className="list-item_line list-item_line-last"></div>
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

export default StepEigth;
