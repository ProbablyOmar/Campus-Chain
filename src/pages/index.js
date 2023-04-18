import { useState } from "react";
import Question from "../components/question";
import CreateQuestion from "../components/create-question";
function MainPage() {
  const [questions, setQuestions] = useState([
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title1",
      date: "xx/xx/xxxx",
      rating: 15,
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title2",
      date: "xx/xx/xxxx",
      rating: 15,
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title3",
      date: "xx/xx/xxxx",
      rating: 15,
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
      rating: 15,
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
      rating: 15,
    },
  ]);

  const formatedQuestions = questions
    ? questions.map((question, index) => {
        return (
          <Question
            title={question.title}
            text={question.text}
            date={question.date}
            rating={question.rating}
            key={index}
          />
        );
      })
    : null;
  console.log(formatedQuestions);
  const postHandler = event => {
    event.preventDefault();
    document.getElementById("postoverlay").style.display = "block";
    document.getElementById("addquestionform").style.display = "flex";
  };
  return (
    <div>
      <button id="addquestion" onClick={postHandler}>
        Post!
      </button>
      <div id="postoverlay">
        <CreateQuestion questions={questions} setQuestions={setQuestions} />
      </div>
      <ol>{formatedQuestions}</ol>
    </div>
  );
}

export default MainPage;
