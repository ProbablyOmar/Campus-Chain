function addQuestionHandler(event, setQuestions, questions) {
  console.log(questions);
  const oldQuestions = questions["questions"]
    ? [...questions["questions"]]
    : null;
  try {
    const newQuestion = {
      title: event.target.elements.title.value,
      text: event.target.elements.post.value,
      rating: 0,
      date: "xx-xx-xxxx",
    };
    console.log(newQuestion);
    if (oldQuestions) {
      questions["setQuestions"]([newQuestion, ...oldQuestions]);
    } else {
      questions["setQuestions"]([newQuestion]);
    }
  } catch (error) {
    console.error(error);
  }
}

export default addQuestionHandler;
