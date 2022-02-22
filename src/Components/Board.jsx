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
import {
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Modal from "./Modal";
import "../scss/layout.scss";
import "../scss/board.scss";

import config from "../config.json";

function createData(name, option, name2, option2) {
  return { name, option, name2, option2 };
}

function StepNine({
  data,
  connect,
  transferToken,
  goBackPage,
  firebaseConfig,
}) {
  var firebaseConfig = firebaseConfig;
  const app = initializeApp(firebaseConfig);
  var firestoreDB = getFirestore(app);

  const [exchangeRatio, setexchangeRatio] = useState();
  const [imgNFT, setImgNFT] = useState("https://via.placeholder.com/150");
  const [nftcodes, setNFTCodes] = useState([]);
  const [nftSelected, SetNFTSelected] = useState(null);
  const [priceToPay, setPriceToPay] = useState(0);
  const [totalCop, setTotalCop] = useState(0);
  const [idDoc, setIdDoc] = useState(null);
  const [totalPaypal, setTotalPaypal] = useState(0);
  const [totalStripe, setTotalStripe] = useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    if (data.user !== "") {
      loadNTFOfOwner();
    }
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
    setOpen(true);
    window.location = process.env.SUCCESS_PAGE;
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

  async function loadNTFOfOwner() {
    var danceNFTContract = new window.web3.eth.Contract(
      danceNFT.abi,
      "0x3CAa1C35E5229EbbAEB70ea471F738a99c02381d"
    );
    var NFTCodes = await danceNFTContract.methods
      .getAllNFTCodesByAddress(data.user)
      .call();
    setNFTCodes(NFTCodes);
  }

  async function storeTransaction() {
    var newDoc = await addDoc(collection(firestoreDB, "dateTransfer"), data);
    setIdDoc(newDoc.id);
  }

  async function loadNFTMetaData(nftId) {
    const danceNFTContract = new window.web3.eth.Contract(
      danceNFT.abi,
      "0x3CAa1C35E5229EbbAEB70ea471F738a99c02381d"
    );
    const balance = await danceNFTContract.methods
      .balanceOf(data.user, nftId)
      .call();

    if (balance >= 1) {
      var jsonData = await danceNFTContract.methods.uri(nftId).call();
      jsonData = jsonData.replace("{id}", nftId);
      fetch(jsonData)
        .then((response) => response.json())
        .then((data) => {
          setImgNFT(data.image);
        });
      alert("se ha aplicado un descuento");
    } else {
      alert("usted no es propietario del token");
    }
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
          </div>

          <div className="board_card price_pay">
            <h1>
              <span>Price</span> : {priceToPay ? priceToPay : "..."} USD
            </h1>
            <div className="price_info">
              Exchange rate {totalCop + " COP, ER " + exchangeRatio}
            </div>
            <div className="price_info">Pack Of {data.Hours} Hours</div>
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
                      if (radiusValue !== "") {
                        if (radiusValue === "payWithUst") {
                          _contractAbi = UstToken.abi;
                          _addressContract =
                            "0x67862E5fD5DdCDAC1007786d8ce4469dDa847635";
                        } else if (radiusValue === "payWithUsdt") {
                          _contractAbi = UsdtToken.abi;
                          _addressContract =
                            "0x649C680dF9a192d9eE1F4Ed368962914dc3EF8c4";
                        } else if (radiusValue === "payWithUsdc") {
                          _contractAbi = UsdcToken.abi;
                          _addressContract =
                            "0x413e1A7a3702756588857259e4a55Bd2E272cE4b";
                        }
                        transferToken(
                          amount,
                          _contractAbi,
                          _addressContract,
                          () => {
                            setOpen(true);
                          }
                        );
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

                {/* {"Paypal Comission " + config.PAYPAL_PERCENTAGE + " %"} */}
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

            {/* <Button
                disabled={data.user}
                endIcon={<AccountBalanceWalletIcon />}
                variant="contained"
                onClick={async (e) => {
                  connect();
                }}
              >
                Connect
              </Button> */}

            {/*<Button
                variant="contained"
                style={{ margin: "10px" }}
                disabled={!account}
                id="btnPay"
                onClick={async (event) => {
                  var amount = priceToPay.toString();
                  var _contractAbi = '';
                  var _addressContract = "";

                  var ele = document.getElementsByName('val');
                  var radiusValue = '';
                  for (var i = 0; i < ele.length; i++) {
                    if (ele[i].checked)
                      radiusValue = ele[i].value
                  }
                  if (radiusValue !== '') {
                    if (radiusValue === 'payWithUst') {
                      _contractAbi = UstToken.abi;
                      _addressContract = "0x67862E5fD5DdCDAC1007786d8ce4469dDa847635";


                    } else if (radiusValue === 'payWithUsdt') {
                      _contractAbi = UsdtToken.abi;
                      _addressContract = "0x649C680dF9a192d9eE1F4Ed368962914dc3EF8c4";


                    } else if (radiusValue === 'payWithUsdc') {
                      _contractAbi = UsdcToken.abi;
                      _addressContract = "0x413e1A7a3702756588857259e4a55Bd2E272cE4b";

                    }
                    transferToken(amount, _contractAbi, _addressContract, () => { setOpen(true) });

                  }
                }}
              >
                Pay
              </Button>*/}
          </div>

          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => goBackPage()}
          >
            {/* <ArrowBackIcon /> */}
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
          <img
            sx={{ my: "1rem" }}
            className="nft-img"
            src={imgNFT}
            alt="Paella dish"
          />
          <p>
            You will soon be able to stake your NFT to apply an automatic
            discount. <a href="">Learn more.</a>
          </p>
        </div>
        <Modal idDoc={idDoc} show={open}></Modal>
      </div>
    </div>
  );
}

export default StepNine;
