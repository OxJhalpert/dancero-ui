import online from "../images/online.png";
import studio from '../images/regular.png';
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import "../scss/cards.scss"
import "../scss/layout.scss"



function StepOne({ update, setPage, goBackPage }) {
  return (
    <div className="container flex-container">
      <div className="section-title">
        <p>
          <b>In-person classes are done at home or at a local studio.</b> Online classes via Zoom are a popular option for students that are not in Colombia, or have already left the country. <a href=""> Learn more.</a> 
        </p>
      </div>
      <div className="cards_container">
        <div className="card" 
          onClick={() => {
            // setPage(3) 
            update("Venue", "Online")}}> 
          <div className="card_image">
            <img src={online}/>
          </div>
          <div className="card_name">
              Online classes
          </div>
        </div>
        <div className="card"
          sx={{ maxWidth: 300 }}
          onClick={() =>   
          update("Venue", "Offline")}
          
        >
          <div className="card_image">
            <img src={studio}/>
          </div>
          <div className="card_name">
              Regular classes
          </div>
        </div>
      </div>
      <div className="go-back">
        
      </div>
    </div>
  );
}

export default StepOne;
