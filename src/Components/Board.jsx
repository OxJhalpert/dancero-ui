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
    <div className="container">
      <div className="board_container">
        <div>
          <div className="board_header board_card">
            <div>
              <div>City: {data.City}</div>
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
              <div>Price per hour: {priceS / data.Hours} COP</div>
              <div>Total in pesos: {totalCop} COP</div>
            </div>
          </div>

          <div className="board_card price_pay">
            <p>
              your total price is {priceS} the booking fee to be paid is{" "}
              {totalCop} pesos o {priceToPay} usd at an exchange rate{" "}
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
