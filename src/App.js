import { useEffect, useState } from "react";
import "./App.css";
import jpLogo from "./assets/jpLogo.png";

// initializes an array to have numbers from 1 --> 50
let arr = Array.from({ length: 50 }, (_, i) => i + 1);

function App() {
  let [validGame, setValidGame] = useState(true);
  let [gameStart, setGameStart] = useState();
  let [gameEnd, setGameEnd] = useState();

  let elapsedTime = (gameEnd - gameStart) / 1000;
  let formatTime = elapsedTime.toFixed(2);

  useEffect(() => {
    setGameStart(new Date().getTime());
  }, []);

  // creates a function that takes the current id and switches it to a random number, "shuffling" array
  function shuffleArr(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  shuffleArr(arr);

  // creates an empty array to store values of clicked numbers
  let clickedNumbers = [];

  // onClick function that takes the id, which is the number stored in the div, and adds it to the clicked numbers array
  function clickNumber(event) {
    let id = parseInt(event.target.id);

    let previousValue = clickedNumbers[clickedNumbers.length - 1];

    if (id === 1 || id === previousValue + 1) {
      clickedNumbers.push(id);
      event.currentTarget.disabled = true;
    } else {
      setValidGame(!validGame);
      setGameEnd(new Date().getTime());
    }

    if (id === 50) {
      setValidGame(null);
      setGameEnd(new Date().getTime());
    }
  }

  return (
    <>
      <div className="game__container">
        <a
          href="https://www.josiahparkhill.dev/"
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={jpLogo} alt="josiah parkhill logo" className="logo" />
        </a>
        {validGame ? (
          <>
            <p className="game__instuctions">
              Improve Your Focus. Pick Numbers 1-50 in Order. Fastest Time Wins.
            </p>
            {arr.map((num) => (
              <button
                className="number__container"
                key={num}
                id={num}
                onClick={clickNumber}
              >
                {num}
              </button>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
      {validGame === null ? (
        <div className="gameover__container">
          <div className="gameover">Congrats!</div>
          <p className="gameover__time">{`${formatTime}s`}</p>
          <button
            className="gameover__button"
            onClick={() => {
              setValidGame(!validGame);
              setGameStart(new Date().getTime());
            }}
          >
            Start Over
          </button>
        </div>
      ) : (
        <></>
      )}
      {!validGame && validGame !== null ? (
        <div className="gameover__container">
          <div className="gameover">Game Over</div>
          <p className="gameover__time">{`${formatTime}s`}</p>
          <button
            className="gameover__button"
            onClick={() => {
              setValidGame(!validGame);
              setGameStart(new Date().getTime());
            }}
          >
            Start Over
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
