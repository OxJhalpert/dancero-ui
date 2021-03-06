import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import UstToken from "../abis/UstToken.json";
import UsdtToken from "../abis/UsdtToken.json";
import UsdcToken from "../abis/UsdcToken.json";
import getPriceAndCostCalculation from "./utils";
import { useEffect, useState } from "react";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../scss/layout.scss";
import "../scss/board.scss";
import Fab from "@mui/material/Fab";
import config from "../config.json";

import nftImg from "../images/NFT-img.png"
import connectWallet from "../images/connectwallet.png"
import nftconnect from "../images/nftconnect.png"


import questionMark from "../images/question-mark.png"


import cityIcon from "../images/city.png"
import serviceIcon from "../images/service.png"
import levelIcon from "../images/level.png"
import genderIcon from "../images/gender.png"
import hoursNumberIcon from "../images/hours-number.png"
import danceIcon from "../images/dance.png"
import dateFromIcon from "../images/date-from.png"
import dateToIcon from "../images/date-to.png"
import pricePerHourIcon from "../images/price-per-hour.png"
import totalInPesosIcon from "../images/total-in-pesos.png"
import totalInDolarsIcon from "../images/total-in-dolars.png"
import goBackIcon from "../images/go-back.png"

function createData(name, option, name2, option2) {
  return { name, option, name2, option2 };
}

