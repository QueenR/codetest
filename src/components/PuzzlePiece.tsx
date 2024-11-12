import React from 'react';

function PuzzlePiece({ number, onClick, isEmptyPiece }: any) {
    return (
        <button onClick={onClick} className={`text-xl text-center bg-blue-200 p-4 rounded border border-black ${isEmptyPiece ? 'opacity-0' : ''}`}>{number}</button>
    );
}

export default PuzzlePiece;
