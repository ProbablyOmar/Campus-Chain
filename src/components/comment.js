import { useState } from "react";
import commentIcon from "../images/comment.png";
import Ratingbox from "./rating_box";

function Comment({ text, date, rating }) {
  let [comment, setComment] = useState({});

  return (
    <div className="commentbox">
      <Ratingbox rating={rating} comment={comment} setComment={setComment} />

      <div className="commentdata">
        <span>{date}</span>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Comment;
