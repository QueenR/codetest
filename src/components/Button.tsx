import React from 'react';

function Button({ text, onClick }: any) {
    return (
        <button onClick={onClick} className="tracking-wider bg-black hover:bg-gray-500 text-white font-bold py-2 px-4">{text}</button>
    );
}

export default Button;