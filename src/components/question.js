import { useState } from "react";

function Question({ title, text, date, rating }) {
  let [question, setQuestion] = useState({});

  const upvoteHandler = e => {
    let newState = { ...question };
    console.log(e.target.classList);
    if (e.target.classList.contains("clicked")) {
      e.target.classList.remove("clicked");
      newState.rating--;
      setQuestion(newState);
    } else {
      e.target.classList.add("clicked");
      newState.rating++;
      setQuestion(newState);
    }
  };

  const downvoteHandler = e => {
    let newState = { ...question };
    console.log(e.target.classList);
    if (e.target.classList.contains("clicked")) {
      e.target.classList.remove("clicked");
      newState.rating++;
      setQuestion(newState);
    } else {
      e.target.classList.add("clicked");
      newState.rating--;
      setQuestion(newState);
    }
  };
  return (
    <div className="questionbox">
      <div className="ratingbox">
        <button className="vote" onClick={upvoteHandler}>
          <svg width="36" height="36">
            <path d="M2 21h32L18 5 2 21z" fill="currentColor"></path>
          </svg>
        </button>
        <span style={{ color: "white" }}>{rating}</span>
        <button className="vote" onClick={downvoteHandler}>
          <svg width="36" height="36">
            <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
      <a id="questionlink" href="#question">
        <div className="questiondata">
          <h2>{title}</h2>
          <span>{date}</span>
          <p>{text}</p>
        </div>
      </a>
    </div>
  );
}

export default Question;
