import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ratingbox from "../components/rating_box";
import Comment from "../components/comment";
import Question from "../components/question";
import addCommentHandler from "../controllers/add_comment";
import data from "../testdata.json";

function QuestionPage() {
  const id = useParams().questionId;
  const [question, setQuestion] = useState(data[id]);
  const update_comments = event => {
    event.preventDefault();
    addCommentHandler(event, question, setQuestion);
  };

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
