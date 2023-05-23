import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ratingbox from "../components/rating_box";
import Comment from "../components/comment";
import addCommentHandler from "../controllers/add_comment";
//import data from "../testdata.json";

function QuestionPage({ questions, contract }) {
  const id = useParams().questionId;
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();

  useEffect(() => {
    const fetchQuestion = async () => {
      let Question = contract
        ? await contract.contract.methods.getQuestion(id).call()
        : undefined;
      if (!question) setQuestion(Question);
    };
    fetchQuestion();
  }, [question, id, contract]);

  useEffect(() => {
    const fetchAnswers = async () => {
      let answers;
      let i = 0;
      console.log(question.answers);
      let len = question.answers.length;
      console.log(len);
      while (i < len) {
        if (typeof question != Number)
          console.log("Answer ID: ", question.answers[i]);
        let answer = contract
          ? await contract.contract.methods
              .getAnswer(question.answers[i])
              .call()
          : undefined;
        answers = answers ? [answer, ...answers] : [answer];
        i++;
      }
      console.log(answers);
      setAnswers(answers);
    };
    if (question) {
      fetchAnswers();
    }
  }, [question, contract]);

  const update_comments = event => {
    event.preventDefault();
    addCommentHandler(event, answers, setAnswers, contract, question);
  };
  console.log(question);
  const formatedComments = answers
    ? answers.map((comment, index) => {
        return (
          <Comment
            text={comment.body}
            date={comment.date}
            rating={comment.voteA}
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
          rating={question ? question.voteQ : 0}
          voteName={"voteQ"}
        />

        <div className="questiondata">
          <h2>{question ? question.title : " "}</h2>
          <span>{question ? question.date : " "}</span>
          <p>{question ? question.body : " "}</p>
        </div>
      </div>

      <form onSubmit={update_comments}>
        <textarea
          placeholder="Enter your comment "
          type="text"
          name="comment"
          id="commentinput"
          rows={8}
          cols={150}
        ></textarea>
        <button type="submit" id="submitcomment">
          Comment!
        </button>
      </form>

      <ol>{formatedComments}</ol>
    </div>
  );
}
export default QuestionPage;
