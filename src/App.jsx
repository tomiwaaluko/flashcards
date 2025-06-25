import { useState } from "react";
import "./App.css";

function App() {
  const flashcards = [
    {
      question: "What color is the sun?",
      answer: "Yellow",
      difficulty: "easy",
    },
    {
      question: "How many legs does a spider have?",
      answer: "Eight",
      difficulty: "easy",
    },
    {
      question: "What do bees make?",
      answer: "Honey",
      difficulty: "easy",
    },
    {
      question: "What is the opposite of hot?",
      answer: "Cold",
      difficulty: "easy",
    },
    {
      question: "What do you call a baby cat?",
      answer: "Kitten",
      difficulty: "easy",
    },
    {
      question: "What is the largest mammal?",
      answer: "Whale",
      difficulty: "medium",
    },
    {
      question: "What is 7 x 8?",
      answer: "Fifty-six",
      difficulty: "medium",
    },
    {
      question: "What gas do plants absorb from air?",
      answer: "Carbon",
      difficulty: "medium",
    },
    {
      question: "What is the capital of France?",
      answer: "Paris",
      difficulty: "medium",
    },
    {
      question: "What element has the symbol 'Au'?",
      answer: "Gold",
      difficulty: "hard",
    },
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState(null); // null, 'correct', or 'incorrect'
  const [hasGuessed, setHasGuessed] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [shuffledCards, setShuffledCards] = useState(flashcards);

  const handleNext = () => {
    if (!isStarted) {
      setIsStarted(true);
      return;
    }

    // Reset states when navigating to next card
    setShowAnswer(false);
    setUserGuess("");
    setFeedback(null);
    setHasGuessed(false);
    setCurrentCard((prev) => (prev + 1) % shuffledCards.length);
  };

  const handlePrev = () => {
    // Reset states when navigating to previous card
    setShowAnswer(false);
    setUserGuess("");
    setFeedback(null);
    setHasGuessed(false);
    setCurrentCard(
      (prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length
    );
  };

  const handleSubmitGuess = () => {
    if (!userGuess.trim()) return;

    const correctAnswer = shuffledCards[currentCard].answer.toLowerCase();
    const guess = userGuess.toLowerCase();

    // Simple comparison - check if key words from the answer are in the guess
    const answerWords = correctAnswer
      .split(/\s+/)
      .filter((word) => word.length > 3);
    const guessWords = guess.split(/\s+/);

    // Check if at least 50% of significant answer words are in the guess
    const matchedWords = answerWords.filter((word) =>
      guessWords.some(
        (guessWord) => guessWord.includes(word) || word.includes(guessWord)
      )
    );

    const isCorrect =
      matchedWords.length >= Math.max(1, answerWords.length * 0.4);

    setFeedback(isCorrect ? "correct" : "incorrect");
    setHasGuessed(true);

    // Update streak
    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setCurrentStreak(0);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCard(0);
    setShowAnswer(false);
    setUserGuess("");
    setFeedback(null);
    setHasGuessed(false);
  };

  const handleCardClick = () => {
    if (!isStarted) {
      setShowAnswer(!showAnswer);
      return;
    }
    setShowAnswer(!showAnswer);
  };

  const isAtBeginning = currentCard === 0;
  const isAtEnd = currentCard === shuffledCards.length - 1;

  return (
    <div className="app">
      <div className="plant-background">
        <div className="plant-left"></div>
        <div className="plant-right"></div>
      </div>

      <div className="content">
        <header>
          <h1>General Knowledge Quiz</h1>
          <p>
            Test your knowledge across science, nature, geography, and more!
          </p>
          <p className="card-count">Number of cards: {shuffledCards.length}</p>
          <p className="streak-display">
            Current Streak: {currentStreak}, Longest Streak: {longestStreak}
          </p>
        </header>

        <div className="flashcard-container">
          <div
            className={`flashcard ${showAnswer ? "flipped" : ""} ${
              isStarted
                ? `difficulty-${shuffledCards[currentCard].difficulty}`
                : ""
            } ${feedback ? `feedback-${feedback}` : ""}`}
            onClick={handleCardClick}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                {!isStarted ? (
                  <div className="start-message">
                    <h2>Start!</h2>
                  </div>
                ) : (
                  <div className="card-content">
                    <div className="question">
                      <h3>{shuffledCards[currentCard].question}</h3>
                    </div>
                    {hasGuessed && (
                      <div className={`feedback ${feedback}`}>
                        {feedback === "correct" ? "✓ Correct!" : "✗ Incorrect"}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flashcard-back">
                <div className="card-content">
                  <div className="answer">
                    <p>
                      {isStarted
                        ? shuffledCards[currentCard].answer
                        : "Press the arrow to begin"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isStarted && !hasGuessed && (
            <div className="guess-section-below">
              <div className="guess-input-container">
                <label>Guess the answer here:</label>
                <input
                  type="text"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  placeholder="Place your answer here..."
                  className="guess-input"
                  onKeyPress={(e) => e.key === "Enter" && handleSubmitGuess()}
                />
                <button
                  onClick={handleSubmitGuess}
                  className="submit-btn"
                  disabled={!userGuess.trim()}
                >
                  Submit Guess
                </button>
              </div>
            </div>
          )}

          {isStarted && (
            <div className="navigation">
              <button
                className={`nav-btn prev ${isAtBeginning ? "disabled" : ""}`}
                onClick={handlePrev}
                disabled={isAtBeginning}
              >
                ←
              </button>
              <button
                className="shuffle-btn-small"
                onClick={handleShuffle}
                title="Shuffle Cards"
              >
                🔀
              </button>
              <span className="card-indicator">
                {currentCard + 1} / {shuffledCards.length}
              </span>
              <button
                className={`nav-btn next ${isAtEnd ? "disabled" : ""}`}
                onClick={handleNext}
                disabled={isAtEnd}
              >
                →
              </button>
            </div>
          )}

          {!isStarted && (
            <div className="start-instruction">
              <div className="guess-input-container">
                <label>Guess the answer here:</label>
                <input
                  type="text"
                  placeholder="Place your answer here..."
                  className="guess-input"
                  disabled
                />
                <button className="submit-btn" disabled>
                  Submit Guess
                </button>
              </div>
              <div className="start-buttons">
                <button className="nav-btn prev" disabled>
                  ←
                </button>
                <button className="shuffle-btn" onClick={handleShuffle}>
                  Shuffle Cards
                </button>
                <button className="nav-btn next" onClick={handleNext}>
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
