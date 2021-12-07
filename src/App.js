import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false},
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false},
]


function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurnes] = useState(0);
  const [choiceOne, setChoicesOne] = useState(null);
  const [choiceTwo, setChoicesTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));    
    
    setChoicesOne(null);
    setChoicesTwo(null);
    setCards(shuffleCards);
    setTurnes(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoicesTwo(card) : setChoicesOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true };
            } else {
              return card;
            };
          });
        });
        resetTurn();
      } else {
        setTimeout(() => { resetTurn() }, 1000);
      };
    }
  },[choiceOne, choiceTwo]);


  const resetTurn = () => {
    setChoicesTwo(null);
    setChoicesOne(null);
    setTurnes(setTurnes => setTurnes + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App"> 
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App