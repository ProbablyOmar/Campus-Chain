function addCommentHandler(event, state, setState) {
  console.log(state);
  const oldComments = state.comments ? [...state.comments] : null;
  try {
    const newComment = {
      text: event.target.elements.comment.value,
      rating: 1,
      date: "xx-xx-xxxx",
    };
    console.log(newComment);

    const newQuestion = { ...state };
    if (oldComments) {
      newQuestion.comments = [newComment, ...oldComments];
    } else {
      newQuestion.comments = [newComment];
    }
    setState(newQuestion);
    // UPDATE COMMENTS IN DATABASE
  } catch (error) {
    console.error(error);
  }
}

export default addCommentHandler;
