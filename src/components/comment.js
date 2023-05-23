import { useState } from "react";
import commentIcon from "../images/comment.png";
import Ratingbox from "./rating_box";

function Comment({ text, date, rating }) {
  let [comment, setComment] = useState({ text, date, rating });

  return (
    <div className="commentbox">
      <Ratingbox
        rating={comment.rating}
        state={comment}
        setState={setComment}
        voteName={"rating"}
      />

      <div className="commentdata">
        <span>{date}</span>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Comment;