function StepNine({
  data,
  update,
  connect,
  transferToken,
  goBackPage,
}) {

  const [exchangeRatio, setexchangeRatio] = useState();
  const [imgNFT, setImgNFT] = useState("");
  const [nftcodes, setNFTCodes] = useState([]);
  const [nftSelected, SetNFTSelected] = useState([]);
  const [priceToPay, setPriceToPay] = useState(0);
  const [totalCop, setTotalCop] = useState(0);
  const [totalStripe, setTotalStripe] = useState(0);
  const [dollarfee, setDollarFee] = useState(0);
  const [costTeacher, setCostTeacher] = useState(0);
  const [priceS, setPriceS] = useState(0);
  const [priceSend, setPriceSend] = useState(0);
  const [costHour, setCostHour] = useState(0);
  const [payCrypto, setPayCrypto] = useState(0);
  const [nftMetadata, setNftMetadata] = useState("");
  const [costUsd, setCostUsd] = useState(0);
  const [pricePerHour, setPricePerHour] = useState(0);
  var totalPaypal ='';
  var dataSend = data;
  const [priceTotalCop,setpriceTotalCop] = useState(0);
  const [priceHoursCop,setpriceHoursCop] = useState(0);
  const [comissionCop,setcomissionCop] = useState(0);
  const [costTeacherCop,setcostTeacherCop] = useState(0);
  //sendpaypal
  var costUsdpaypal="";
  var priceSendpaypal="";
  var costHourpaypal="";
  var costTeacherpaypal = "";
  var dollarfeepaypal="";
  var exchangeRatiopaypal="";
  var totalCoppaypal="";
  var priceSpaypal="";
 

  function getExchangeRate() {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setexchangeRatio(res.rates.COP);
        exchangeRatiopaypal=res.rates.COP;
        calculatePrice(res.rates.COP);
      });
  }


  useEffect(() => {
    getExchangeRate();
    currencyCop()
  }, [setexchangeRatio]);


  const header = {
    "X-API-Key":"2jGZArUpQi7ShuA7xONTt8THMikH6zZVoeL0Mp8nVW06Td4zWznTdU7IodyoNmV6 ",
  };

  const inicio = {
    method: "GET",
    headers: header,
    mode: "cors",
    cache: "default",
  };

  function peticionUrl (){
    var peticion = config.URL_BASE +"/"+data.user+"/nft?chain=mumbai&format=decimal&limit=100&token_addresses="+config.contract_Adress
    return peticion
  }

  useEffect(() => {
    if (data.user == "") {
      return;
    }
    var peticion = peticionUrl();
    fetch(peticion, inicio)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.result)
        if(data.result.length === 0){
          setImgNFT(nftconnect)
        }else {
          setNFTCodes(data.result);
          var test = data.result[1];
          var test = JSON.parse(test.metadata)
          setNftMetadata(test)
          var test = test.image
          test = test.substr(6,test.length)
          var test2 ="https://gateway.pinata.cloud/ipfs/"+ test
          // console.log(test2)
          setImgNFT(test2) 
        }
      });
  }, [data.user]);
  
  const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function formatDate (date){
    let formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
    return formatted_date;
}
  var initialDate= formatDate(data.dates.dateFrom)
  var finalDate= formatDate(data.dates.dateTo)

  const rows = [
    createData(<b>Date from</b>, initialDate, <b>City</b>, data.City),
    createData(<b>Date to</b>, finalDate, <b>Service Type</b>, data.Service),
    createData(<b>Venue</b>, data.Venue, <b>Level</b>, data.Level),
    createData(
      <b>Teacher Gender</b>,
      data.Gender,
      <b>Hours Pack</b>,
      data.Hours
    ),
    createData(<b>Musical genre</b>, data.Musical_gender),
  ];

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPaypal.toString(),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    // console.log(data)
    fetch(config.SEND_MAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data : dataSend,
        costUsd: costTeacherpaypal,
        priceSendHour: priceSendpaypal,
        costHour: costHourpaypal,
        costTeacher: costTeacherpaypal,
        totalDollar:dollarfeepaypal,
        exchangeRatio : exchangeRatiopaypal,
        comission : costUsdpaypal,
        paymentMethod : "paypal",
        paymentFee : totalCoppaypal,
        total: priceSpaypal,
        paymentStatus : "received"
      }),


    })

    fetch(config.SAVEDATA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data : dataSend,
        costUsd: costTeacherpaypal,
        priceSendHour: priceSendpaypal,
        costHour: costHourpaypal,
        costTeacher: costTeacherpaypal,
        totalDollar:dollarfeepaypal,
        exchangeRatio : exchangeRatiopaypal,
        comission : costUsdpaypal,
        paymentMethod : "paypal",
        paymentFee : totalCoppaypal,
        total: priceSpaypal,
        paymentStatus : "received"
      }),
    })

    window.location =  config.SUCCESS_PAGE;
    return actions.order.capture();
  };

  function currencyCop(number){
    return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 0}).format(number);
  };

  function currencyDollar(number){
    return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(number);
  };

  async function calculatePrice(exchangeRate) {
    const roundTo = 5000;
    const roundToHours =1000;
    var cost = getPriceAndCostCalculation(
      data.Service,
      data.Level,
      data.Hours,
      data.City,
      data.Venue,
      data.place,
      0
    );
    var priceS = cost[1];
    priceS = RoundTo(priceS, roundTo);
    priceSpaypal=priceS;
    setPriceS(priceS);
    var costT = cost[0];
    costTeacherpaypal=costT;
    setCostTeacher(costT);
    var roundToHour = priceS / data.Hours
    roundToHour= RoundTo(roundToHour, roundToHours)
    priceSendpaypal=roundToHour;
    setPriceSend(roundToHour);
    Math.round(priceSend)

    var dif = costT/data.Hours
    costHourpaypal=dif;
    setCostHour(dif)
    var dollarFee = priceS / exchangeRate;
    dollarFee = Math.round(dollarFee);
    dollarfeepaypal=dollarFee;
    setDollarFee(dollarFee);
    var rest = cost[1] - cost[0];
    var restUSD = rest / exchangeRate;
    var totalCopRound = RoundTo(rest, roundTo);
    totalCoppaypal=totalCopRound;
    setTotalCop(totalCopRound);
    costUsdpaypal=restUSD;
    setCostUsd(restUSD)

    rest = totalCopRound / exchangeRate;
    rest = Math.round(rest);
    var restStripe = (rest * config.STRIPE_PERCENTAGE) / 100;
    var restPaypal = (rest * config.PAYPAL_PERCENTAGE) / 100;
    restPaypal = restPaypal+rest;
    restPaypal= Math.round(restPaypal)
    totalPaypal=restPaypal;
    setTotalStripe(restStripe + rest);
    setPayCrypto(rest);
    rest=currencyDollar(rest)
    setPriceToPay(rest);
     setpriceTotalCop(currencyCop(priceS));
     setpriceHoursCop(currencyCop(roundToHour));
     setcomissionCop(currencyCop(totalCopRound));
     setcostTeacherCop(currencyCop(costT));

  }

  function RoundTo(number, roundTo) {
    return roundTo * Math.ceil(number / roundTo);
  }

  const payWithStripe = () => {
    fetch(config.STRIPE_CHECKOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data : data,
        items: [
          {
            name: "Pack Of " + data.Hours + " Hours",
            quantity: 1,
            priceInCents: totalStripe * 100,
          },
        ],
      }),
    })
      .then((res) => {
        // console.log(res);
        if (res.ok){
          fetch(config.SEND_MAIL_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data : dataSend,
              costUsd: costTeacher,
              priceSendHour: priceSend,
              costHour: costHour,
              costTeacher: costTeacher,
              totalDollar:dollarfee,
              exchangeRatio : exchangeRatio,
              comission : costUsd,
              paymentMethod : "stripe",
              paymentFee : totalCop,
              total: priceS,
              paymentStatus : "received"
            }),
          });
          fetch(config.SAVEDATA_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data : dataSend,
              costUsd: costTeacher,
              priceSendHour: priceSend,
              costHour: costHour,
              costTeacher: costTeacher,
              totalDollar:dollarfee,
              exchangeRatio : exchangeRatio,
              comission : costUsd,
              paymentMethod : "stripe",
              paymentFee : totalCop,
              total: priceS,
              paymentStatus : "received"
            }),
          });
          return res.json();
        }
         
        return res.json().then((json) => Promise.reject(json));
  
      })
      .then(({ url }) => {
        window.open(url,'targetWindow',
                                   `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=yes,
                                    width=600,
                                    height=600`);
        return false;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
      <div className="board_container">
        <div className="board-body">
          <div className="board_header">

            <div className="board_header-col">
              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    City: 
                  </div>
                  <div className="board_header-item_res">{data.City} ({data.place ? (data.place):(data.Venue)})</div>
                </div>
                <img src={cityIcon} className="board_header-item_icon"/>
              </div>
            
              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">Service: </div>
                  <div className="board_header-item_res">{data.Service}</div>
                </div>
                <img src={serviceIcon} className="board_header-item_icon"/>
              </div>
              
              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    Level: 
                  </div>
                  <div className="board_header-item_res">{data.Level}</div>
                </div>
                <img src={levelIcon} className="board_header-item_icon"/>
              </div>

              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    Instructor: 
                  </div>
                  <div className="board_header-item_res">{data.Gender}</div>
                </div>
                <img src={genderIcon} className="board_header-item_icon"/>
              </div>
            </div>

            <div className="board_header-col">

              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    Number of hours: 
                  </div>
                  <div className="board_header-item_res">{data.Hours}</div>
                </div>
                <img src={hoursNumberIcon} className="board_header-item_icon"/>
              </div>

              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    Dance:
                  </div>
                  <div className="board_header-item_res">
                    {data.Musical_gender}
                  </div>
                </div>
                <img src={danceIcon} className="board_header-item_icon"/>
              </div>
              
              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    From:
                  </div>
                  <div className="board_header-item_res">{initialDate}</div>
                </div>
                <img src={dateFromIcon} className="board_header-item_icon"/>
              </div>

              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div  className="board_header-item_name"> To: </div>
                  <div className="board_header-item_res"> {finalDate}</div>
                </div>
                <img src={dateToIcon} className="board_header-item_icon"/>
              </div>
              
            </div>

            <div className="board_header-col last-col">

            <div className="board_header-item item-8">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    Price per hour:
                  </div>
                  <div className="board_header-item_res">{priceHoursCop} COP</div>
                </div>

                <img src={pricePerHourIcon} className="board_header-item_icon last-icons"/>
              </div>
              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    Total in pesos:
                  </div>
                  <div className="board_header-item_res"> {priceTotalCop} COP</div>
                </div>
                <img src={totalInPesosIcon} className="board_header-item_icon last-icons"/>
              </div>
              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item-name">
                      Booking fee:
                  </div>
                  <div className="board_header-item_res">
                      {priceToPay ? priceToPay : "..."} USD  
                  </div>
                </div>
                <img src={totalInDolarsIcon} className="board_header-item_icon last-icons" />
              </div>
            </div>
          </div>
          
            <div className="go-back-section">
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
            <p>
              Your total price is <span> {priceTotalCop} COP</span>. The booking fee to be paid is 
              <span> {comissionCop} COP</span> or <span> {priceToPay} USD </span> at an exchange rate
              <span> ${exchangeRatio} </span> COP per USD. We accept <span>crypto stablecoins (no
              commission), Stripe ({config.STRIPE_PERCENTAGE}% commission) and Paypal ({config.PAYPAL_PERCENTAGE}% commission)</span>.
              The reminding <span> {costTeacherCop} </span> are paid
              directly in cash to your instructor please check out our terms
              <a href={"https://salsaclasses.co/packs/"}> here.</a>
            </p>
            
              <div>
              <div className="pay_methods">
                <div className="pay_method">
                    
                  <Button
                    className="btn pay_method-button"
                    onClick={async (event) => {
                      var amount = payCrypto.toString();
                      var _contractAbi = "";
                      var _addressContract = "";

                      var ele = document.getElementsByName("val");
                      var radiusValue = "";
                      for (var i = 0; i < ele.length; i++) {
                        if (ele[i].checked) radiusValue = ele[i].value;
                      }
                      connect();
                      if (radiusValue !== "") {
                        if (radiusValue === "payWithUst") {
                          _contractAbi = UstToken.abi;
                          _addressContract =
                            config.UST_TOKEN;
                        } else if (radiusValue === "payWithUsdt") {
                          _contractAbi = UsdtToken.abi;
                          _addressContract =
                            config.USDT_TOKEN;
                        } else if (radiusValue === "payWithUsdc") {
                          _contractAbi = UsdcToken.abi;
                          _addressContract =
                            config.USDC_TOKEN;
                        }
                        transferToken(amount, _contractAbi, _addressContract, exchangeRatio,totalCop,priceS,priceSend,dollarfee,costHour,costTeacher,costUsd);

                      }
                    }}
                  >
                    
                    Crypto
                  </Button>
                  <div className="pay_method-info">
                      <div className="pay_method-info_bubble-floor">
                        <div className="pay_method-info_bubble" id="div2" >
                          You can pay with crypto stablecoin by connecting the Metamask.Chrome extension to the Binance Smart Chain.                          
                        </div>
                      </div>
                      <div className="pay_method-info_button" id="activatordiv1" onMouseEnter={() => {
                        document.getElementById('div2').style.visibility='visible'
                      }} onMouseLeave={() => {
                        document.getElementById('div2').style.visibility='hidden'
                      }}><img src={questionMark} /></div>
                    </div>
                </div>
                <div className="pay_method">  
                  <PayPalScriptProvider options={{ "client-id": 'AZ_pHxZ5pX49S7HZiMyyKdXlFlqHNw7Y2bNSzC179lga0VqK1gNeY1PIp7iqCR0iBCgvp_gBU7xAnDGN' }} >
                    <PayPalButtons
                      className="paypal-btn"
                      style={{ layout: "horizontal",
                                tagline: false,
                                height: 55
                      }}
                      createOrder={(data, actions) => createOrder(data, actions)}
                      // forceReRender={[priceS]}
                      onApprove={(data, actions) => onApprove(data, actions)}
                    />
                  </PayPalScriptProvider>
                  <div className="pay_method-info"  >
                      <div className="pay_method-info_bubble-floor">
                        <div className="pay_method-info_bubble" id="div1" >
                          We charge {config.STRIPE_PERCENTAGE}% fee for Stripe payments, which covers the Stripe commission for payment processing and conversion into Colombian pesos. 
                        </div>
                      </div>
                      <div className="pay_method-info_button" onMouseEnter={() => {
                        document.getElementById('div1').style.visibility='visible'
                      }} onMouseLeave={() => {
                        document.getElementById('div1').style.visibility='hidden'
                      }} ><img src={questionMark}  /></div>
                    </div>
                </div>
                <div className="pay_method">
                  
                  <Button className="btn pay_method-button" onClick={payWithStripe}>
                    Stripe
                  </Button>
                  
                  <div className="pay_method-info">
                    <div className="pay_method-info_bubble-floor">
                      <div className="pay_method-info_bubble" id="div3">
                        We charge {config.PAYPAL_PERCENTAGE}% fee for Stripe payments, which covers the Stripe commission for payment processing and conversion into Colombian pesos. 
                      </div>
                    </div>
                    <div className="pay_method-info_button"
                    onMouseEnter={() => {
                      document.getElementById('div3').style.visibility='visible'
                    }} onMouseLeave={() => {
                      document.getElementById('div3').style.visibility='hidden'
                    }}><img src={questionMark} /></div>
                  </div>
                </div>
              </div>


              <div className="pay-with">

                <div>
                  <input
                    type="radio"
                    id="payWithUsdc"
                    name="val"
                    value="payWithUsdc"
                  ></input>
                  <label htmlFor="payWithUsdc">USDC</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="payWithUsdt"
                    name="val"
                    value="payWithUsdt"
                    defaultChecked
                  ></input>
                  <label htmlFor="payWithUsdt">USDT</label>
                </div>
                <div>

                <input
                  type="radio"
                  id="payWithUst"
                  name="val"
                  value="payWithUst"
                ></input>
                <label htmlFor="payWithUst">UST</label>
                </div>

                </div>
                
              </div>

            <p className="secondary-text">
            Upon completing your payment, please use the live chat feature in the bottom right corner to message your phone number (or Whatsapp) to our team, so we can share it with your instructor, who will usually message directly the same day. Feel free to use the live chat at any time before or after payment to communicate with us.
            </p>
        </div>
        <aside>
          <div className="aside">
            <div>
              <p className="secondary-text">
                We have launched Dancero, a collection of hand-drawn NFTs trading on several blockchain ecosystems. 
                The NFTs unlock a long list of exclusive benefits to their owners, including free access to classes and bootcamps, and can even be rented out for passive income. <a href="https://dancero.io/">Learn more</a>
              </p>
            </div>
            
            
            {imgNFT ? (
              <div  className="nft-img" >
                <img
                src={imgNFT}
                alt="DanceroNFT"
                />
            </div>
            ) : (
              <div  className="nft-img">
              <img
              src={connectWallet}
              alt="DanceroNFT"
              />
          </div>
            )
            }
            <div>
              <h2>Dancero # {nftMetadata.edition}</h2>
              <p>
                You will soon be able to stake your NFT to apply an automatic
                discount. <a href="https://dancero.io/">Learn more</a>
              </p>
            </div>
          </div>
        </aside>
      </div>
  );
}

export default StepNine;
