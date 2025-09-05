import React, { useEffect, useState } from 'react';
import { SudokuCell } from '../../components/SudokuCell';
import { useSudokuStore } from '../sudoku/store';
import { hasCellError, formatTime } from '../../utils/sudoku';
import type { SudokuDifficulty } from '../../types/sudoku';

const DIFFICULTIES: SudokuDifficulty[] = [
  { name: 'easy', label: 'Easy', description: 'Perfect for beginners', blanks: 36 },
  { name: 'medium', label: 'Medium', description: 'A moderate challenge', blanks: 46 },
  { name: 'hard', label: 'Hard', description: 'For experienced players', blanks: 52 },
  { name: 'expert', label: 'Expert', description: 'The ultimate challenge', blanks: 58 }
];

export const SudokuGame: React.FC = () => {
  const {
    puzzle,
    currentGrid,
    selectedCell,
    isCompleted,
    hasErrors,
    startTime,
    endTime,
    difficulty,
    stats,
    hintsUsed,
    maxHints,
    newGame,
    selectCell,
    setCellValue,
    clearCell,
    resetGame,
    getHint
  } = useSudokuStore();

  const [currentTime, setCurrentTime] = useState(0);

  // Update timer
  useEffect(() => {
    if (isCompleted || !startTime) return;

    const interval = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isCompleted]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;
      
      if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key, 10);
        setCellValue(row, col, num);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        setCellValue(row, col, null);
      } else if (e.key === 'ArrowUp' && row > 0) {
        selectCell(row - 1, col);
      } else if (e.key === 'ArrowDown' && row < 8) {
        selectCell(row + 1, col);
      } else if (e.key === 'ArrowLeft' && col > 0) {
        selectCell(row, col - 1);
      } else if (e.key === 'ArrowRight' && col < 8) {
        selectCell(row, col + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, setCellValue, selectCell]);

  useEffect(() => {
    const isEmpty = puzzle.every(row => row.every(cell => cell === null));
    if (isEmpty) {
      newGame('easy');
    }
  }, [puzzle, newGame]);

  const handleNewGame = (newDifficulty: 'easy' | 'medium' | 'hard' | 'expert') => {
    newGame(newDifficulty);
    setCurrentTime(0);
  };

  const handleHint = () => {
    const result = getHint();
    if (!result) {
      console.log('No hints available or limit reached');
    }
  };

  const displayTime = endTime ? Math.floor((endTime - startTime) / 1000) : currentTime;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Game Board */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Game Info */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600">
                  Difficulty: <span className="text-gray-900 capitalize">{difficulty}</span>
                </span>
                <span className="text-sm font-medium text-gray-600">
                  Time: <span className="text-gray-900">{formatTime(displayTime)}</span>
                </span>
              </div>
              {hasErrors && (
                <span className="text-red-600 text-sm font-medium">
                  ⚠️ Check for errors
                </span>
              )}
            </div>

            {/* Sudoku Grid */}
            <div className="grid grid-cols-9 gap-0 border-2 border-gray-800 mx-auto w-fit">
              {currentGrid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isOriginal = puzzle[rowIndex][colIndex] !== null;
                  const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                  const hasError = hasCellError(currentGrid, rowIndex, colIndex);

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-gray-800' : ''}
                        ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-gray-800' : ''}
                      `}
                    >
                      <SudokuCell
                        value={cell}
                        isOriginal={isOriginal}
                        isSelected={isSelected}
                        hasError={hasError}
                        onSelect={() => selectCell(rowIndex, colIndex)}
                        onChange={(value) => setCellValue(rowIndex, colIndex, value)}
                      />
                    </div>
                  );
                })
              )}
            </div>

            {isCompleted && (
              <div className="mt-6 text-center p-4 bg-green-100 rounded-lg border border-green-300">
                <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
                <p className="text-green-700">
                  You completed the puzzle in {formatTime(displayTime)}!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Game</h3>
            <div className="grid grid-cols-2 gap-2">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff.name}
                  onClick={() => handleNewGame(diff.name)}
                  className={`
                    p-3 rounded-lg text-sm font-medium transition-colors
                    ${difficulty === diff.name 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Game Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Controls</h3>
            <div className="space-y-2">
              <button
                onClick={clearCell}
                disabled={!selectedCell || puzzle[selectedCell?.row || 0][selectedCell?.col || 0] !== null}
                className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear Cell
              </button>
              <button
                onClick={handleHint}
                disabled={isCompleted || hintsUsed >= maxHints}
                className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Get Hint ({maxHints - hintsUsed} left)
              </button>
              <button
                onClick={resetGame}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset Game
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-medium">{stats.gamesPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Games Completed:</span>
                <span className="font-medium">{stats.gamesCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Time:</span>
                <span className="font-medium">
                  {stats.bestTime ? formatTime(stats.bestTime) : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Time:</span>
                <span className="font-medium">
                  {stats.averageTime ? formatTime(stats.averageTime) : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Streak:</span>
                <span className="font-medium">{stats.streakCurrent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Streak:</span>
                <span className="font-medium">{stats.streakBest}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
