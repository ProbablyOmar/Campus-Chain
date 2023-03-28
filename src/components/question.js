function Question({ title, text, date }) {
  //let [questions, setQuestions] = useState([]);
  return (
    <a id="questionlink" href="#question">
      <div id="questionbox">
        <div className="ratingbox">
          <button
            className="vote"
            onClick={e => {
              console.log(e.target.classList);
              if (e.target.classList.contains("clicked")) {
                e.target.classList.remove("clicked");
              } else {
                e.target.classList.add("clicked");
              }
            }}
          >
            <svg width="36" height="36">
              <path d="M2 21h32L18 5 2 21z" fill="currentColor"></path>
            </svg>
          </button>
          <span>15</span>
          <button
            className="vote"
            onClick={e => {
              console.log(e.target.classList);
              if (e.target.classList.contains("clicked")) {
                e.target.classList.remove("clicked");
              } else {
                e.target.classList.add("clicked");
              }
            }}
          >
            <svg width="36" height="36">
              <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
        <div>
          <h2>{title}</h2>
          <span>{date}</span>
          <p>{text}</p>
        </div>
      </div>
    </a>
  );
}

export default Question;
