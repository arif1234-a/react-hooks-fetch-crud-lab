import React from "react";

function QuestionItem({ question, onUpdateQuestion, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleCorrectAnswerChange(event) {
    const updatedCorrectIndex = parseInt(event.target.value, 10);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        onUpdateQuestion(updatedQuestion); 
      })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {options}
        </select>
      </label>
      <button onClick={() => onDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
