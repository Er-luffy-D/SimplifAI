"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type QuizItem = {
  question: string;
  options: string[];
  correct: number;
};

export function QuizView() {
 const data = useSelector(
    (state: RootState) => state.parse.quiz
  ) as QuizItem[];
  const quizQuestions = data || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(quizQuestions.length).fill(null)
  );
  const [isAnswered, setIsAnswered] = useState<boolean[]>(
    Array(quizQuestions.length).fill(false)
  ); // to track the questions which have been answered

  if (!quizQuestions.length)
    return (
      <p className="text-center text-muted-foreground">No quiz data found.</p>
    );

  const correctIndex = (questionIndex: number) => {
    const correct = quizQuestions[questionIndex].correct;
    const idx = Number(correct);
    return isNaN(idx) ? -1 : idx - 1;
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(Number(value));
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const prevAnswer = answers[currentQuestion];
    const isPrevCorrect = prevAnswer === correctIndex(currentQuestion);
    const isCurrentCorrect = selectedOption === correctIndex(currentQuestion);

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;

    let newScore = score;
    if (!isPrevCorrect && isCurrentCorrect) newScore += 1;
    if (isPrevCorrect && !isCurrentCorrect) newScore -= 1;

    setAnswers(newAnswers);
    setScore(newScore);

    // Lock the question as answered
    const newIsAnswered = [...isAnswered];
    newIsAnswered[currentQuestion] = true;
    setIsAnswered(newIsAnswered);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(newAnswers[currentQuestion + 1] ?? null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] ?? null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setScore(0);
    setAnswers(Array(quizQuestions.length).fill(null));
	setIsAnswered(Array(quizQuestions.length).fill(false)); //updates the reset state of answered questions
  };

  const isPreviouslyAnswered = answers[currentQuestion] !== null;
  const currentCorrectAnswer = correctIndex(currentQuestion);

  return (
    <div className="max-w-2xl mx-auto">
      {!quizCompleted ? (
        <Card className="backdrop-blur-sm bg-card/90 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                Score: {score}/{quizQuestions.length}
              </span>
            </div>
            <CardDescription>
              Select the best answer based on the document content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">
                {quizQuestions[currentQuestion].question}
              </h3>
              <RadioGroup
                value={selectedOption !== null ? selectedOption.toString() : ""}
                onValueChange={handleOptionSelect}
              >
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 rounded-md border p-3 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                          selectedOption === index
                            ? "border-primary bg-primary/10 scale-[1.02]"
                            : ""
                        } ${
                          isPreviouslyAnswered && index === currentCorrectAnswer
                            ? "border-green-500 bg-green-500/10"
                            : ""
                        } ${
                          isPreviouslyAnswered &&
                          answers[currentQuestion] === index &&
                          index !== currentCorrectAnswer
                            ? "border-red-500 bg-red-500/10"
                            : ""
                        }`}
                        onClick={() => {    // Handle click to select option
                          if (!isAnswered[currentQuestion]) {
                            handleOptionSelect(index.toString());
                          }
                        }}
                        data-cursor="hover"
											data-cursor-text={`Option ${index + 1}`}
                      >
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                          disabled={isAnswered[currentQuestion]} //Disable the changes in ans if answered
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                        {isPreviouslyAnswered &&
                          index === currentCorrectAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                        {isPreviouslyAnswered &&
                          answers[currentQuestion] === index &&
                          index !== currentCorrectAnswer && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                      </div>
                    )
                  )}
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              variant="outline"
              data-cursor="hover"

							data-cursor-text="Previous Question"
            >
              Back
            </Button>
            <Button onClick={handleNext} disabled={selectedOption === null}
              data-cursor="button"

							data-cursor-text="Next Question">
              {currentQuestion < quizQuestions.length - 1 ? "Next" : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>
              You scored {score} out of {quizQuestions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative">
              <div className="flex items-center justify-center p-6 bg-primary/10 rounded-lg">
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {score === quizQuestions.length
                      ? "Perfect score! Excellent understanding of the material."
                      : score >= quizQuestions.length / 2
                      ? "Good job! You have a solid understanding of the material."
                      : "Keep studying! You'll improve with practice."}
                  </p>
                </div>
              </div>
              {score === quizQuestions.length && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="animate-bounce-slow text-6xl">🎉</div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={resetQuiz} className="w-full" data-cursor="button" data-cursor-text="Restart Quiz">
              Restart Quiz
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
