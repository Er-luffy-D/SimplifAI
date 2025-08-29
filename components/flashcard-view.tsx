"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Shuffle,
    Star,
} from "lucide-react";
import { useArrowNav } from "../hooks/useArrowNav.js";
type FlashCards = {
    question: string;
    answer: string;
    difficulty: string;
}[];

export function FlashcardView({ originalFlashcards }: { originalFlashcards?: FlashCards | null }) {
    const [flashcards, setFlashcards] = useState(originalFlashcards || []);
    const [currentCard, setCurrentCard] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const nextCard = () => {
        setFlipped(false);
        setTimeout(() => {
            setCurrentCard((prev) => (prev + 1) % (originalFlashcards?.length || 0));
        }, 200);
    };

    const prevCard = () => {
        setFlipped(false);
        setTimeout(() => {
            setCurrentCard(
                (prev) => (prev - 1 + flashcards.length) % flashcards.length
            );
        }, 200);
    };

    useArrowNav({ onPrev: prevCard, onNext: nextCard });

    if (!originalFlashcards || originalFlashcards.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">No flashcards available.</p>
            </div>
        );
    }

    const toggleFavorite = () => {
        setFavorites((prev) =>
            prev.includes(currentCard)
                ? prev.filter((id) => id !== currentCard)
                : [...prev, currentCard]
        );
    };

    const shuffleCards = () => {
        const currentCardData = flashcards[currentCard];
        const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
        if (shuffled.length > 1 && shuffled[0] === currentCardData) {
            const differentCardIndex = shuffled.findIndex(
                (card, index) => index > 0 && card !== currentCardData
            );
            if (differentCardIndex > 0) {
                [shuffled[0], shuffled[differentCardIndex]] = [
                    shuffled[differentCardIndex],
                    shuffled[0],
                ];
            }
        }

        setFlashcards(shuffled);
        setCurrentCard(0);
        setFlipped(false);
    };

    const resetCards = () => {
        setCurrentCard(0);
        setFlipped(false);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy":
                return "bg-gradient-green-emerald text-white";
            case "medium":
                return "bg-gradient-orange-red text-white";
            case "hard":
                return "bg-gradient-purple-pink text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <div className="flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-2xl mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-medium text-muted-foreground">
                            Card {currentCard + 1} of {flashcards.length}
                        </p>
                        <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                                flashcards[currentCard].difficulty
                            )} text-white`}
                        >
                            {flashcards[currentCard].difficulty}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleFavorite}
                            className="hover:scale-110 transition-all duration-300"
                            data-cursor="hover"
                            data-cursor-text="Add to Favorites"
                        >
                            <Star
                                className={`w-4 h-4 ${favorites.includes(currentCard)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : ""
                                    }`}
                            />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetCards}
                            className="hover:scale-110 transition-all duration-300"
                            data-cursor="hover"
                            data-cursor-text="Reset Card"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={shuffleCards}
                            className="hover:scale-110 transition-all duration-300"
                            data-cursor="hover"
                            data-cursor-text="Shuffle Cards"
                        >
                            <Shuffle className="w-4 h-4 mr-2" />
                            Shuffle
                        </Button>
                    </div>
                </div>

                <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
                    <Button
                        onClick={prevCard}
                        className="shrink-0 w-2 h-40 sm:w-2 sm:h-28 md:w-2 md:h-50 hover:scale-110 bg-neutral-900 hover:bg-neutral-700 text-white transition-all duration-300 flex items-center justify-center"
                        data-cursor="hover"
                        data-cursor-text="Previous Card"
                    >
                        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>

                    <div className="relative w-full perspective-1000">
                        <Card
                            className={`relative w-full aspect-[3/2] cursor-pointer transition-all duration-700 hover:shadow-2xl hover:shadow-primary/20 ${flipped
                                ? "bg-gradient-to-br from-primary/5 to-purple-500/5"
                                : "hover:scale-[1.02]"
                                }`}
                            onClick={() => setFlipped(!flipped)}
                            style={{
                                transformStyle: "preserve-3d",
                                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            }}
                            data-cursor="hover"
                            data-cursor-text="Flip Card"
                        >
                            <div
                                className="absolute inset-0 flex items-center justify-center p-8 text-center backface-hidden rounded-lg border-2 border-dashed border-primary/20"
                                style={{ backfaceVisibility: "hidden", background: "black", }}
                            >
                                <div className="space-y-4">
                                    <div className="text-sm text-muted-foreground animate-pulse">
                                        Question
                                    </div>
                                    <h3 className="text-xl font-medium leading-relaxed">
                                        {flashcards[currentCard].question}
                                    </h3>
                                    <div className="text-sm text-muted-foreground opacity-60">
                                        Click to reveal answer
                                    </div>
                                </div>
                            </div>

                            <div
                                className="absolute inset-0 flex items-center justify-center p-8 text-center backface-hidden rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30"
                                style={{
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                    background: "black",
                                }}
                            >
                                <div className="space-y-4">
                                    <div className="text-sm text-primary font-medium animate-pulse">
                                        Answer
                                    </div>
                                    <p className="text-xl font-medium text-primary leading-relaxed animate-fade-in">
                                        {flashcards[currentCard].answer}
                                    </p>
                                    <div className="text-sm text-muted-foreground opacity-60">
                                        Click to see question
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Button
                        onClick={nextCard}
                        className="shrink-0 w-2 h-24 sm:w-2 sm:h-40 md:w-2 md:h-50 hover:scale-110 bg-neutral-900 hover:bg-neutral-700 text-white transition-all duration-300 flex items-center justify-center"
                        data-cursor="hover"
                        data-cursor-text="Next Card"
                    >
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-center gap-6">
                <Button
                    onClick={prevCard}
                    variant="outline"
                    size="icon"
                    className="hover:scale-110 hover:bg-primary/10 transition-all duration-300"
                    data-cursor="hover"
                    data-cursor-text="Previous Card"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="sr-only">Previous card</span>
                </Button>

                <div className="text-center px-4">
                    <p className="text-sm font-medium mb-1">Click card to flip</p>
                    <div className="flex gap-1 justify-center items-center">
                        {flashcards.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentCard
                                    ? "bg-primary scale-125"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    onClick={nextCard}
                    variant="outline"
                    size="icon"
                    className="hover:scale-110 hover:bg-primary/10 transition-all duration-300"
                    data-cursor="hover"
                    data-cursor-text="Next Card"
                >
                    <ChevronRight className="w-5 h-5" />
                    <span className="sr-only">Next card</span>
                </Button>
            </div>
        </div>
    );
}
