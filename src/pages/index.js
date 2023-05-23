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
        console.log(lastcount);
        for (let i = 1; i <= lastcount; i++) {
          let Question = await contractState.contract.methods
            .getQuestion(i)
            .call();
          console.log(Question.body);
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
        console.log(question);
        return (
          <Question
            title={question.title}
            text={question.body}
            date={question.date}
            voteQ={question.voteQ}
            answers={question.answers}
            id={index}
            key={index}
          />
        );
      })
    : null;
  console.log(questions);
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
