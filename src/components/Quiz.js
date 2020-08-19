import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaChevronCircleRight } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Levels from "./Levels";
import ProgressBar from "./ProgressBar";
import QuizMarvel from "./QuizMarvel";
import QuizOver from "./QuizOver";

toast.configure();

const Quiz = (props) => {
  const [levelNames, setLevelNames] = useState([
    "debutant",
    "confirme",
    "expert",
  ]);
  const [quizLevel, setQuizLevel] = useState(0);
  const [storedQuestions, setStoredQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [idQuestion, setIdQuestion] = useState(0);
  const [btndisabled, setBtnDisabled] = useState(true);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [welcomeMessage, setWelcomeMessage] = useState(false);
  const [quizEnd, setQuizEnd] = useState(false);

  const loadQuestions = (level) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level];
    setStoredQuestions(fetchedArrayQuiz);
  };

  useEffect(() => {
    loadQuestions(levelNames[quizLevel]);
  }, [quizLevel]);

  useEffect(() => {
    if (storedQuestions[0] !== undefined) {
      setQuestion(storedQuestions[idQuestion].question);
      setOptions(storedQuestions[idQuestion].options);
    }
    if (props.userData.pseudo !== undefined && !welcomeMessage) {
      toast.warn(`Bienvenue ${props.userData.pseudo}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      setWelcomeMessage(true);
    }
  }, [storedQuestions, question, options, idQuestion, props]);

  const submitAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer);
    setBtnDisabled(false);
  };

  const gameOver = (bool) => {
    setQuizEnd(bool);
  };

  const nextQuestion = () => {
    if (idQuestion < storedQuestions.length - 1) {
      if (userAnswer === storedQuestions[idQuestion].answer) {
        setScore(score + 1);
        toast.success("Bravo +1", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      } else {
        toast.error("Mauvaise réponse", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
      setIdQuestion(idQuestion + 1);
      setBtnDisabled(true);
    } else {
      if (userAnswer === storedQuestions[idQuestion].answer) {
        setScore(score + 1);
        gameOver(true);
      } else {
        gameOver(true);
      }
    }
  };

  const newGame = () => {
    if (quizLevel > 1 && score >= 5) {
      setScore(0);
      setIdQuestion(0);
      setQuizLevel(0);
    } else if (score < 5) {
      setScore(0);
      setIdQuestion(0);
    } else {
      setQuizLevel(quizLevel + 1);
      setIdQuestion(0);
      setScore(0);
    }
  };

  return quizEnd ? (
    <QuizOver
      data={storedQuestions}
      score={score}
      newGame={newGame}
      gameOver={gameOver}
    />
  ) : (
    <>
      <Levels level={quizLevel} />
      <ProgressBar
        idQuestion={idQuestion + 1}
        maxQuestion={storedQuestions.length}
      />
      <p>{score}</p>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <p
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          }`}
          key={index}
          onClick={() => submitAnswer(option)}
        >
          <FaChevronCircleRight /> {option}
        </p>
      ))}
      <button
        disabled={btndisabled}
        className="btnSubmit"
        onClick={nextQuestion}
      >
        {idQuestion < storedQuestions.length - 1 ? "Suivant" : "Terminer"}
      </button>
    </>
  );
};

export default Quiz;
