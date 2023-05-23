import { useState } from "react";
import Ratingbox from "./rating_box";
import { NavLink } from "react-router-dom";

function Question(state) {
  const [question, setQuestion] = useState(state);

  return (
    <div className="questionbox">
      <Ratingbox
        state={state}
        setState={setQuestion}
        rating={question ? question.voteQ : 0}
        voteName={"voteQ"}
      />
      <NavLink id="questionlink" to={`questions/${state.id}`}>
        <div className="questiondata">
          <span>{state.date}</span>
          <h2>{state.title}</h2>
          <p>{state.text}</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Question;
