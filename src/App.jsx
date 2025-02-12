import { languages } from "../languages";
import { useState } from "react";
import clsx from "clsx";
import { getFarewellText, getRandomWord } from "./utils/utils";
import Confetti from "react-confetti";

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const numGuessesLeft = languages.left - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameOver = isGameLost || isGameWon;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  const lettersDisplay = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx("letter", {
      "not-guessed": isGameOver && !guessedLetters.includes(letter),
    });
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyboardDisplay = alphabet.split("").map((letter) => (
    <button
      className={clsx("keyboard-letter", {
        correct:
          guessedLetters.includes(letter) && currentWord.includes(letter),
        incorrect:
          guessedLetters.includes(letter) && !currentWord.includes(letter),
      })}
      key={letter}
      onClick={() => addGuessedLetter(letter)}
      disabled={isGameOver}
      aria-disabled={guessedLetters.includes(letter)}
      aria-label={`Letter ${letter}`}
    >
      {letter.toUpperCase()}
    </button>
  ));

  const languageElements = languages.map((item, index) => {
    return (
      <span
        style={{ backgroundColor: item.backgroundColor, color: item.color }}
        className={clsx("language-element", {
          lost: wrongGuessCount > index,
        })}
        key={item.name}
      >
        {item.name}
      </span>
    );
  });

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {isGameWon && (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        )}
        {isGameLost && (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        )}
        {!isGameOver && isLastGuessIncorrect && (
          <p id="farewell-text">
            <span>{getFarewellText(languages[wrongGuessCount - 1].name)}</span>{" "}
            🫡
          </p>
        )}
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{lettersDisplay}</section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>

      <section className="keyboard">{keyboardDisplay}</section>
      {isGameOver && (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      )}
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
    </main>
  );
}
