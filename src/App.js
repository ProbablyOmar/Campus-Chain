import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header.js";
//import NavBar from "./components/navbar";
import MainPage from "./pages";
import QuestionPage from "./pages/question_page";
import Profile from "./pages/profile";
import Signin from "./pages/signin";
import Register from "./pages/register";
import Web3 from "web3";
import camp_chain from "./abis/camp_chain.json";
//import data from "../testdata.json";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [contractState, setContract] = useState();
  useEffect(() => {
    let isFetched = false;
    // SET UP CONTRACT
    const loadWeb3 = () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask"
        );
      }
    };
    // FETCH HASH FROM BLOCKCHAIN
    const loadBlockchainData = async () => {
      const web3 = window.web3;
      // Load account
      const accounts = await web3.eth.getAccounts();
      //console.log("accounts: ", accounts);
      //const networkId = await web3.eth.net.getId();
      //console.log(networkId);
      const contract = new web3.eth.Contract(
        camp_chain,
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      );
      if (!contractState) setContract({ account: accounts[0], contract });
    };
    if (isFetched === false) {
      loadWeb3();
      loadBlockchainData();
    }
    // FETCH QUESTIONS FROM IPFS
    // STORE DATA IN VARIABLE "data"
    return () => {
      isFetched = true;
    };
  }, [contractState]);
  console.log(contractState);
  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainPage
                contractState={contractState}
                setContract={setContract}
              />
            }
          />
          <Route
            path="/questions/:questionId"
            element={<QuestionPage contract={contractState} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/signin"
            element={
              !isLoggedIn ? (
                <Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <MainPage
                  contractState={contractState}
                  setContract={setContract}
                />
              )
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
