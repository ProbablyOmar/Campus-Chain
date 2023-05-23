function addCommentHandler(event, answers, setAnswers, contract, question) {
  const oldAnswers = answers ? [...answers] : null;
  try {
    const date = new Date();
    const newAnswer = {
      body: event.target.elements.comment.value,
      voteA: 1,
      questionDate: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    };
    let newAnswers;
    //const contract = {...state};
    if (oldAnswers) {
      newAnswers = [newAnswer, ...oldAnswers];
    } else {
      newAnswers = [newAnswer];
    }
    setAnswers(newAnswers);
    // UPDATE COMMENTS IN DATABASE
    console.log(contract);
    if (contract) {
      contract.contract.methods
        .addAnswer(newAnswer.body, question.questionID)
        .send({ from: contract.account })
        .then(r => {
          console.log("send data... done");
        });
    }
  } catch (error) {
    console.error(error);
  }
}

export default addCommentHandler;
