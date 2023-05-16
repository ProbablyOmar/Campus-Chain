function addQuestionHandler(event, state) {
  console.log(state);
  const oldQuestions = state.questions ? [...state.questions] : null;
  try {
    const newQuestion = {
      title: event.target.elements.title.value,
      text: event.target.elements.post.value,
      rating: 0,
      date: "xx-xx-xxxx",
    };
    console.log(newQuestion);
    if (oldQuestions) {
      state.setQuestions([newQuestion, ...oldQuestions]);
      // UPDATE QUESTIONS IN DATABASE
      alert("A name was submitted: ");

      console.log("Submitting file to block...");
      console.log(state.contract.contract);
      state.contract.contract.methods
        .askQuestion(newQuestion.text)
        .send({ from: state.contract.account })
        .then(r => {
          console.log("send data... done");
        });
    } else {
      state.setQuestions([newQuestion]);
    }
  } catch (error) {
    console.error(error);
  }
}

export default addQuestionHandler;
