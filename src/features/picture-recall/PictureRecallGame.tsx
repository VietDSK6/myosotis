import React, { useEffect, useState } from 'react';
import { GameCard } from './components/GameCard';
import { usePictureRecallStore } from './store';
import { getGridLayout, formatTime } from '../../utils/picture-recall';
import type { PictureRecallDifficulty } from '../../types/picture-recall';

const DIFFICULTIES: { value: PictureRecallDifficulty; label: string; description: string }[] = [
  { value: 3, label: '3 Pairs', description: 'Easy - 6 cards' },
  { value: 4, label: '4 Pairs', description: 'Medium - 8 cards' },
  { value: 5, label: '5 Pairs', description: 'Hard - 10 cards' }
];

const GAME_MODES: { value: 'flags' | 'things'; label: string; description: string }[] = [
  { value: 'flags', label: 'Flags', description: 'Country flags' },
  { value: 'things', label: 'Objects', description: 'Everyday items' }
];

export const PictureRecallGame: React.FC = () => {
  const {
    cards,
    selectedCards,
    matchedPairs,
    totalPairs,
    moves,
    isGameComplete,
    difficulty,
    gameMode,
    showPreview,
    previewTime,
    startTime,
    endTime,
    stats,
    newGame,
    flipCard,
    resetGame,
    clearStats,
    cleanup
  } = usePictureRecallStore();

  const [currentTime, setCurrentTime] = useState(0);

  // Update timer
  useEffect(() => {
    if (isGameComplete || !startTime || showPreview) return;

    const interval = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isGameComplete, showPreview]);

  // Initialize with default game
  useEffect(() => {
    if (cards.length === 0) {
      newGame(3, 'flags');
    }
  }, [cards.length, newGame]);

  // Cleanup intervals when component unmounts or navigates away
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const handleNewGame = (newDifficulty: PictureRecallDifficulty, newGameMode: 'flags' | 'things') => {
    newGame(newDifficulty, newGameMode);
    setCurrentTime(0);
  };

  const { cols } = getGridLayout(difficulty);
  const displayTime = endTime ? Math.floor((endTime - startTime!) / 1000) : currentTime;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{moves}</div>
                    <div className="text-gray-600">Moves</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{matchedPairs}/{totalPairs}</div>
                    <div className="text-gray-600">Pairs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {showPreview ? previewTime : formatTime(displayTime)}
                    </div>
                    <div className="text-gray-600">
                      {showPreview ? 'Preview' : 'Time'}
                    </div>
                  </div>
                </div>
              </div>

              {showPreview && (
                <div className="text-center mb-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-800 font-medium">
                    Memorize the positions! Game starts in {previewTime} seconds...
                  </p>
                </div>
              )}

              <div 
                className={`grid gap-3 mx-auto max-w-4xl`}
                style={{ 
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  aspectRatio: cols === 5 ? '5/2' : cols === 4 ? '4/2' : '3/2'
                }}
              >
                {cards.map((card) => (
                  <GameCard
                    key={card.id}
                    card={card}
                    onFlip={flipCard}
                    disabled={showPreview || selectedCards.length >= 2}
                  />
                ))}
              </div>

              {isGameComplete && (
                <div className="mt-6 text-center p-4 bg-gray-100 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Congratulations!</h3>
                  <p className="text-gray-700">
                    You completed the puzzle in {moves} moves and {formatTime(displayTime)}!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">New Game</h3>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty</label>
                <div className="grid grid-cols-1 gap-2">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => handleNewGame(diff.value, gameMode)}
                      className={`
                        p-3 rounded-lg text-sm font-medium transition-colors text-left
                        ${difficulty === diff.value 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      <div>{diff.label}</div>
                      <div className="text-xs opacity-75">{diff.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Mode Selection */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Theme</label>
                <div className="grid grid-cols-1 gap-2">
                  {GAME_MODES.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => handleNewGame(difficulty, mode.value)}
                      className={`
                        p-3 rounded-lg text-sm font-medium transition-colors text-left
                        ${gameMode === mode.value 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      <div>{mode.label}</div>
                      <div className="text-xs opacity-75">{mode.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetGame}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset Current Game
              </button>
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
                
                {/* Best Stats by Difficulty */}
                {DIFFICULTIES.map((diff) => (
                  <div key={diff.value} className="border-t pt-2">
                    <div className="font-medium text-gray-800 mb-1">{diff.label}</div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Best Moves:</span>
                      <span>{stats.bestMoves[diff.value] ?? '-'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Best Time:</span>
                      <span>{stats.bestTime[diff.value] ? formatTime(stats.bestTime[diff.value]!) : '-'}</span>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={clearStats}
                  className="w-full mt-4 px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  Clear Statistics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
