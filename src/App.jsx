import './App.css';
import { use, useState } from 'react';

const App = () => {
  const items = [
    {imageSrc: './secretary bird.jpg', ans: 'Secretary Bird', difficulty: 'yellow'},
    {imageSrc: './peregrine.jpg', ans: 'Peregrine Falcon', difficulty: 'green'},
    {imageSrc: './miner.jpg', ans: 'Noisy Miner', difficulty: 'red'},
    {imageSrc: './american crow.jpg', ans: 'American Crow', difficulty: 'green'},
    {imageSrc: './red tail.jpg', ans: 'Red Tailed Hawk', difficulty: 'yellow'},
    {imageSrc: './golden eagle.jpg', ans: 'Golden Eagle', difficulty: 'green'},
    {imageSrc: './raven.jpg', ans: 'Common Raven', difficulty: 'red'},
  ];

  const [reviewedCount, setReviewedCount] = useState(0);
  const [cardsReviewed, setCardsReviewed] = useState(Array(items.length).fill(0));
  const [displayImg, setDisplayImg] = useState('none');
  const [mainText, setMainText] = useState("Can you guess the bird?");
  const [currAns, setCurrAns] = useState(mainText);
  const [currentImg, setCurrentImg] = useState(null);

  const count = items.length;

  const flipCard = () => {
    if (displayImg === 'none' && reviewedCount !== 0) {
      setMainText("What's this bird?")
      setDisplayImg("unset");
    } else {
      setMainText(currAns);
      setDisplayImg("none");
    }
  }

  const nextCard = () => {
    let index = Math.floor(Math.random() * items.length);
    if (cardsReviewed[index] == 0) {
      setReviewedCount(reviewedCount + 1);
      let updated = [...cardsReviewed];
      updated[index] = 1;
      setCardsReviewed(updated);
    }
    setCurrAns(items[index].ans);
    setCurrentImg(items[index].imageSrc);
    setMainText("What's this bird?")
    setDisplayImg("unset");
  }

  return(
    <div className='App'>
      <div className='title'>
        <h1>Bird Cards!</h1>
        <h2>How good are you at guessing birbs!</h2>
        <h3>Total card count: {count} </h3>
        <h3>Total reviewed: {reviewedCount} </h3>
      </div>

      <div className="quiz">
        <div onClick={flipCard} className='card'>
          <p>{mainText}</p>
          <img style={{display: displayImg}} src={currentImg}></img>
        </div>
        <button onClick={nextCard}>Next!</button>
      </div>
    </div>
  

  );
}

export default App 