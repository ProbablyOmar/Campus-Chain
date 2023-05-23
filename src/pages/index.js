import { useEffect, useState } from "react";
//import Web3 from "web3";
import Question from "../components/question";
import CreateQuestion from "../components/create-question";
//import data from "../testdata.json";
//import camp_chain from "../abis/camp_chain.json";

function MainPage({ contractState, setContract }) {
  const [questions, setQuestions] = useState();
  useEffect(() => {
    const FETCH = async () => {
      if (contractState) {
        let lastcount = await contractState.contract.methods.getCount().call();
        for (let i = 1; i <= lastcount; i++) {
          let Question = await contractState.contract.methods
            .getQuestion(i)
            .call();

          setQuestions(questions => {
            return questions ? [Question, ...questions] : [Question];
          });
        }
        /*setQuestions(questions => {
          return questions ? [...data, ...questions] : [...data];
        });*/
      }
    };
    FETCH();
  }, [contractState, setQuestions]);

  const formatedQuestions = questions
    ? questions.map((question, index) => {
        const date = new Date(question.questionDate * 1000);
        let questionDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        return (
          <Question
            title={question.title}
            text={question.body}
            date={questionDate}
            voteQ={question.voteQ}
            answers={question.answers}
            id={question.questionID}
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
        />
      </div>
      <ol>{formatedQuestions}</ol>
    </div>
  );
}

export default MainPage;
