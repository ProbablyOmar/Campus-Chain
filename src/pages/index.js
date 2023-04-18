import { useState, useEffect } from "react";
import Question from "../components/question";
import CreateQuestion from "../components/create-question";
import data from "../testdata.json";
function MainPage() {
  const [questions, setQuestions] = useState();
  useEffect(() => {
    setQuestions(data);
  }, []);
  const formatedQuestions = questions
    ? questions.map((question, index) => {
        return (
          <Question
            title={question.title}
            text={question.text}
            date={question.date}
            rating={question.rating}
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
        <CreateQuestion questions={questions} setQuestions={setQuestions} />
      </div>
      <ol>{formatedQuestions}</ol>
    </div>
  );
}

export default MainPage;
