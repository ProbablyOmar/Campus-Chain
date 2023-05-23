function addQuestionHandler(event, state) {
  console.log(state);
  const oldQuestions = state.questions ? [...state.questions] : null;
  try {
    const date = new Date();
    const newQuestion = {
      title: event.target.elements.title.value,
      body: event.target.elements.post.value,
      voteQ: 0,
      questionDate: date.getTime() / 1000,
    };
    console.log(newQuestion);
    alert("Waiting for meta mask");

    console.log("Submitting file to block...");
    //console.log(state.contract.contract);
    state.contract.contract.methods
      .addQuestion(newQuestion.title, newQuestion.body)
      .send({ from: state.contract.account })
      .then(r => {
        console.log("send data... done");
      });
    if (oldQuestions) {
      state.setQuestions([newQuestion, ...oldQuestions]);
      // UPDATE QUESTIONS IN DATABASE
    } else {
      state.setQuestions([newQuestion]);
    }
  } catch (error) {
    console.error(error);
  }
}

export default addQuestionHandler;
