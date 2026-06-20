import './App.css';
import confetti from "canvas-confetti"; //Fun stuff, import from npm install canvas-confetti
import birds from "./birds.json"
import { use, useState } from 'react';

const App = () => {
  const count = birds.birds.length;
  const initialCard = {imageSrc: 'none', ans: 'Can you guess the bird?', order: ''}
  const [currCard, setCurrCard] = useState(initialCard); // The current card object active
  const [cardList, setCardList] = useState([...birds.birds]); // Allows things to be synced when shuffling
  const [reviewedCount, setReviewedCount] = useState(0); //Amount of cards seen
  const [streak, setStreak] = useState(Array(count).fill(0)); // The streak on whether each index is correct (prevents streak spamming).
  const [longestStreak, setLongestStreak] = useState(0); // The longest streak
  const [currentIndex, setCurrentIndex] = useState(-1); // Current index
  const [state, setState] = useState(false); // State the card is in, false meaning unflipped, true being flipped
  const [userGuess, setGuess] = useState(''); // Current user guess
  const [incorrect, setIncorrect] = useState(false); //Whether the answer is incorrect (activates shake)
  const fireConfetti = () => { //Confetti :>
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleChange = (e) => { // Handles guess change
    setGuess(e.target.value);
  }
  
  const handleSubmit = (e) => { //Handles the submit upon hitting form submit and checks user answer.
    e.preventDefault();
    if (state) { // Prevents guessing while flipped
      setIncorrect(true);
      setTimeout(() => setIncorrect(false), 400);
      return;
    }
    if (currCard.ans.toLocaleLowerCase() == userGuess.toLocaleLowerCase()) {
      let newStreak = [...streak]; 
      newStreak[currentIndex] = 1;
      setStreak(newStreak);
      let updatedStreak = newStreak.reduce((a, b) => a + b, 0);
      if (updatedStreak > longestStreak) {
        setLongestStreak(updatedStreak);
      }
      fireConfetti();
    } else {
      setStreak(Array(count).fill(0));
      setIncorrect(true);
      setTimeout(() => setIncorrect(false), 400);
      return;
    }
  }

  const flipCard = () => { // Flips the card state
    setState(state => !state);
  }

  const shuffle = () => { // Shuffles the card and resets everything
    let n = cardList;
    for (let i = 0; i < n.length; i++) {
      let r = Math.floor(Math.random() * n.length);
      [n[i], n[r]] = [n[r], n[i]];
    }
    setStreak(Array(count).fill(0));
    setCardList(n);
    setCurrCard(n[0]);
    setCurrentIndex(0);
    setReviewedCount(1);
  }

  const nextCard = () => { // Moves onto the next card
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

  const prevCard = () => { // Moves back to the previous card
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
  const isShaking = incorrect ? 'card shake' : 'card';

  return(
    <div className='App'>
      <div className='title'>
        <h1>Bird Cards!</h1>
        <h2>How good are you at guessing birbs!</h2>
      </div>

      <div className='stats'>
        <h3>{reviewedCount} out of {count} cards reviewed</h3>
        <h3>🔥 Current streak {streak.reduce((a, b) => a + b, 0)}</h3>
        <h3>🐦‍🔥 Highest streak {longestStreak}</h3>
      </div>

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