import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';
import Button from "@mui/material/Button";

import ClassTypeStep from './Components/ClassTypeStep.jsx';
import TeacherGenderStep from './Components/TeacherGenderStep.jsx';
import MusicGenreStep from './Components/MusicGenreStep.jsx';
import LocationStep from './Components/LocationStep.jsx';
import DatesStep from './Components/DatesStep.jsx';
import MembershipStep from './Components/MembershipStep.jsx';
import LevelStep from './Components/LevelStep.jsx';
import HoursStep from './Components/HoursStep.jsx';
import BoardStep from './Components/Board.jsx';

import { initializeApp } from "firebase/app";
import { collection, query, where, getDocs, setDoc, addDoc, doc, getFirestore } from "firebase/firestore";
import './css/cards.css';
import HomeStudioStep from "./Components/HomeStudioStep.jsx";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import config from "./config.json";
import "./scss/cards.scss";
import "./scss/layout.scss";
import danceroLogo from "./images/dancero-logo.png"


export default function App() {
  
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    "user" : ''
  });
  const [account, setAccount] = useState();


  const firebaseConfig = {
    apiKey: "AIzaSyAu-4JfgSOo8mIjdhnQxs6EuEdaljcidAw",
    authDomain: "dancero-app.firebaseapp.com",
    projectId: "dancero-app",
    storageBucket: "dancero-app.appspot.com",
    messagingSenderId: "863521077258",
    appId: "1:863521077258:web:8a4b5f932d0217abf307f3",
    measurementId: "G-G9ECPGJH3B"
  };

  const app = initializeApp(firebaseConfig);
  var firestoreDB = getFirestore(app)

  const pages = ['Products', 'Pricing', 'Blog'];
  

  async function connect() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setData({ ...data, 'user': account[0] });
      
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  function goNextPage() {
    if (page === 10) return;
    setPage((page) => page + 1);
  }

  function goBackPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  function updateData(type, newData) {
    setData((data) => {
      return { ...data, [type]: newData };
    });
    goNextPage();
    
  }

  async function transferToken(amount, _contractAbi, _addressContract, callback) {
    var chainId = await window.ethereum.request({  method: 'eth_chainId'  });
    const user = await window.web3.eth.getAccounts();
    // if (chainId === '0x6357d2e0')
    if (chainId === '0x38')
    {
      window.web3.eth.getBlock("latest").then(async function (response) {
        window.web3.eth.getGasPrice().then(function (gas) {
          var item = {
            from: user[0],
            gasprice: gas,
            gaslimit: response.gasLimit,
          };
          
          amount = window.web3.utils.toWei(amount, "Ether");
          const contract = new window.web3.eth.Contract(
            _contractAbi,
            _addressContract
          );
          contract.methods
            .transfer(config.PAYMENT_ACCOUNT, amount)
            .send(item)
            .on("transactionHash", (hash) => {
              var newDoc =  addDoc(collection(firestoreDB, "transactionweb3"), data)
              callback(true);
            });
        });
      });
    }else
    {
      window.alert('Please select Harmony Mainet')
    }
  }

  useEffect(() => {
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/6207d7859bd1f31184dc4f45/1frna3p8k';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
  }, []);

  return (
    <div className="App" >
      <Box sx={{ flexGrow: 2, bgcolor: "#2F348B" }}>
        <AppBar className="container navbar" position="static" sx={{ bgcolor: "#2F348B", boxShadow: "none" }}>
          <Toolbar>
            <img src={danceroLogo}/>
          {data.user ? data.user : "" }
          <Button
                className="wallet-button"
                disabled={data.user}
                endIcon={<AccountBalanceWalletIcon />}
                variant="contained"
                onClick={async (e) => {
                  connect();
                }}
              >
                Connect Wallet 
          </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="progress-bar">
        <span>{page} / 9</span>
        <LinearProgress variant="determinate" value= {(page) * 10}  />
      </div>
       <div>
        {page === 1 && <ClassTypeStep data={data} update={updateData} setPage={setPage}/>  }
        {page === 2 &&  <LocationStep  data={data} update={updateData} goBackPage={goBackPage} setPage={setPage}/>  }
        {page === 3 && <HomeStudioStep data={data} update={updateData} goBackPage={goBackPage} />}
        {page === 4 && <TeacherGenderStep data={data} update={updateData} goBackPage={goBackPage} setPage={setPage}/>}
        {page === 5 && <MusicGenreStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 6 && <LevelStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 7 && <MembershipStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 8 && <HoursStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 9 && <DatesStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 10 && <BoardStep  data={data} update={updateData} connect={connect} transferToken={transferToken} goBackPage={goBackPage} firebaseConfig={firebaseConfig} account={account} />}    
       </div>    
    </div>
  );
}
