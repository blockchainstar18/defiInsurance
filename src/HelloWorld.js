import React from "react";
import { useEffect, useState } from "react";
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js";

import alchemylogo from "./alchemylogo.svg";
import BrightClient from '@brightunion/sdk'
import axios from "axios";

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("No connection to the network."); //default message
  const [quoteResult, setQuoteResult] = useState("");
  const [quote, setQuote] = useState("")
  const [ETHlist, setETHList] = useState([])
  const [BSClist, setBSCList] = useState([])
  const [POLYGONlist, setPOLYGONList] = useState([])
  const [amount, setAmount] = useState(0)
  const [period, setPeriod] = useState(0)
  const [nexuslist, setNexusList] = useState([])
  const [nexusarray, setNexusarray] = useState([])
  //called only once
  useEffect(async () => {
    let productlist; var result = [];
    await axios.get(`https://api.insurace.io/ops/v1/getProductList?code=dRsOlTd0UDcMkcCtunc7exPLz3eVnwikjNV4sebGalfq1qWpEzECQg==&chain=ETH`)
      .then((response) => {
        productlist = response.data;
      });
    for (var i in productlist)
      if (productlist[i].status == "Enabled")
        result.push(productlist[i]);

    setETHList(result)

    // result = []
    // await axios.get(`https://api.nexusmutual.io/coverables/contracts.json`)
    //   .then((response) => {
    //     productlist = response.data;
    //   });
    // for (var i in productlist)
    //   if (productlist[i].deprecated == undefined)
    //     result.push(productlist[i]);
    // setNexusList(result)

    // setNexusarray(JSON.stringify(productlist).split('},'))
    // alert(nexusarray[0])




    // result = [];
    // await axios.get(`https://api.insurace.io/ops/v1/getProductList?code=dRsOlTd0UDcMkcCtunc7exPLz3eVnwikjNV4sebGalfq1qWpEzECQg==&chain=BSC`)
    //   .then((response) => {
    //     productlist = response.data;
    //   });
    // for (var i in productlist)
    //   result.push(productlist[i]);
    // setBSCList(result)


    // result = [];
    // await axios.get(`https://api.insurace.io/ops/v1/getProductList?code=dRsOlTd0UDcMkcCtunc7exPLz3eVnwikjNV4sebGalfq1qWpEzECQg==&chain=POLYGON`)
    //   .then((response) => {
    //     productlist = response.data;
    //   });
    // for (var i in productlist)
    //   result.push(productlist[i]);
    // setPOLYGONList(result)



    // alert(result.length)
    // alert(result[0].name)
    // var data = new google.visualization.DataTable();
    // data.addColumn('string', 'Topping');
    // data.addColumn('number', 'Slices');
    // data.addRows(result);
  }, []);

  function addSmartContractListener() { //TODO: implement

  }

  function addWalletListener() { //TODO: implement

  }

  const connectWalletPressed = async () => { //TODO: implement

  };


  const onUpdatePressed = async () => { //TODO: implement
    // const BrightClient = require('@brightunion/sdk');
    // const Web3 = require("web3");
    // const detectEthereumProvider = require("@metamask/detect-provider")


    // const provider = await detectEthereumProvider();
    // await provider.request({ method: 'eth_requestAccounts' })

    // const web3 = new Web3(provider);

    // const brightClient = new BrightClient({ web3: web3 });

    // await brightClient.initialize();



    // const catalog = {
    //   productId: JSON.parse(quoteResult).product_id,
    //   amount: amount, // 50%
    //   period: period,
    //   asset: "USD",
    //   name: JSON.parse(quoteResult).name,

    // };


    // const quotes = brightClient.getQuotes(catalog.amount, catalog.asset, catalog.period, catalog)
    // console.log(quotes)

    JSON.parse(quoteResult)
    let quote
    quote = 'Protocol: ' + JSON.parse(quoteResult).name + ';' +
      ' chain: ' + JSON.parse(quoteResult).data_source_chain + ';' +
      ' capacity: ' + JSON.parse(quoteResult).capacity_remaining + ';' +
      ' Annualized price: ' + JSON.parse(quoteResult).unit_cost_yearly + ';' +
      ' status: ' + JSON.parse(quoteResult).status
    setQuote(quote)

  };


  const handleChange = event => {
    // JSON.parse(event.target.value)
    setQuoteResult(event.target.value);
  };

  const nexusChange = e => {

    alert(nexusarray.length())
    for (let index = 0; index < nexusarray.length; index++) {
      if (nexusarray[index].includes(e.target.value)) {
        alert(nexusarray[index].substring(0, 16))
        return
      }
    }
  }
  const onchange = e => {
    e.target.name === "amount" ? setAmount(e.target.value) : setPeriod(e.target.value)
  }
  //the UI of our component
  return (
    <div>
      {/* <div>
        <select id="select" onChange={nexusChange}>
          {
            (nexuslist.map(item => <option value={item.name}>{item.name}</option>))
          }
        </select>
      </div> */}
      <div id="row">
        <select id="select" onChange={handleChange} >
          {
            (ETHlist.map(item => <option key={item.product_id} value={JSON.stringify(item)}>{item.name}</option>))
          }
        </select>
        {/* <select id="select" onChange={handleChange} >
          {
            (BSClist.map(item => <option key={item.product_id} value={JSON.stringify(item)}>{item.name}</option>))
          }
        </select>
        <select id="select" onChange={handleChange} >
          {
            (POLYGONlist.map(item => <option key={item.product_id} value={JSON.stringify(item)}>{item.name}</option>))
          }
        </select> */}
        <input class="input" name="amount" placeholder="amount" onChange={onchange}></input>
        <select id="selectasset">
          <option>ETH</option>
          <option>USD</option>
        </select>
        <input class="input" name="period" placeholder="period" onChange={onchange} ></input>
      </div>
      <button onClick={onUpdatePressed}>quote</button>
      <div id="quoteResult">{quote}</div>
    </div>
  );
};

export default HelloWorld;
