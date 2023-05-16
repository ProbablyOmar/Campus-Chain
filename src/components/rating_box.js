import commentIcon from "../images/comment.png";

function Ratingbox({ rating, state, setState }) {
  const upvoteHandler = e => {
    let newState = { ...state };
    console.log(e.target.classList);
    e.target.classList.toggle("clicked");
    if (e.target.classList.contains("clicked")) {
      newState.rating--;
      setState(newState);
    } else {
      newState.rating++;
      setState(newState);
    }
  };

  const downvoteHandler = e => {
    let newState = { ...state };
    console.log(e.target.classList);
    e.target.classList.toggle("clicked");
    if (e.target.classList.contains("clicked")) {
      newState.rating++;
      setState(newState);
    } else {
      newState.rating--;
      setState(newState);
    }
  };

  return (
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
      <img src={commentIcon} width={36} height={30} alt="states" />
      25
    </div>
  );
}

export default Ratingbox;
