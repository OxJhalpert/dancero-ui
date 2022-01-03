import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";
import Web3 from 'web3';
import UstToken from "./abis/UstToken.json"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import cali from './images/cali.jpg';
import bogota from './images/bogota.jpg';
import cartagena from './images/cartagena.jpeg';
import hombre from './images/Hombre.png';
import medellin from './images/medellin.jpg';
import mujer from './images/mujer.png';
import offline from './images/offline.jpg';
import online from './images/online.jpg';
import salsa from './images/salsa.jpg';
import reggaeton from './images/reaggaeton.jpg';
import bachata from './images/bachata.jpg';

export default function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    user : ""
  });

  async function connect (){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();

      var account = await window.web3.eth.getAccounts();
      updateData("user", account[0]);

      } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
      } else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  function goNextPage() {
    if (page === 6) return;
    setPage((page) => page + 1);
  }

  function updateData(type, newData) {
    setData((data) => {
      return { ...data, [type]: newData };
    });
    goNextPage();
  }


async function  transferToken ( amount,_contractAbi,_addressContract){

  const user = await window.web3.eth.getAccounts();
  window.web3.eth.getBlock("latest").then(async function(response){
  console.log(response.gasLimit)
  window.web3.eth.getGasPrice().then(function(gas){
    console.log(gas)
    var item={
      "from":user[0],
      "gasprice":gas,
      "gaslimit":response.gasLimit
    }
    console.log(item)
    amount = window.web3.utils.toWei(amount, 'Ether');
    const contract = new window.web3.eth.Contract(_contractAbi,_addressContract);
    contract.methods
    .transfer( "0x02a10A6182B60Ee989fd611cab17bd0512885205",amount) 
    .send(
      item
    );
  })
  
});
}

  return (
    <div className="App">
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dancero App
          </Typography>
          <p color="inherit">Wallet: {data.user}</p>
        </Toolbar>
      </AppBar>
    </Box>
      <div>
        <progress max="6" value={page} />
      </div>
      <div>
        {page === 1 && <StepOne data={data} update={updateData} />}
        {page === 2 && <StepTwo data={data} update={updateData} />}
        {page === 3 && <StepThree data={data} update={updateData} />}
        {page === 4 && <StepFour data={data} update={updateData} />}
        {page === 5 && <StepFive data={data} update={updateData} />}
        {page === 6 && <StepSix data={data} update={updateData}/>}
      </div>

      {page !== 6}
      {page === 6 && (
        <>
          <Button variant="contained" style={{margin: "10px"}}
            onClick={async (e) => {
              connect();
            }}
          >
          Connect Metamask
          </Button>
          <Button variant="contained" style={{margin: "10px"}}
            onClick={async (event) =>{
              var amount = "15"
              var _contractAbi=UstToken.abi
              var _addressContract="0x67862E5fD5DdCDAC1007786d8ce4469dDa847635"
              transferToken(amount,_contractAbi, _addressContract)
          }}>
            Pay with UST
          </Button>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_xclick"/>
            <input type="hidden" name="business" value="ivan9711@outlook.com"/>
            <input type="hidden" name="lc" value="US"/>
            <input type="hidden" name="item_name" value="dance classes"/>
            <input type="hidden" name="item_number" value="0"/>
            <input type="hidden" name="amount" value="15.00"/>
            <input type="hidden" name="currency_code" value="USD"/>
            <input type="hidden" name="button_subtype" value="services"/>
            <input type="hidden" name="no_note" value="0"/>
            <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest"/>
            <input type="image" src="https://www.paypalobjects.com/es_XC/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, la forma más segura y rápida de pagar en línea."/>
            <img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1"/>
          </form>
        </>
      )}
    </div>
  );
}

function StepOne({ update }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={2}>
          <Grid key={1} item>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Online"
              height="140"
              image={online}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Online
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => update("Mode", "Online ")}>Select</Button>
            </CardActions>
          </Card>
          </Grid>
          <Grid key={1} item>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Offline"
              height="140"
              image={offline}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Offline
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => update("Mode", "Offline ")}>Select</Button>
            </CardActions>
          </Card>
          </Grid>
      </Grid>
    </Grid>
  </Grid>
  );
}

function StepTwo({ update }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Woman"
              height="140"
              image={mujer}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Woman
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => update("Gender", "Woman")}>Select</Button>
            </CardActions>
          </Card>
            </Grid>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Man"
              height="140"
              image={hombre}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Man
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => update("Gender", "Man")}>Select</Button>
            </CardActions>
          </Card>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function StepThree({ update }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="reggaeton"
                height="140"
                image={reggaeton}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Reggaeton
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => update("Musical_gender", "Reggaeton ")}>Select</Button>
              </CardActions>
            </Card>
            </Grid>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="salsa"
                height="140"
                image={salsa}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Salsa
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => update("Musical_gender", "Salsa ")}>Select</Button>
              </CardActions>
            </Card>
            </Grid>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="bachata"
                height="140"
                image={bachata}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bachata
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => update("Musical_gender", "Bachata ")} >Select</Button>
              </CardActions>
            </Card>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function StepFour({ update }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="cartagena"
                height="140"
                image={cartagena}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cartagena
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => update("City", "Cartagena")}>Select</Button>
              </CardActions>
            </Card>

            </Grid>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="bogota"
                height="140"
                image={bogota}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bogota
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => update("City", "Bogota ")} >Select</Button>
              </CardActions>
            </Card>

            </Grid>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="medellin"
                height="140"
                image={medellin}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Medellin
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => update("City", "Medellin ")}>Select</Button>
              </CardActions>
            </Card>

            </Grid>
            <Grid key={1} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="cali"
                height="140"
                image={cali}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cali
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => update("City", "Cali")} >Select</Button>
              </CardActions>
            </Card>

            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function StepFive({ update }) {
  return (
    <div>
      <p>Date From</p>
      <input></input>
      <br></br>
      <p>Date To</p>
      <input></input>
      <br></br>
      <Button variant ="contained" style={{margin: "10px"}} onClick={() => update("Date_From" ,"Date_to")}>next</Button>
    </div>
  );
}

function StepSix({ data }) {
  return (
    <div>
      Resume:
      <br></br>
      <p> {JSON.stringify(data)} </p>
    </div>
  );
}
