import { useState, useEffect } from "react";
import Web3 from "web3";
import Question from "../components/question";
import CreateQuestion from "../components/create-question";
/*import data from "../testdata.json";*/
import camp_chain from "../abis/camp_chain.json";

function MainPage({ isLoggedIn, setIsLoggedIn }) {
  const [questions, setQuestions] = useState();
  const [contractState, setContract] = useState();
  console.log(questions);
  useEffect(
    () => {
      // SET UP CONTRACT
      const loadWeb3 = () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          window.alert(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }
      };
      // FETCH HASH FROM BLOCKCHAIN
      const loadBlockchainData = async () => {
        const web3 = window.web3;
        // Load account
        const accounts = await web3.eth.getAccounts();
        //console.log("accounts: ", accounts);
        const networkId = await web3.eth.net.getId();
        //console.log(networkId);
        if (networkId) {
          const contract = new web3.eth.Contract(
            camp_chain,
            "0x5FbDB2315678afecb367f032d93F642f64180aa3"
          );

          setContract({ account: accounts[0], contract });
          let Question = await contract.methods.getQuestions(12).call();
          console.log(Question.text);
          Question = {
            ...Question,
            title: "Blockhain Question",
            rating: 4.5,
            date: "xx/xx/xxxx",
          };
          setQuestions([/*...questions,*/ Question]);
          console.log(Question.text);
          console.log("done");
          console.log(questions);
        } else {
          window.alert("Smart contract not deployed to detected network.");
        }
      };
      /*setQuestions(data);*/
      loadWeb3();
      loadBlockchainData();
      // FETCH QUESTIONS FROM IPFS
      // STORE DATA IN VARIABLE "data"
    },
    [
      /*, contractState*/
    ]
  );
  //console.log(contractState);
  const formatedQuestions = questions
    ? questions.map((question, index) => {
        return (
          <Question
            title={question.title}
            text={question.text}
            date={question.date}
            rating={question.rating}
            id={index}
            key={index}
          />
        );
      })
    : null;
  const postHandler = event => {
    event.preventDefault();
    document.getElementById("postoverlay").style.display = "block";
    document.getElementById("addquestionform").style.display = "flex";
  };
  return (
    <div>
      <button id="addquestion" onClick={postHandler}>
        Post!
      </button>
      <div id="postoverlay">
        <CreateQuestion
          questions={questions}
          setQuestions={setQuestions}
          contract={contractState}
          setContract={setContract}
        />
      </div>
      <ol>{formatedQuestions}</ol>
    </div>
  );
}

export default MainPage;
