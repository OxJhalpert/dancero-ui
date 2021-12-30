import React, { useState } from "react";
import Web3 from 'web3';
import DanceroToken from "./abis/DanceroToken.json"
import UsdtToken from "./abis/UsdtToken.json"

export default function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});

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

  var user = await window.web3.eth.getAccounts()             
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
    .transfer( "0x880A36731521B1E295AEa30443Bbc9bd23FfB2e9",amount) 
    .send(
      item
    );
  })
  
});
}

  return (
    <div className="App">
      <div>
        <progress max="6" value={page} />
      </div>
      <div>
        {page === 1 && <StepOne data={data} update={updateData} />}
        {page === 2 && <StepTwo data={data} update={updateData} />}
        {page === 3 && <StepThree data={data} update={updateData} />}
        {page === 4 && <StepFour data={data} update={updateData} />}
        {page === 5 && <StepFive data={data} update={updateData} />}
        {page === 6 && <StepSix data={data} />}
      </div>

      {page !== 6}
      {page === 6 && (
        <>
          <button
            onClick={(e) => {
              if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                window.ethereum.enable()

                } else if (window.web3) {
                    window.web3 = new Web3(window.web3.currentProvider)
                } else {
                    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
              }
            }}
          >
          Connect Metamask
          </button>
          <button
            onClick={async (event) =>{
              var amount = "10"
              var _contractAbi = DanceroToken.abi
              var _addressContract="0x30fA1ef775DFdF02935b4eDb5fDF0F308E6F96F1"
              transferToken (amount,_contractAbi, _addressContract)
          }}>
            Pay with DCO
          </button>
          <button
            onClick={async (event) =>{
              var amount = "15"
              var _contractAbi=UsdtToken.abi
              var _addressContract="0x0dE2A5ea877C76c190F8659f78e5772743db02d2"
              transferToken(amount,_contractAbi, _addressContract)
          }}>
            Pay with UST
          </button>
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
    <div>
      modo en que vera las clases:
      <br></br>
      <button onClick={() => update("modo", "online ")}>online</button>
      <button onClick={() => update("modo", "offline ")}>offline</button>
    </div>
  );
}

function StepTwo({ update }) {
  return (
    <div>
      escoja su genero:
      <br></br>
      <button onClick={() => update("genero", "hombre")}>Hombre</button>
      <button onClick={() => update("genero", "mujer")}>Mujer</button>
    </div>
  );
}

function StepThree({ update }) {
  return (
    <div>
      escoja el genero deseado para aprender:
      <br></br>
      <button onClick={() => update("genero_musical", "salsa ")}>salsa</button>
      <button onClick={() => update("genero_musical", "bachata ")}>
        bachata
      </button>
      <button onClick={() => update("genero_musical", "reggaeton ")}>
        reggaeton
      </button>
    </div>
  );
}

function StepFour({ update }) {
  return (
    <div>
      escoja su ciudad:
      <br></br>
      <button onClick={() => update("ciudad", "medellin ")}>medellin</button>
      <button onClick={() => update("ciudad", "bogota ")}>bogota</button>
      <button onClick={() => update("ciudad", "cali")}>cali</button>
      <button onClick={() => update("ciudad", "cartagena")}>cartagena</button>
    </div>
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
      <button onClick={() => update("dateFrom" ,"dateto")}>next</button>
    </div>
  );
}

function StepSix({ data }) {
  return (
    <div>
      resumen:
      <br></br>
      <p> {JSON.stringify(data)} </p>
    </div>
  );
}
