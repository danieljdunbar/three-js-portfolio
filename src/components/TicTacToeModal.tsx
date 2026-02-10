"use client";

import { useEffect, useState } from "react";

interface TicTacToeModalProps {
    onClose: () => void;
}

type Player = "X" | "O";
type Cell = Player | null;

export default function TicTacToeModal({ onClose }: TicTacToeModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [winner, setWinner] = useState<Player | "Draw" | null>(null);
    const [isComputerTurn, setIsComputerTurn] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.exitPointerLock();
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const checkWinner = (squares: Cell[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const makeComputerMove = () => {
        if (winner || !board.includes(null)) return;

        // Simple Random Strategy
        let moveIndex = -1;

        const emptyIndices = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null) as number[];
        if (emptyIndices.length > 0) {
            moveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        }

        if (moveIndex !== -1) {
            const newBoard = [...board];
            newBoard[moveIndex] = "O";
            setBoard(newBoard);

            const newWinner = checkWinner(newBoard);
            if (newWinner) {
                setWinner(newWinner);
            } else if (!newBoard.includes(null)) {
                setWinner("Draw");
            } else {
                setCurrentPlayer("X");
            }
        }
        setIsComputerTurn(false);
    };

    useEffect(() => {
        if (currentPlayer === "O" && !winner) {
            setIsComputerTurn(true);
            const timer = setTimeout(makeComputerMove, 500); // Delay for better UX
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, winner, board]);

    const handleCellClick = (index: number) => {
        if (board[index] || winner || isComputerTurn) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
        } else if (!newBoard.includes(null)) {
            setWinner("Draw");
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className={`relative bg-[#111] border border-green-500/30 p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-300 ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-green-400 mb-6 tracking-widest uppercase">Tic Tac Toe</h2>

                    <div className="grid grid-cols-3 gap-2 bg-green-900/20 p-2 rounded-lg mb-6">
                        {board.map((cell, index) => (
                            <button
                                key={index}
                                className={`w-20 h-20 text-4xl font-bold flex items-center justify-center rounded transition-colors
                                    ${cell === "X" ? "text-blue-400" : "text-red-400"}
                                    ${!cell && !winner ? "hover:bg-white/10" : ""}
                                    bg-[#222] border border-white/5
                                `}
                                onClick={() => handleCellClick(index)}
                                disabled={!!cell || !!winner}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>

                    {winner ? (
                        <div className="flex flex-col items-center gap-4 animate-bounce">
                            <p className="text-2xl font-bold text-white">
                                {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
                            </p>
                            <button
                                onClick={resetGame}
                                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-bold uppercase tracking-wider transition-colors"
                            >
                                Play Again
                            </button>
                        </div>
                    ) : (
                        <p className="text-white/70 text-lg">
                            Player <span className={currentPlayer === "X" ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>{currentPlayer}</span>'s Turn
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
