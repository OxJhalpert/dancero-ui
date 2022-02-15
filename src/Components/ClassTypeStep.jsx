import online from "../images/online.jpg";
import studio from '../images/studio.jpg';
import "../scss/cards.scss"
import "../scss/layout.scss"



function StepOne({ update, setPage  }) {
  return (

    <div className="container">
      <div className="section-title">
          <h2>
            Welcome to Dancero wizard, please select one of the following
            options :
          </h2>
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
