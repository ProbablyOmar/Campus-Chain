import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ratingbox from "../components/rating_box";
import Comment from "../components/comment";
import Question from "../components/question";
import data from "../testdata.json";

function QuestionPage() {
  const id = useParams().questionId;
  const [question, setQuestion] = useState(data[id]);

  const formatedComments = question.comments
    ? question.comments.map((comment, index) => {
        return (
          <Comment
            text={comment.text}
            date={comment.date}
            rating={comment.rating}
            id={index}
            key={index}
          />
        );
      })
    : null;

  return (
    <div className="commentpage">
      <div className="questionbigbox">
        <Ratingbox
          state={question}
          setState={setQuestion}
          rating={question.rating}
        />

        <div className="questiondata">
          <h2>{question.title}</h2>
          <span>{question.date}</span>
          <p>{question.text}</p>
        </div>
        {/*<button id="addquestion" onClick={postHandler}>
      Post!
      </button>
      <div id="postoverlay">
      <CreateQuestion
      questions={questions}
      setQuestions={setQuestions}
        contract={contractState}
        setContract={setContract}
        />
      </div>*/}
      </div>
      <ol>{formatedComments}</ol>
    </div>
  );
}
export default QuestionPage;
