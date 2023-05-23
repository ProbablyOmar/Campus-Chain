import { useState } from "react";
import Ratingbox from "./rating_box";

function Question({ title, text, date, voteQ, id, answers }) {
  let [question, setQuestion] = useState({
    title,
    text,
    date,
    voteQ,
    id,
    answers,
  });
  console.log(question.title, question.answers);
  id = id.toString();
  console.log(id);
  return (
    <div className="questionbox">
      <Ratingbox
        state={question}
        setState={setQuestion}
        rating={voteQ}
        voteName={"voteQ"}
      />
      <a id="questionlink" href={`questions/${id}`}>
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
