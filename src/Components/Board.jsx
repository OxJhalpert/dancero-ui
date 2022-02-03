import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import moment from 'moment'
import UstToken from '../abis/UstToken.json';
import UsdtToken from '../abis/UsdtToken.json';
import UsdcToken from '../abis/UsdcToken.json';
import getPriceAndCostCalculation from './utils';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from "react";
import danceNFT from '../abis/danceNFT.json';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import React from 'react';
import Modal from './Modal';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useStripe } from "@stripe/react-stripe-js";
import { collection, query, where, getDocs, setDoc, addDoc, doc, getFirestore } from "firebase/firestore";




function createData(name, option, name2, option2) {
  return { name, option, name2, option2 };
}


const firebaseConfig = {
  apiKey: "AIzaSyAu-4JfgSOo8mIjdhnQxs6EuEdaljcidAw",
  authDomain: "dancero-app.firebaseapp.com",
  projectId: "dancero-app",
  storageBucket: "dancero-app.appspot.com",
  messagingSenderId: "863521077258",
  appId: "1:863521077258:web:8a4b5f932d0217abf307f3",
  measurementId: "G-G9ECPGJH3B"
};


function StepNine({ data, connect, transferToken, goBackPage }) {

  // const [firestoreDB, setFirestoreDB] = useState();
  const app = initializeApp(firebaseConfig);

  var firestoreDB = getFirestore(app)
  
  // setFirestoreDB({ firestoreDB : getFirestore(app) }) ;
  const dataTransferQuery = query(collection(firestoreDB, "dateTransfer"));

  const [exchangeRatio, setexchangeRatio] = useState()
  const [imgNFT , setImgNFT] = useState("https://via.placeholder.com/150");
  const [nftcodes, setNFTCodes] = useState([]);
  const [nftSelected, SetNFTSelected] = useState(null);
  const [priceToPay, setPriceToPay] = useState(0);
  const [totalCop, setTotalCop] = useState(0);


  function getExchangeRate(){
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(res => {
      return res.json();
    })
    .then(res => {
      setexchangeRatio(res.rates.COP);
      calculatePrice(res.rates.COP);
    })
  }
  
  useEffect(()=>{
      getExchangeRate();
  },[setexchangeRatio])

  useEffect(() => {
    if(data.user !== ""){
      loadNTFOfOwner();
    }

  }, [data.user]);

  var initialDate = moment(data.dates.dateFrom).format("MMM Do YY");
  var finalDate = moment(data.dates.dateTo).format("MMM Do YY");
  const rows = [
    createData(<b>Date from</b>, initialDate, <b>City</b>, data.City),
    createData(<b>Date to</b>, finalDate, <b>Service Type</b>, data.Service),
    createData(<b>Venue</b>, data.Venue, <b>Level</b>, data.Level),
    createData(<b>Teacher Gender</b>, data.Gender, <b>Hours Pack</b>, data.Hours),
    createData(<b>Musical genre</b>, data.Musical_gender),

  ];

 

  async function calculatePrice(exchangeRate)
  {
    const roundTo = 5000;
    var cost = getPriceAndCostCalculation(data.Service, data.Level, data.Hours, data.City, data.Venue, data.place, 0);
    var rest = cost[1] - cost[0]; 
    var totalCopRound = RoundTo(rest, roundTo)
    setTotalCop(totalCopRound);
    rest = totalCopRound / exchangeRate;
    rest = Math.round(rest);

    setPriceToPay(rest);
  }
  function RoundTo(number, roundTo)
  {
    return roundTo* Math.ceil(number /roundTo)
  }

  async function loadNTFOfOwner()
  {
    var danceNFTContract =  new window.web3.eth.Contract(danceNFT.abi, "0x3CAa1C35E5229EbbAEB70ea471F738a99c02381d");
    var NFTCodes = await danceNFTContract.methods.getAllNFTCodesByAddress(data.user).call();
    setNFTCodes(NFTCodes); 
  }

   function storeTransaction(){
    var idNewDoc = addDoc(collection(firestoreDB, "dateTransfer"), 
    {
      Venue : data.Venue,
      City : data.City,
      Place : data.place,
      Teacher_gender : data.Gender,
      Musical_genre : data.Musical_gender,
      Service_type : data.Service,
      Hours_pack : data.Hours,
      Initia_lDate : initialDate,
      Final_Date : finalDate,
      payment : true 
    });
  }

  async function loadNFTMetaData(nftId)
  {
    const danceNFTContract = new window.web3.eth.Contract(danceNFT.abi, "0x3CAa1C35E5229EbbAEB70ea471F738a99c02381d")
    const balance = await danceNFTContract.methods
    .balanceOf(data.user, nftId).call()
    
    if(balance >= 1){
      var jsonData = await danceNFTContract.methods.uri(nftId).call();
      jsonData = jsonData.replace("{id}", nftId);
      fetch(jsonData)
        .then((response) => response.json())
        .then((data) => {
          setImgNFT(data.image);
        });      
      alert('se ha aplicado un descuento')
      
    }else{
      alert('usted no es propietario del token')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }} container spacing={2} p={2.5}>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={4}>
          <Card sx={{ mb: "1rem"}}>
            <CardHeader
              title={"Pack Of " + data.Hours + " Hours"}
              subheader={"Exchange rate " + (totalCop + " COP, ER " + exchangeRatio)}>
            </CardHeader>
            <CardContent>
              <Typography variant="h5" component="div">
                <b>Price</b> : {priceToPay ? priceToPay : "..."} USD
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ mb: "1rem"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Pay with crypto
              </Typography>


              <input type="radio" id="payWithUsdc" name="val" value="payWithUsdc"></input>
              <label htmlFor="payWithUsdc">USDC</label>
              <input type="radio" id="payWithUsdt" name="val" value="payWithUsdt" defaultChecked ></input>
              <label htmlFor="payWithUsdt">USDT</label>
              <input type="radio" id="payWithUst" name="val" value="payWithUst"></input>
              <label htmlFor="payWithUsdc">UST</label>
            </CardContent>
            <CardActions>

              <Button
                disabled={data.user}
                endIcon={<AccountBalanceWalletIcon />}
                variant="contained"
                onClick={async (e) => {
                  connect();
                }}
              >
                Connect
              </Button>

              <Button
                variant="contained"
                style={{ margin: "10px" }}
                disabled={!data.user}
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
                    transferToken(amount, _contractAbi, _addressContract);

                  }
                  storeTransaction();

                }}
              >
                Pay
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ mb: "1rem"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Pay with FIAT
              </Typography>
            </CardContent>
            <CardActions>
              {/* <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" style={{margin :'20px'}}>
              <input type="hidden" name="cmd" value="_xclick"/>
              <input type="hidden" name="business" value="ivan9711@outlook.com"/>
              <input type="hidden" name="lc" value="US"/>
              <input type="hidden" name="amount" value={priceToPay}/>
              <input type="hidden" name="currency_code" value="USD"/>
              <input type="hidden" name="button_subtype" value="services"/>
              <input type="hidden" name="no_note" value="0"/>
              <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynow_SM.gif:NonHostedGuest"/>
              <input type="image" src="https://www.paypalobjects.com/es_XC/i/btn/btn_buynow_SM.gif" border="0" name="submit" alt="PayPal, la forma más segura y rápida de pagar en línea."/>
              <img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1"/>
              </form> */}
{/* button pruebas  */}
              <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top" style={{margin :'20px'}}>
              <input type="hidden" name="cmd" value="_xclick"/>
              <input type="hidden" name="business" value="ivan9711@outlook.com"/>
              <input type="hidden" name="lc" value="US"/>
              <input type="hidden" name="amount" value={priceToPay}/>
              <input type="hidden" name="currency_code" value="USD"/>
              <input type="hidden" name="button_subtype" value="services"/>
              <input type="hidden" name="no_note" value="0"/>
              <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynow_SM.gif:NonHostedGuest"/>
              <input type="image" src="https://www.paypalobjects.com/es_XC/i/btn/btn_buynow_SM.gif" border="0" name="submit" alt="PayPal, la forma más segura y rápida de pagar en línea."/>
              <img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1"/>
              </form>              

              <Modal priceToPay={priceToPay} storeTransaction={storeTransaction}></Modal>
            </CardActions>
          </Card>
          <Fab variant="extended" size="medium" color="primary" onClick={() => goBackPage()} >
                <ArrowBackIcon />
          </Fab>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ maxWidth: '100%' }}>
          <CardHeader
            title="Load your NFT"
          />
          <CardMedia
            component="img"
            height="285"
            image={imgNFT}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <FormControl fullWidth>
              {
                nftcodes.length > 0 ?
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={nftSelected}
                  onChange={(evt) => {SetNFTSelected(evt.target.value); loadNFTMetaData(evt.target.value); }} 
                >
                  { nftcodes.map( (nft) => <MenuItem value={nft}>{nft}</MenuItem>) }
                </Select> :
                  <b>Connect your wallet to load your NFTs</b>                  
            }
            </FormControl>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.option}</TableCell>
                <TableCell align="right">{row.name2}</TableCell>
                <TableCell align="right">{row.option2}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </Grid>
</Box>
  )
}

export default StepNine;  