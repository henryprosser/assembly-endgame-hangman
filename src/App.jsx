import { languages } from "../languages";
import { useState } from "react";
import clsx from "clsx";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const lettersDisplay = currentWord.split("").map((letter, index) => (
    <span className="letter" key={index}>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
    </span>
  ));

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

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
    >
      {letter.toUpperCase()}
    </button>
  ));

  const languageElements = languages.map((item) => {
    return (
      <span
        style={{ backgroundColor: item.backgroundColor, color: item.color }}
        className="language-element"
        key={item.name}
      >
        {item.name}
      </span>
    );
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
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{lettersDisplay}</section>
      <section className="keyboard">{keyboardDisplay}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
