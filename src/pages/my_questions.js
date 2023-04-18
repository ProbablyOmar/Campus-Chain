import React from "react";
import { useState } from "react";
import Question from "../components/question";

function MyQuestions() {
  const [questions, setQuestions] = useState([
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
      rating: "15",
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
      rating: "15",
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
      rating: "15",
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
      rating: "15",
    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias reprehenderit voluptates, recusandae nobis alias sint, repellat, nulla unde necessitatibus ut neque. Quod explicabo tempora magnam ratione eligendi quos dolorem obcaecati?",
      title: "Cool Question Title",
      date: "xx/xx/xxxx",
      rating: "15",
    },
  ]);
  const formatedQuestions = questions.map((question, index) => {
    return (
      <Question
        title={question.title}
        text={question.text}
        date={question.date}
        rating={question.rating}
        key={index}
      />
    );
  });

  return (
    <div>
      <ol>{formatedQuestions}</ol>
    </div>
  );
}

export default MyQuestions;
