import './App.css';
import confetti from "canvas-confetti"; //Fun stuff, import from npm install canvas-confetti
import { use, useState } from 'react';

const App = () => {
  const items = [
    {imageSrc: './secretary bird.jpg', ans: 'Secretary Bird', order: 'url(./acc.png)'},
    {imageSrc: './peregrine.jpg', ans: 'Peregrine Falcon', order: 'url(./fal.png)'},
    {imageSrc: './miner.jpg', ans: 'Noisy Miner', order: 'url(./pas.png)'},
    {imageSrc: './american crow.jpg', ans: 'American Crow', order: 'url(./pas.png)'},
    {imageSrc: './red tail.jpg', ans: 'Red Tailed Hawk', order: 'url(./acc.png)'},
    {imageSrc: './golden eagle.jpg', ans: 'Golden Eagle', order: 'url(./acc.png)'},
    {imageSrc: './raven.jpg', ans: 'Common Raven', order: 'url(./pas.png)'},
  ];
  const initialCard = {imageSrc: 'none', ans: 'Can you guess the bird?', order: ''}
  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const [reviewedCount, setReviewedCount] = useState(0); //Amount of cards seen
  const [currentIndex, setCurrentIndex] = useState(null); // Current index
  const [currCard, setCurrCard] = useState(initialCard);
  const [cardList, setCardList] = useState([...items]); // Allows things to be synced when shuffling
  const [state, setState] = useState(false); // State the card is in, false meaning unflipped, true being flipped
  const [userGuess, setGuess] = useState('');
  const [correct, setCorrect] = useState(false);

  const count = cardList.length;

  const handleChange = (e) => {
    setGuess(e.target.value);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currCard.ans.toLocaleLowerCase() == userGuess.toLocaleLowerCase()) {
      console.log("CORREVT");
      fireConfetti();
    } else {
      setCorrect(true);
      setTimeout(() => setCorrect(false), 400);
      return;
    }
  }

  const flipCard = () => {
    setState(state => !state);
  }

  const shuffle = () => {
    let n = cardList;
    for (let i = 0; i < n.length; i++) {
      let r = Math.floor(Math.random() * n.length);
      [n[i], n[r]] = [n[r], n[i]];
    }
    setCardList(n);
    setCurrCard(n[0]);
    setCurrentIndex(0);
    setReviewedCount(1);
  }

  const nextCard = () => {
    let index = currentIndex;
    if (currentIndex < count - 1) {
      index++;
    }
    //Increments counter
    if (reviewedCount < count) {
      setReviewedCount(reviewedCount + 1);
    }
    //Changes the card
    setCurrentIndex(index);
    setCurrCard(cardList[index]);
  }

  const prevCard = () => {
    let index = currentIndex;
    if (currentIndex > 0) {
      index--;
    }
    setCurrentIndex(index);
    setCurrCard(cardList[index]);
  }

  //Visual variables
  const flip = {
    transform: state ? "rotateY(0deg)" : "rotateY(180deg)",
    transition: "transform 0.8s"
  };
  const imgVisibility = currCard.imageSrc == 'none' ? 'none': 'unset';
  const mainText = currCard.imageSrc == 'none' ? "Can you guess the bird?" : "Whats this bird?";
  const buttonGreyOutPrev = currentIndex > 0 ? '' : 'greyedOut';
  const buttonGreyOutNext = currentIndex < (count - 1) ? '' : 'greyedOut';
  const isShaking = correct ? 'card shake' : 'card';

  return(
    <div className='App'>
      <div className='title'>
        <h1>Bird Cards!</h1>
        <h2>How good are you at guessing birbs!</h2>
      </div>

      <h3>{reviewedCount} out of {count} cards reviewed</h3>

      <div className="quiz">
        <div onClick={flipCard} className={isShaking} >
          <div className="flipCardInner" style={flip}>
              <div className="flipCardFront" style={{backgroundImage: currCard.order}}>
                <p><strong>{mainText}</strong></p>
                <img style={{display: imgVisibility}} src={currCard.imageSrc}></img>
              </div>
              <div className="flipCardBack" style={{backgroundImage: currCard.order}}>
                <p><strong>{currCard.ans}</strong></p>
              </div>
          </div>
        </div>
        <form className="formBox" onSubmit={handleSubmit}>
          <input placeholder="Make a guess!" type="text" onChange={handleChange} className='text'></input>
          <input type="submit" className='submit'></input>
        </form>

        <div className='actionBox'>
          <button onClick={prevCard} className={buttonGreyOutPrev}><strong>{'<'}</strong></button>
          <button onClick={nextCard} className={buttonGreyOutNext}><strong>{'>'}</strong></button>
          <button onClick={shuffle}><strong>Shuffle</strong></button>
        </div>
      </div>
    </div>
  

  );
}

export default App 