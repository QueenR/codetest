import React, { useState, useEffect } from 'react';
import './App.css';
import PuzzlePiece from './components/PuzzlePiece';
import { nrOfCols, nrOfRows } from './constants';
import Button from './components/Button';

function shuffleArray(array: number[]): number[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function getMatrixPosition(index: number) {
  return {
    row: Math.floor(index / nrOfCols),
    col: index % nrOfCols,
  };
}

function isSolved(pieces: any) {
  for (let i = 0, l = pieces.length; i < l; i++) {
    if (pieces[i] !== i + 1) {
      return false;
    }
  }
  return true;
}

function App() {
  const totalNrOfPieces = nrOfCols * nrOfRows;
  const [pieces, setPieces] = useState<number[]>(Array.from({ length: totalNrOfPieces }, (_, index) => index + 1));
  const [isInitialized, setIsInitialized] = useState(false);

  //In order to move multiple pieces horizontal/vertival I think it would be necessary to use another data structure instead of an array, to easier control and move the pieces, for ex a two dimensional array
  // const pieceMap = useState<{
  //   [rowId: number]: number[];
  // }>()

  useEffect(() => {
    shufflePieces();
    setIsInitialized(true);
  }, []);

  const shufflePieces = () => {
    setPieces(shuffleArray(pieces));
  };

  const movePiece = (index: number) => {
    if (canMove(index, pieces.indexOf(totalNrOfPieces))) {
      const swopPiece = move(pieces, index, pieces.indexOf(totalNrOfPieces))
      setPieces(swopPiece)
    }
  }

  //Possible steps to move the pieces horizontal/vetical
  // const moveMultiplePieces = (rowId, colId) => {
  // Check if rowId or ColId is on same row as empty piece
  //   if (true) {
  // Move all pieces between clicked piece and empty piece one step
  // the clicked row+col will always be the empty one.
  //   }
  // }

  const canMove = (index: number, emptyPieceIndex: number) => {
    const sourcePos = getMatrixPosition(index);
    const destionationPos = getMatrixPosition(emptyPieceIndex);

    //Check if the same row or col, if true the pieces can be moved
    // return sourcePos.row === destionationPos.row || sourcePos.col === destionationPos.col;
    return Math.abs(sourcePos.col - destionationPos.col) + Math.abs(sourcePos.row - destionationPos.row) === 1;
  }

  const move = (pieces: number[], index: number, emptyPieceIndex: number) => {
    const arr = [...pieces];
    const temp = pieces[index];
    arr[emptyPieceIndex] = temp;
    arr[index] = pieces[emptyPieceIndex];
    return arr;
  }

  const hasWon = isInitialized && isSolved(pieces);

  return (
    <div className="p-2 font-['Open_Sans']">
      <header className="flex flex-col">
        <h1 className="text-4xl font-bold text-center">{totalNrOfPieces} puzzle 🧩</h1>
      </header>
      <section className="flex flex-col items-center">
        <div className={`bg-gray-300 border-black grid grid-cols-${nrOfCols} grid-rows-${nrOfRows} gap-0 my-5`}>
          {pieces.map((item, index) => (
            <PuzzlePiece onClick={() => movePiece(index)} key={item} number={item} isEmptyPiece={item === totalNrOfPieces} />
          ))}
        </div>
        <Button text="Slumpa" onClick={shufflePieces} />
        {hasWon && <p className="text-lg my-4">Grattis! Du har vunnit.</p>}
      </section>
    </div>
  );
}

export default App;
