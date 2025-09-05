import { SudokuGame } from '../../features/sudoku/SudokuGame';
import DashboardHeader from '../../components/DashboardHeader';

export default function DashboardSudokuGamePage() {
  return (
    <div className="lg:col-span-10">
      <DashboardHeader 
        title="Sudoku" 
        description="Exercise your logical thinking with number puzzles"
      />
      
      <div className="bg-gray-50 min-h-screen">
        <SudokuGame />
      </div>
    </div>
  );
}
