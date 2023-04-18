import add_question from "../controllers/add_question";
function CreateQuestion(questions, setQuestions) {
  const update_questions = event => {
    event.preventDefault();
    add_question(event, setQuestions, questions);
    document.getElementById("postoverlay").style.display = "none";
    document.getElementById("addquestionform").style.display = "none";
  };
  return (
    <form id="addquestionform" onSubmit={update_questions}>
      <input
        placeholder="Title"
        type="text"
        name="title"
        id="titleinput"
      ></input>
      <textarea
        placeholder="Main post"
        type="text"
        name="post"
        id="postinput"
        rows={15}
        cols={100}
      ></textarea>
      <button type="submit" id="submitpost">
        Post!
      </button>
    </form>
  );
}

export default CreateQuestion;
