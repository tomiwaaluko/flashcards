import { useState } from "react";
import "./App.css";

function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const flashcards = [
    {
      question: "How often should you water a snake plant?",
      answer:
        "Every 2-3 weeks, allowing soil to dry completely between waterings",
      difficulty: "easy",
    },
    {
      question: "What type of light do pothos prefer?",
      answer: "Bright, indirect light, but can tolerate low light conditions",
      difficulty: "easy",
    },
    {
      question: "How do you propagate a rubber plant?",
      answer: "Through stem cuttings placed in water or moist soil",
      difficulty: "medium",
    },
    {
      question: "What causes brown leaf tips on houseplants?",
      answer: "Usually overwatering, low humidity, or fluoride in tap water",
      difficulty: "medium",
    },
    {
      question: "How often should you fertilize most houseplants?",
      answer: "Monthly during growing season (spring/summer), less in winter",
      difficulty: "easy",
    },
    {
      question: "What's the best soil for succulents?",
      answer: "Well-draining cactus/succulent mix with perlite or sand",
      difficulty: "medium",
    },
    {
      question: "Why do plant leaves turn yellow?",
      answer:
        "Often overwatering, but can also be natural aging or nutrient deficiency",
      difficulty: "hard",
    },
    {
      question: "How much humidity do tropical plants need?",
      answer: "40-60% humidity, often requiring humidifiers or pebble trays",
      difficulty: "hard",
    },
    {
      question: "When should you repot a plant?",
      answer:
        "When roots grow out of drainage holes or plant becomes top-heavy",
      difficulty: "medium",
    },
    {
      question: "What's the difference between direct and indirect sunlight?",
      answer:
        "Direct: sun rays hit plant directly. Indirect: filtered or reflected light",
      difficulty: "hard",
    },
  ];

  const handleNext = () => {
    if (!isStarted) {
      setIsStarted(true);
      return;
    }

    // Always show question when navigating to next card
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    // Always show question when navigating to previous card
    setShowAnswer(false);
    setCurrentCard(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  return (
    <div className="app">
      <div className="plant-background">
        <div className="plant-left"></div>
        <div className="plant-right"></div>
      </div>

      <div className="content">
        <header>
          <h1>The Ultimate Plant Parent!</h1>
          <p>
            How good of a plant parent are you? Test all of your planty
            knowledge here!
          </p>
          <p className="card-count">Number of cards: {flashcards.length}</p>
        </header>

        <div className="flashcard-container">
          <div
            className={`flashcard ${showAnswer && isStarted ? "flipped" : ""} ${
              isStarted
                ? `difficulty-${flashcards[currentCard].difficulty}`
                : ""
            }`}
            onClick={() => (!isStarted ? null : setShowAnswer(!showAnswer))}
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
                      <h3>{flashcards[currentCard].question}</h3>
                    </div>
                  </div>
                )}
              </div>
              <div className="flashcard-back">
                <div className="card-content">
                  <div className="answer">
                    <p>{isStarted ? flashcards[currentCard].answer : ""}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isStarted && (
            <div className="navigation">
              <button className="nav-btn prev" onClick={handlePrev}>
                ←
              </button>
              <button className="nav-btn next" onClick={handleNext}>
                →
              </button>
            </div>
          )}

          {!isStarted && (
            <div className="start-instruction">
              <p>Press the next arrow to start the flashcards :)</p>
              <button className="nav-btn next" onClick={handleNext}>
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
