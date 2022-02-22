import online from "../images/online.jpg";
import studio from '../images/studio.jpg';
import "../scss/cards.scss"
import "../scss/layout.scss"



function StepOne({ update, setPage  }) {
  return (

    <div className="container">
      <div className="section-title">
          <p>
          Regular classes are done at home or at a studio location. Online classes via Zoom are a popular option for students that are not in Colombia yet, or have already left the country. Learn more here. 

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
                Online
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
                Studio
            </div>
          </div>
        </div>
      </div>
  );
}

export default StepOne;
