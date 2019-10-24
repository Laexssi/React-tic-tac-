import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
   
    render() {
        return (
            <button className="square"
                    onClick={() => {this.props.onClick()}}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {

    renderSquare(i) {
<<<<<<< HEAD
       
=======
        console.log(i);
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
            return (
                <Square 
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
            />
        );
    }


  

    render() {
        

        return (
<<<<<<< HEAD
            <div className="board">
=======
            <div>
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
             
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
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            history: [{
                squares: Array(9).fill(null)
            }],
            isXNext: true,
            stepNumber: 0,
<<<<<<< HEAD
           
        };
       
        this.xWins = 0;
        this.oWins = 0;
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = [...current.squares]; 
=======
            
        };
    }
    
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = [...current.squares];
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
        if ( checkWinner(squares) || squares[i]) {
            return
        } else {
        squares[i] = this.state.isXNext? "X": "O";
        this.setState({
<<<<<<< HEAD
        history: [...history, ...[{squares: squares,
                                    latestSquareIndex: i}]], 
=======
        history: [...history, ...[{squares: squares}]], 
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
        isXNext: !this.state.isXNext,
        stepNumber: history.length});
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) === 0,
        })
    }

<<<<<<< HEAD
 
 


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const moves = history.map((squares, step) => {
            const latestSquareIndex = squares.latestSquareIndex;
            const col = 1 + latestSquareIndex % 3;
            const row = 1 + Math.floor(latestSquareIndex / 3)
            const stepDescription = step ?
            `Go to step №${step} at column #${col}, row #${row}`:
            'To start';
            return (
                <li key={step}>
                    <button
                    className= {step === this.state.stepNumber? "button info-moves-button selected": 
                    "button info-moves-button"} 
                    onClick = {() => this.jumpTo(step)}>{stepDescription}</button>
=======
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((squares, step) => {
            const stepNumber = step ?
            'Перейти к ходу № ' + step:
            'К началу игры';
            return (
                <li key={step}>
                    <button onClick = {() => this.jumpTo(step)}>{stepNumber}</button>
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
                </li>
            );
        });
  
<<<<<<< HEAD
        let status;
       

        if (checkWinner(current.squares)) {
           status =  "Winner is " + (this.state.isXNext? "O": "X") ;
          this.state.isXNext? this.oWins++: this.xWins++;
        } else status = "Next player: " + (this.state.isXNext? "X": "O");
         
        

        return (
            <div className="game">
                <div className="game-score">
                X     {this.xWins}:{this.oWins}     O
                {/* <button className="button score-button-reset"
                        onClick = {() => this.clearScores() }>Clear scores</button> */}
                </div> 
           
=======
        let status = checkWinner(current.squares)? "Winner is " + (this.state.isXNext? "O": "X")
        : "Next player: " + (this.state.isXNext? "X": "O");
        return (
            <div className="game">
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
                <div className="game-board">
                    <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info"> 
<<<<<<< HEAD
                    <div className="status">{status}</div>
                    <ul>{moves}</ul>
=======
                    <div> {status}</div>
                    <ol>{moves}</ol>
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
);

<<<<<<< HEAD


=======
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
function checkWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
<<<<<<< HEAD
          return {
             winner: squares[a]
            };
=======
          return squares[a];
>>>>>>> d7f112b43d861b4136b7ec0ddf868c3c75c48fc0
        }
      }
      return null;
    }