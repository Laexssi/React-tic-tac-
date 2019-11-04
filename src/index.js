import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
		const isHighlated = this.props.isHighlated;
    return (
      <button
        className= {isHighlated ? "square  highlight": "square"} 
        onClick={() => {
          this.props.onClick();
        }}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
		const winnerLines = this.props.winnerLines;
    return (
      <Square
			  key = {i}
			  isHighlated = {winnerLines && winnerLines.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      isXNext: true,
			stepNumber: 0,
		
    };

    this.xWins = 0;
    this.oWins = 0;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (checkWinner(squares).winner || squares[i]) {
      return;
    } else {
      squares[i] = this.state.isXNext ? "X" : "O";
      this.setState({
        history: [...history, ...[{ squares: squares, latestSquareIndex: i }]],
        isXNext: !this.state.isXNext,
				stepNumber: history.length,
				isAscending: true
      });
    }
  }

	handleSort() {
		this.setState({
			isAscending: !this.state.isAscending
		})
	}


  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isXNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winnerObj = checkWinner(current.squares);
		const isAscending = this.state.isAscending
		console.log(history);
    const moves = history.map((squaresAndIndex, step) => {
      const latestSquareIndex = squaresAndIndex.latestSquareIndex;
      const col = 1 + (latestSquareIndex % 3);
      const row = 1 + Math.floor(latestSquareIndex / 3);
      const stepDescription = step
        ? `Go to step №${step} at column #${col}, row #${row}`
        : "Go to start";
      return (
        <li key={step}>
          <button
            className={
              step === this.state.stepNumber
                ? "button info-moves-button selected"
                : "button info-moves-button"
            }
            onClick={() => this.jumpTo(step)}
          >
            {stepDescription}
          </button>
        </li>
      );
    });
		if  (!isAscending) moves.reverse();
    let status;

    if (winnerObj.winner) {
      status = "Winner is " + (winnerObj.winner);
			this.state.isXNext ? this.oWins++ : this.xWins++;
    } else {
      if (winnerObj.isDraw) {
				status = "Draw"
			}
		 else status = "Next player: " + (this.state.isXNext ? "X" : "O");
		}

    return (
      <div className="game">
        <div className="game-score">
          X {this.xWins}:{this.oWins} O
          {/* <button className="button score-button-reset"
                        onClick = {() => this.clearScores() }>Clear scores</button> */}
        </div>

        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}  
					  winnerLines={winnerObj.winnerLines}/>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
					<button onClick = {() => this.handleSort()} className="button button-sort"> 
					{isAscending? "Sort by reverse": "Sort by normal"}
					</button>
          <ul>{moves}</ul>
        </div>
				
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
				winner: squares[a],
				winnerLines: lines[i],
				isDraw: false,
      };
    }
	}
	let isDraw = true;
	for (let i = 0; i < lines.length; i++) {
		if (squares[i] === null) {
			isDraw = false;
			break;
		}
	}
  return {
		winner: null,
		winnerLines: null,
		isDraw: isDraw
	}
}
