import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import UstToken from "../abis/UstToken.json";
import UsdtToken from "../abis/UsdtToken.json";
import UsdcToken from "../abis/UsdcToken.json";
import getPriceAndCostCalculation from "./utils";
import { useEffect, useState } from "react";
import React from "react";
import Fab from "@mui/material/Fab";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../scss/layout.scss";
import "../scss/board.scss";

import config from "../config.json";


function createData(name, option, name2, option2) {
  return { name, option, name2, option2 };
}

function StepNine({
  data,
  update,
  connect,
  transferToken,
  goBackPage,
  firebaseConfig,
}) {
  const app = initializeApp(firebaseConfig);
  var firestoreDB = getFirestore(app);
  const [exchangeRatio, setexchangeRatio] = useState();
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
  const [priceSend, setPriceSend] = useState(0);
  const [costHour, setCostHour] = useState(0);
  const [costUsd, setCostUsd] = useState(0);
  const [pricePerHour, setPricePerHour] = useState(0);


  

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

  function peticionUrl (){
    var peticion =
     config.URL_BASE + 
     "/"+data.user+"/nft/0x40D966D7e51f15F830A57bC0D774DF5304EBc90D?chain=mumbai&format=decimal&limit=93353163";
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
        if(data.result.length === 0){
          return
        }else {
          setNFTCodes(data.result);
          var test = data.result[19];
          SetNFTSelected(data.result[19]);
          test = JSON.parse(test.metadata);
          var test2 = test.image;
          test2=test2.substr(6,test2.length)
          test2= "https://gateway.pinata.cloud/ipfs/"+ test2
          setImgNFT(test2)
        }
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

    fetch(config.SEND_MAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data : data,
        exchangeRatio : exchangeRatio,
        comission : totalCop,
        paymentMethod : "crypto",
        paymentFee : totalCop,
        total: priceS,
        paymentStatus : "received" 
      }),


    })
    fetch(config.SAVEDATA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data : data,
        exchangeRatio : exchangeRatio,
        comission : totalCop,
        paymentMethod : "crypto",
        paymentFee : totalCop,
        total: priceS,
        paymentStatus : "received" 
      }),
    })

    window.location = "http://localhost:3000/success";
    return actions.order.capture();
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
    console.log(cost)
    var priceS = cost[1];
    priceS = RoundTo(priceS, roundTo);
    setPriceS(priceS);
    var costT = cost[0];
    setCostTeacher(costT);
    var roundToHour = priceS / data.Hours
    roundToHour= RoundTo(roundToHour, roundToHours)
    setPriceSend(roundToHour);
    Math.round(priceSend)
    setCostHour(costT/data.hours)
    var dollarFee = priceS / exchangeRate;
    dollarFee = Math.round(dollarFee);
    setDollarFee(dollarFee);
    var rest = cost[1] - cost[0];
    var restUSD = rest / exchangeRatio;
    setCostUsd(restUSD);
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
        data : data,
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
    <div className="container">
      <div className="board_container">
        <div>
          <div className="board_header board_card">
            <div>
              <div>City: {data.City} ({data.place ? (data.place) : ( data.Venue )})</div>
              <div>Service: {data.Service}</div>
              <div>Instructor: {data.Gender}</div>
              <div>Level: {data.Level}</div>
              <div>Dance: {data.Musical_gender}</div>
            </div>
            <div>
              <div>Number of hours: {data.Hours}</div>
              <div>From: {moment(data.dates.dateFrom).format("MMM Do YY")}</div>
              <div>To: {moment(data.dates.dateTo).format("MMM Do YY")}</div>
            </div>
            <div>
              <div>Price per hour: {priceSend} COP</div>
              <div>Total in pesos: {priceS} COP</div>
            </div>
          </div>

          <div className="board_card price_pay">
            <p>
              your total price is {priceS} COP the booking fee to be paid is
              {totalCop} COP o {priceToPay} USD at an exchange rate
              {exchangeRatio} COP per USD. We accept crypto stablecoins (no
              commission), stripe ({config.STRIPE_PERCENTAGE}% )and pay pal (
              {config.PAYPAL_PERCENTAGE}%) the reminding {costTeacher} are paid
              directly in cash to your instructor please check out our terms{" "}
              <a href={"https://salsaclasses.co/packs/"}>here.</a>
            </p>
            <h1>
              <span>Price</span> : {priceToPay ? priceToPay : "..."} USD
            </h1>
            {idDoc ? (
              <div className="pay_methods">
                <div>
                  <Button
                    className="btn"
                    onClick={async (event) => {
                      var amount = priceToPay.toString();
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
                        transferToken(amount, _contractAbi, _addressContract, exchangeRatio,totalCop,priceS,priceSend,dollarfee.toExponential,costHour,costTeacher,costUsd);
                      }
                    }}
                  >
                    crypto
                  </Button>
                  <div className="pay-with">
                    <input
                      type="radio"
                      id="payWithUsdc"
                      name="val"
                      value="payWithUsdc"
                    ></input>
                    <label htmlFor="payWithUsdc">USDC</label>
                    <input
                      type="radio"
                      id="payWithUsdt"
                      name="val"
                      value="payWithUsdt"
                      defaultChecked
                    ></input>
                    <label htmlFor="payWithUsdt">USDT</label>
                    <input
                      type="radio"
                      id="payWithUst"
                      name="val"
                      value="payWithUst"
                    ></input>
                    <label htmlFor="payWithUsdc">UST</label>
                  </div>
                </div>

                <PayPalScriptProvider options={process.env.CLIENT_ID_PAYPAL}>
                  <PayPalButtons
                    className="paypal-btn"
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => createOrder(data, actions)}
                    forceReRender={[idDoc]}
                    onApprove={(data, actions) => onApprove(data, actions)}
                  />
                </PayPalScriptProvider>
                <Button className="btn" onClick={payWithStripe}>
                  Pay with stripe
                </Button>
              </div>
            ) : (
              <CardContent> Loading </CardContent>
            )}

            <p>
              Upon completing your payment, please use the live chat feature in
              the bottom right corner to message your phone number (or Whatsapp)
              to our team, so we can share it with your instructor, who will
              usually message you the same day. Feel free to use that same live
              chat at any time before or after payment to communicate with us.
            </p>
          </div>

          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => goBackPage()}
          >
            Go Back
          </Fab>
        </div>

        <div className="board_card">
          <p>
            We have launched Dancero, a collection of hand-drawn NFTs trading on
            several blockchain ecosystems. The NFTs unlock a long list of
            exclusive benefits to their owners, including free access to classes
            and bootcamps, and can even be rented out for passive income.{" "}
            <a href="">Learn more.</a>
          </p>

          {imgNFT ? (
            <img
            sx={{ my: "100rem" }}
            className="nft-img"
            src={imgNFT}
            width="300"
            heigth="300"
            alt="DanceroNFT"
          />
          ) : (
            <p>
              connect a web3 wallet to view your dancero nft. you don't have any
              dancero nft in your wallet but you can purchase one{" "}
              <a href={"https://salsaclasses.co/packs/"}>here.</a>
            </p>
          )
          }

          <p>
            You will soon be able to stake your NFT to apply an automatic
            discount. <a href="">Learn more.</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepNine;
