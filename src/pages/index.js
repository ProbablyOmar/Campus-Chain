import { useState } from "react";
import Question from "../components/question";
function MainPage() {
  const [questions, setQuestions] = useState([
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
    },
  ]);

  const formatedQuestions = questions.map((question, index) => {
    return (
      <Question
        title={question.title}
        text={question.text}
        date={question.date}
        key={index}
      />
    );
  });
  return (
    <div>
      <button id="addquestion">Add Question</button>
      <ol>{formatedQuestions}</ol>
    </div>
  );
}

export default MainPage;
