import { Web3Consumer } from "../helpers/Web3Context";
import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";

const { Chess } = require('../../../node_modules/chess.js')
// const chess = new Chess()

import Chessboard from '../../../node_modules/chessboardjsx'

// while (!chess.game_over()) {
//     const moves = chess.moves()
//     const move = moves[Math.floor(Math.random() * moves.length)]
//     chess.move(move)
// }

console.log(chess.pgn())

function ChessGame({web3}) {
    const { readContracts, localProvider, mainnetProvider } = web3;
    const [ gameWon, setGameWon ] = useState();

    React.useEffect(() => {
        // window is accessible here.
      }, []);
  
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div>
            <Chessboard position="start"/>    
        </div>
        {/* <div style={{ paddingTop: 32, width: 740, margin: "auto" }}>
          <Input
            value={ipfsDownHash}
            placeHolder="IPFS hash (like QmadqNw8zkdrrwdtPFK1pLi8PPxmkQ4pDJXY8ozHtz6tZq)"
            // onChange={e => {
            //   setIpfsDownHash(e.target.value);
            // }}
          />
        </div>
        <Button
          style={{ margin: 8 }}
          loading={sending}
          size="large"
          shape="round"
          type="primary"
          onClick={async () => {
            console.log("DOWNLOADING...", ipfsDownHash);
          }}
        >
          ...
        </Button>
  
        <pre style={{ padding: 16, width: 500, margin: "auto" }}>{ipfsContent}</pre> */}
      </div>
    );
  }

export default Web3Consumer(ChessGame);