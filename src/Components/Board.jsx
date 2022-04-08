import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import UstToken from "../abis/UstToken.json";
import UsdtToken from "../abis/UsdtToken.json";
import UsdcToken from "../abis/UsdcToken.json";
import getPriceAndCostCalculation from "./utils";
import { useEffect, useState } from "react";
import danceNFT from "../abis/danceNFT.json";
import React from "react";
import Fab from "@mui/material/Fab";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../scss/layout.scss";
import "../scss/board.scss";

import config from "../config.json";
import ImgNftCharge from "./ImgNftCharge";
import nftImg from "../images/NFT-img.png"
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

function createData(name, option, name2, option2) {
  return { name, option, name2, option2 };
}

function StepNine({
  data,
  connect,
  transferToken,
  goBackPage,
  firebaseConfig,
  account,
}) {
  var firebaseConfig = firebaseConfig;
  const app = initializeApp(firebaseConfig);
  var firestoreDB = getFirestore(app);

  const [exchangeRatio, setexchangeRatio] = useState();
  // const [imgNFT, setImgNFT] = useState("https://via.placeholder.com/150");
  const [imgNFT, setImgNFT] = useState("");

  const [nftcodes, setNFTCodes] = useState([]);
  const [nftSelected, SetNFTSelected] = useState([]);
  const [priceToPay, setPriceToPay] = useState(0);
  const [totalCop, setTotalCop] = useState(0);
  const [idDoc, setIdDoc] = useState(null);
  const [totalPaypal, setTotalPaypal] = useState(0);
  const [totalStripe, setTotalStripe] = useState(0);
  const [dollarfee, setDollarFee] = useState(0);
  const [costTeacher, setCostTeacher] = useState(0);
  const [priceS, setPriceS] = useState(0);

  function getExchangeRate() {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setexchangeRatio(res.rates.COP);
        calculatePrice(res.rates.COP);
      });
  }

  useEffect(() => {
    storeTransaction();
    getExchangeRate();
  }, [setexchangeRatio]);

  const header = {
    "X-API-Key":
      "2jGZArUpQi7ShuA7xONTt8THMikH6zZVoeL0Mp8nVW06Td4zWznTdU7IodyoNmV6",
  };

  const inicio = {
    method: "GET",
    headers: header,
    mode: "cors",
    cache: "default",
  };

  var peticion =
    config.URL_BASE +
    "/0x5603D86d741535da15C4b2c12BFcC59ef601E3b9/nft/0x40D966D7e51f15F830A57bC0D774DF5304EBc90D?chain=mumbai&format=decimal&limit=93353163";
    // "/0x5603D86d741535da15C4b2c12BFcC59ef601E3b9/nft/0x21777E1e13e0796524cA3F5Dd21a927E4E6fF8db?chain=mumbai&format=decimal&limit=93353163";
  //  peticion = peticion.replace("0x5603D86d741535da15C4b2c12BFcC59ef601E3b9",data.user)
  //  console.log(peticion)

  useEffect(() => {
    if (data.user == "") {
      return;
    }
    fetch(peticion, inicio)
      .then((response) => response.json())
      .then((data) => {
        setNFTCodes(data.result);
        var test = data.result[19];
        // console.log(test);
        SetNFTSelected(data.result[19]);
        test = JSON.parse(test.metadata);
        console.log(test);
        var test2 = test.image;
        // var test2 = test.token_uri
        test2=test2.substr(6,test2.length)
        console.log(test2)
        test2= "https://gateway.pinata.cloud/ipfs/"+ test2
        // console.log("soy la url "+test2  )
        setImgNFT(test2)
      });
  }, [data.user]);

  var initialDate = moment(data.dates.dateFrom).format("MMM Do YY");
  var finalDate = moment(data.dates.dateTo).format("MMM Do YY");
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
          description: idDoc.toString(),
          amount: {
            value: totalPaypal.toString(),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    // setOpen(true);
    window.location = "http://localhost:3000/success";
    return actions.order.capture();
  };

  async function calculatePrice(exchangeRate) {
    const roundTo = 5000;
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
    setPriceS(priceS);
    var costT = cost[0];
    setCostTeacher(costT);
    var comission = priceS - costT;
    // setComission(comission)
    var dollarFee = comission / exchangeRate;
    dollarFee = Math.round(dollarFee);
    setDollarFee(dollarFee);
    var rest = cost[1] - cost[0];
    var totalCopRound = RoundTo(rest, roundTo);
    setTotalCop(totalCopRound);

    rest = totalCopRound / exchangeRate;
    rest = Math.round(rest);
    var restStripe = (rest * config.STRIPE_PERCENTAGE) / 100;
    var restPaypal = (rest * config.PAYPAL_PERCENTAGE) / 100;
    setTotalPaypal(restPaypal + rest);
    setTotalStripe(restStripe + rest);
    setPriceToPay(rest);
  }
  function RoundTo(number, roundTo) {
    return roundTo * Math.ceil(number / roundTo);
  }


  async function storeTransaction() {
    var newDoc = await addDoc(collection(firestoreDB, "dateTransfer"), data);
    setIdDoc(newDoc.id);
  }


  const payWithStripe = () => {
    fetch(config.STRIPE_CHECKOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            metadata: idDoc,
            name: "Pack Of " + data.Hours + " Hours",
            quantity: 1,
            priceInCents: totalStripe * 100,
          },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
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
                  <div className="board_header-item_res">{data.City}</div>
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
                  <div className="board_header-item_res">{moment(data.dates.dateFrom).format("MMM Do YY")}</div>
                </div>
                <img src={dateFromIcon} className="board_header-item_icon"/>
              </div>

              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div  className="board_header-item_name"> To: </div>
                  <div className="board_header-item_res"> {moment(data.dates.dateTo).format("MMM Do YY")}</div>
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
                  <div className="board_header-item_res">{priceS / data.Hours} COP</div>
                </div>

                <img src={pricePerHourIcon} className="board_header-item_icon last-icons"/>
              </div>
              <div className="board_header-item">
                <div className="board_header-item_content">
                  <div className="board_header-item_name">
                    Total in pesos:
                  </div>
                  <div className="board_header-item_res"> {totalCop} COP</div>
                </div>
                <img src={totalInPesosIcon} className="board_header-item_icon last-icons"/>
              </div>
            </div>
          </div>
          
            <div className="price">
                Pay: {priceToPay ? priceToPay : "..."} USD
            </div>

            <p>
              Your total price is <span>{priceS}</span> the booking fee to be paid is 
               <span>{totalCop}</span> pesos o <span>{priceToPay}</span> usd at an exchange rate{" "}
              <span>{exchangeRatio}</span> COP per USD. We accept <span>crypto stablecoins (no
              commission), stripe ({config.STRIPE_PERCENTAGE}% )and pay pal (
              {config.PAYPAL_PERCENTAGE}%)</span>. The reminding <span>{costTeacher}</span> are paid
              directly in cash to your instructor please check out our terms{" "}
              <a href={"https://salsaclasses.co/packs/"}>here.</a>
            </p>
            
            {idDoc ? (
              <div>
              <div className="pay_methods">
                <div className="pay_method">
                    <div className="pay_method-info">
                      <div>
                        <div className="pay_method-info_bubble">
                          We charge 5% fee for Stripe payments, which covers the Stripe commission for payment processing and conversion into Colombian pesos. 
                        </div>
                      </div>
                    </div>

                  <div className="pay_method-info_button"><img src={questionMark} /></div>
                  <Button
                    className="btn pay_method-button"
                    onClick={async (event) => {
                      var amount = priceToPay.toString();
                      var _contractAbi = "";
                      var _addressContract = "";

                      var ele = document.getElementsByName("val");
                      var radiusValue = "";
                      for (var i = 0; i < ele.length; i++) {
                        if (ele[i].checked) radiusValue = ele[i].value;
                      }
                      if (data.user == "") {
                        connect();
                      } else {
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
                          transferToken(amount, _contractAbi, _addressContract);
                        }
                      }
                    }}
                  >
                    
                    Crypto
                  </Button>
                  </div>
                  
                <PayPalScriptProvider options={process.env.CLIENT_ID_PAYPAL}>
                  <PayPalButtons
                    className="paypal-btn pay_method-button"
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => createOrder(data, actions)}
                    forceReRender={[idDoc]}
                    onApprove={(data, actions) => onApprove(data, actions)}
                  />
                </PayPalScriptProvider>
                <div className="pay_method">
                  <div className="pay_method-info">
                    <div>
                      <div className="pay_method-info_bubble">
                        We charge 5% fee for Stripe payments, which covers the Stripe commission for payment processing and conversion into Colombian pesos. 
                      </div>
                    </div>
                  </div>
                  <div className="pay_method-info_button"><img src={questionMark} /></div>
                  <Button className="btn pay_method-button" onClick={payWithStripe}>
                    Stripe
                  </Button>
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
                <label htmlFor="payWithUsdc">UST</label>
                </div>

                </div>
                
              </div>
            ) : (
              <CardContent> Loading </CardContent>
            )}

            <p>
              Upon completing your payment, please use the live chat feature in the bottom right comer to message your phone number (or Whatsapp) to our team, so we can share it with your instructor, who will usually message you the same day. Feel free to use the live chat any time before or after payment to communicate with us.
            </p>
        </div>
        <aside>
          <div className="aside">
            <div>
              <p>
                We have launched Dancero, a collection of hand-drawn NFTs trading on several blockchain ecosystems. 
              </p>
              <p>
                The NFTs unlock a long list of exclusive benefits to their owners, including free access to classes and bootcamps, and can even be rented out for passive income. 
                <a href="">Learn more.</a>
              </p>
            </div>
            
            
            {nftImg ? (
              <div  className="nft-img">
                <img
                src={nftImg}
                alt="DanceroNFT"
                />
            </div>
            ) : (
              <div>
                  <p>
                    connect a web3 wallet to view your dancero nft. you don't have any
                    dancero nft in your wallet but you can purchase one{" "}
                    <a href={"https://salsaclasses.co/packs/"}>here.</a>
                  </p>
              </div>
              
            )
            }
            <div>
              <h2>Dancero # 57</h2>
              <p>
                You will soon be able to stake your NFT to apply an automatic
                discount. <a href="">Learn more.</a>
              </p>
            </div>
          </div>
        </aside>
      </div>
  );
}

export default StepNine;
