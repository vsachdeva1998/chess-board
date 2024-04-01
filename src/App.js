import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const ChessSquare = ({ isBlack }) => {
  const color = isBlack ? 'black' : 'white';
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: color,
      }}
    ></div>
  );
};

const App = () => {
  const [dimension, setDimension] = useState(0);
  const [chess, setChess] = useState([]);

  const makeChessBoard = (dim) => {
    let arr = [];
    for (let i = 0; i < dim; i++) {
      let temp = [];
      for (let j = 0; j < dim; j++) {
        temp.push((i + j) % 2 !== 0);
      }
      arr.push(temp);
    }
    return arr;
  };

  const memoizedChessboard = useMemo(() => makeChessBoard(dimension), [
    dimension,
  ]);

  useEffect(() => {
    setChess(memoizedChessboard);
  }, [memoizedChessboard]);

  return (
    <div className='chess'>
      <div>
        <h2>
          <span>NXN</span>
          ChessBoard
        </h2>
        <input
          type='number'
          placeholder='Enter the Dimension'
          onChange={(e) => setDimension(parseInt(e.target.value))}
        />
      </div>
      <section
        style={{
          width: 100 * dimension,
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '20px',
          boxShadow: `0px 10px 10px rgba(0,0,0.1)`,
        }}
      >
        {chess.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((isBlack, colIndex) => (
              <ChessSquare key={colIndex} isBlack={isBlack} />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default App;