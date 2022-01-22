import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
//import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import moment from 'moment'
import UstToken from '../abis/UstToken.json';
import UsdtToken from '../abis/UsdtToken.json';
import UsdcToken from '../abis/UsdcToken.json';
import getPriceAndCostCalculation from './utils';
import dance from '../images/FIiy_CIVUAEmzBH.jpg';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from "react";
import danceNFT from '../abis/danceNFT.json';
import Select from '@mui/material/Select';



function createData(name, option, name2, option2) {
  return { name, option, name2, option2 };
}



function StepNine({ data, connect, transferToken, goBackPage }) {

  const [ exchangeRatio, setexchangeRatio] = useState()
  const [imgNFT , setImgNFT] = useState("https://via.placeholder.com/150");
  const [nftcodes, setNFTCodes] = useState([]);
  const [nftSelected, SetNFTSelected] = useState(null);

  function getExchangeRate(){
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(res => {
      return res.json();
    })
    .then(res => {
      setexchangeRatio(res.rates.COP)
    })
  }
  
  useEffect(()=>{
      getExchangeRate();
  },[setexchangeRatio])

  useEffect(() => {
    if(data.user != ""){
      loadNTFOfOwner();
    }

  }, [data.user]);


  var cost = getPriceAndCostCalculation(data.Service, data.Level, data.Hours, data.City, data.Venue, data.place, 0);
  var rest = cost[1] - cost[0];
  var total = rest;

  rest = rest / exchangeRatio;
  rest = Math.round(rest);
  console.log(total, rest, cost);

  var initialDate = moment(data.dates.dateFrom).format("MMM Do YY");
  var finalDate = moment(data.dates.dateTo).format("MMM Do YY");
  const rows = [
    createData(<b>Date from</b>, initialDate, <b>City</b>, data.City),
    createData(<b>Date to</b>, finalDate, <b>Service Type</b>, data.Service),
    createData(<b>Venue</b>, data.Venue, <b>Level</b>, data.Level),
    createData(<b>Teacher Gender</b>, data.Gender, <b>Hours Pack</b>, data.Hours),
    createData(<b>Musical genre</b>, data.Musical_gender),

  ];

  async function loadNTFOfOwner()
  {
    var danceNFTContract =  new window.web3.eth.Contract(danceNFT.abi, "0x3CAa1C35E5229EbbAEB70ea471F738a99c02381d");
    var NFTCodes = await danceNFTContract.methods.getAllNFTCodesByAddress(data.user).call();
    setNFTCodes(NFTCodes); 
  }

  async function loadNFTMetaData(nftId)
  {
    const danceNFTContract = new window.web3.eth.Contract(danceNFT.abi, "0xa7B7cC621163e3ac45c379c50580bff36D1310C5")
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

  let theme = createTheme({
    palette: {
      background: {
        default: '#DADADA',
      },
    },
  });


  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }} container spacing={2} p={2.5}>
      <Grid item xs={12} justifyContent="center">
        <Grid container spacing={2} >
          <Grid item xs={4} >
            <Grid item xs={12}>
              <Grid item xs={12} paddingBottom={2}>
                <Card>
                  <CardHeader
                    title={"Pack Of " + data.Hours + " Hours"}
                    subheader={"Exchange rate " + (total + " COP, ER " + exchangeRatio)}>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      <b>Price</b> : {rest ? rest:"..."} USD
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} paddingBottom={2}>
                <Card>
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
                        var amount = rest.toString();
                        var _contractAbi = '';
                        var _addressContract = "";

                        var ele = document.getElementsByName('val');
                        var radiusValue = '';
                        for (var i = 0; i < ele.length; i++) {
                          if (ele[i].checked)
                            radiusValue = ele[i].value
                        }
                        console.log(radiusValue)
                        if (radiusValue !== '') {
                          if (radiusValue === 'payWithUst') {
                            amount = "15";
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

                      }}
                    >
                      Pay
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Pay with FIAT
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" >pay with paypal</Button>
                    <Button variant="contained" >pay with stripe</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
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
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nftSelected}
                    onChange={(evt) => {SetNFTSelected(evt.target.value); loadNFTMetaData(evt.target.value); }} 
                  >
                    { nftcodes.map( (nft) => <MenuItem value={nft}>{nft}</MenuItem>) }
                  </Select>
                </FormControl>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                  <TableBody>
                    <TableRow
                      key="Data"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">1</TableCell>
                      <TableCell component="th" scope="row">2</TableCell>
                      <TableCell component="th" scope="row">3</TableCell>
                      <TableCell component="th" scope="row">4</TableCell>
                    </TableRow>
                    <TableRow
                      key="Data"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">1</TableCell>
                      <TableCell component="th" scope="row">2</TableCell>
                      <TableCell component="th" scope="row">3</TableCell>
                      <TableCell component="th" scope="row">4</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StepNine;  