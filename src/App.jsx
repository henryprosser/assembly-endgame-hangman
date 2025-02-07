import { languages } from "../languages";
import { useState } from "react";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");

  const lettersArr = Array.from(currentWord, (char) => char.toUpperCase());

  const lettersDisplay = lettersArr.map((letter, index) => {
    return (
      <span key={index} className="letter">
        {letter}
      </span>
    );
  });

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
    </main>
  );
}
