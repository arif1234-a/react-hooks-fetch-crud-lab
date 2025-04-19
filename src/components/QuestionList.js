import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
  }, []);

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  function handleDeleteQuestion(deletedId) {
    fetch(`http://localhost:4000/questions/${deletedId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setQuestions((prevQuestions) =>
            prevQuestions.filter((q) => q.id !== deletedId)
          ); 
        } 
      })
  }

  return (
    <ul>
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onUpdateQuestion={handleUpdateQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
      ))}
    </ul>
  );
}

export default QuestionList;
