import commentIcon from "../images/comment.png";
import { useState } from "react";

function Ratingbox({ state, setState, voteName, rating }) {
  const [vote, setVote] = useState(0);

  const upvoteHandler = e => {
    let newState = { ...state };
    newState[voteName] = newState[voteName] * 1;

    e.target.classList.toggle("clicked");
    if (e.target.classList.contains("clicked")) {
      setVote(1);
    } else {
      setVote(0);
    }
  };

  const downvoteHandler = e => {
    let newState = { ...state };
    newState[voteName] = newState[voteName] * 1;

    e.target.classList.toggle("clicked");
    if (e.target.classList.contains("clicked")) {
      setVote(-1);
    } else {
      setVote(0);
    }
  };
  return (
    <div className="ratingbox">
      <button className="vote" onClick={upvoteHandler}>
        <svg width="36" height="36">
          <path d="M2 21h32L18 5 2 21z" fill="currentColor"></path>
        </svg>
      </button>
      <span style={{ color: "white" }}>{rating * 1 + vote}</span>
      <button className="vote" onClick={downvoteHandler}>
        <svg width="36" height="36">
          <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
        </svg>
      </button>
      {voteName === "voteQ" ? (
        <img src={commentIcon} width={36} height={30} alt="states" />
      ) : undefined}
      {state && state.answers ? state.answers.length : undefined}
    </div>
  );
}

export default Ratingbox;
