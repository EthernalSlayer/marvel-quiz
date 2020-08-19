import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiTrophyCup, GiDeadHead } from "react-icons/gi";
import Loader from "./Loader";
import Modal from "./Modal";

const QuizOver = (props) => {
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = "d7a1fd90acac409c428ea39dcd0f630c";

  const [openModal, setOpenModal] = useState(false);
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkedDataAge(date);
    }
  }, []);

  const checkedDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;

    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 15) {
      localStorage.clear();
    }
  };

  const getPercent = (totalQuestions, question) => {
    return (100 / totalQuestions) * question;
  };

  const showModal = (id) => {
    setOpenModal(true);
    if (localStorage.getItem(id)) {
      setCharacterData(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          setCharacterData(response.data);
          setLoading(false);
          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  const progressPercent = getPercent(props.data.length, props.score);

  const resultInModal = !loading ? (
    <>
      <div className="modalHeader">
        <h2>{characterData.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              characterData.data.results[0].thumbnail.path +
              "." +
              characterData.data.results[0].thumbnail.extension
            }
            alt={characterData.data.results[0].name}
          />
          <p>{characterData.attributionText}</p>
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {characterData.data.results[0].description ? (
            <p>{characterData.data.results[0].description}</p>
          ) : (
            <p>Descritpion indisponnible...</p>
          )}
          <h3>Plus d'infos</h3>
          {characterData.data.results[0].urls.map((url, index) => {
            return (
              <a
                key={index}
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url.type}
              </a>
            );
          })}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>
          Fermer
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
        <h2>Réponse de Marvel...</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </>
  );

  return props.score >= 5 ? (
    <>
      <div className="stepsBtnContainer">
        <p className="successMsg">
          <GiTrophyCup size="3em" />
          Bravo, vous êtes un expert !
        </p>
        <button
          className="btnResult success"
          onClick={() => {
            props.gameOver(false);
            props.newGame();
          }}
        >
          Niveau suivant
        </button>
      </div>
      <div className="percentage">
        <div className="progressPercent">{`resultat : ${progressPercent}%`}</div>
        <div className="progressPercent">{`note : ${props.score}/10`}</div>
      </div>
      <hr />
      <p>Les réponses aux questions :</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>info</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item, index) => {
              return (
                <tr key={props.data[index].id}>
                  <td>{props.data[index].question}</td>
                  <td>{props.data[index].answer}</td>
                  <td>
                    <button
                      className="btnInfo"
                      onClick={() => showModal(props.data[index].heroId)}
                    >
                      Infos
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal showModal={openModal}>{resultInModal}</Modal>
    </>
  ) : (
    <>
      <div className="stepsBtnContainer">
        <p className="failureMsg">
          <GiDeadHead size="3em" />
          Dommage, tu n'as pas assez de bonnes réponses !!!
        </p>
        <button
          className="btnResult failure"
          onClick={() => {
            props.gameOver(false);
            props.newGame();
          }}
        >
          Recommencer
        </button>
      </div>
      <div className="percentage">
        <div className="progressPercent">{`resultat : ${progressPercent}%`}</div>
        <div className="progressPercent">{`note : ${props.score}/10`}</div>
      </div>
      <hr />
      <p>Les réponses aux questions :</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>info</th>
            </tr>
          </thead>
          <tbody>
            <td colSpan="3">
              <Loader
                loadingMsg={"Pas de réponses pour les loosers !"}
                styling={{ textAlign: "center", color: "red" }}
              />
            </td>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default React.memo(QuizOver);
