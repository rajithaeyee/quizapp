import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Configure Amplify with Cognito
Amplify.configure(awsExports);

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'London', isCorrect: false },
        { answerText: 'Berlin', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Madrid', isCorrect: false },
      ],
    },
    {
      questionText: 'Which planet is known as the Red Planet?',
      answerOptions: [
        { answerText: 'Venus', isCorrect: false },
        { answerText: 'Mars', isCorrect: true },
        { answerText: 'Jupiter', isCorrect: false },
        { answerText: 'Saturn', isCorrect: false },
      ],
    },
    {
      questionText: 'What is 2 + 2?',
      answerOptions: [
        { answerText: '3', isCorrect: false },
        { answerText: '4', isCorrect: true },
        { answerText: '5', isCorrect: false },
        { answerText: '6', isCorrect: false },
      ],
    },
  ];

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app">
          <header className="app-header">
            <h1>Quiz App</h1>
            <div className="user-info">
              <span>Welcome, {user.username}!</span>
              <button onClick={signOut} className="sign-out-btn">
                Sign Out
              </button>
            </div>
          </header>

          <main className="quiz-container">
            {showScore ? (
              <div className="score-section">
                <h2>Quiz Completed!</h2>
                <p className="score-text">
                  You scored {score} out of {questions.length}
                </p>
                <button onClick={resetQuiz} className="reset-btn">
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="question-section">
                  <div className="question-count">
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className="question-text">
                    {questions[currentQuestion].questionText}
                  </div>
                </div>
                <div className="answer-section">
                  {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(answerOption.isCorrect)}
                      className="answer-button"
                    >
                      {answerOption.answerText}
                    </button>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </Authenticator>
  );
}

export default App;