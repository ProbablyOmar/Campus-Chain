function Question({ title, text, date }) {
  //let [questions, setQuestions] = useState([]);
  return (
    <a id="questionlink" href="#question">
      <div id="questionbox">
        <h2>{title}</h2>
        <span>{date}</span>
        <p>{text}</p>
      </div>
    </a>
  );
}

export default Question;
