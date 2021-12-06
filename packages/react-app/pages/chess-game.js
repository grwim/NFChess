import React, { useState, useEffect } from "react";
import Timer from "react-compound-timer";
// Lines 5-8: Bring in chessboard and chess.js stuff
import { ChessInstance, ShortMove } from "chess.js";
import dynamic from "next/dynamic";
import { Web3Consumer } from "../helpers/Web3Context";
const Chess = require("chess.js");
import { InjectedConnector } from '@web3-react/injected-connector'

const paddingStyle = {
  padding: 5
}

const marginStyle = {
  margin: 5
}

const Chessboard = dynamic(
  () => {
    return import('chessboardjsx')

  },
  { ssr: false }
);

function ChessGame({web3}) {
  const { address, readContracts, writeContracts, tx, localProvider, mainnetProvider, blockExplorer } = web3

  const [chess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [fen, setFen] = useState(chess.fen());

  const [mintAddress, setMintAddress] = useState('Please provide a destination address');
  const [displayMint, setDisplayMint] = useState(false);   

  class MintForm extends React.Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      setMintAddress(event.target.value)
    }
  
    handleSubmit(event) {
      // tx(writeContracts.YourCollectible.mintItem(mintAddress, 'dummyURI'));
      tx(writeContracts.YourCollectible.mintItem(mintAddress, 'dummyURI'))

      alert('An NFChess is on its way to' + mintAddress);
      event.preventDefault();
    }
  
    render() {
      return (
        <div>
          <div>Mint an NFT!</div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea value={mintAddress} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  const handleMove = (move) => {
    
    const possibleMoves = chess.moves();
    if (chess.game_over() || chess.in_checkmate() || possibleMoves.length === 0) {
      setDisplayMint(true);
      alert('Congrats, you won! Mint yourself an NFT');
      return; // exit if the game is over 
    }

    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
    }

    if (chess.game_over() || chess.in_checkmate() || possibleMoves.length === 0) {
      setDisplayMint(true);
      alert('Congrats, you won! Mint yourself an NFT');
    }
  };

  return (
    <div className="flex-center">
      <h1>Random Chess</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
      <div>{ displayMint ? < MintForm /> : null }</div>
    </div>
  );
};

export default Web3Consumer(ChessGame);

// <Timer initialTime={0} startImmediately={false}>
// {/* I thought this was weird. Definitely a better way to do this, but I just wanted it to work. */}
// {({ start, resume, pause, stop, reset, timerState } : {start, resume, pause, stop, reset, timerState:any}) => (
//     <>
//         <div>
//             <span style={paddingStyle}><Timer.Minutes /> minutes</span>
//             <span style={paddingStyle}><Timer.Seconds /> seconds</span>
//             <span style={paddingStyle}><Timer.Milliseconds /> milliseconds</span>
//         </div>
//         <div style={paddingStyle}>{timerState}</div>
//         <br />
//         <div>
//             <button style={marginStyle} onClick={start}>Start</button>
//             <button style={marginStyle} onClick={pause}>Pause</button>
//             <button style={marginStyle} onClick={resume}>Resume</button>
//             <button style={marginStyle} onClick={stop}>Stop</button>
//             <button style={marginStyle} onClick={reset}>Reset</button>
//         </div>
//     </>
// )}
// </Timer>