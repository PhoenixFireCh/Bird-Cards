import './App.css';
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

  const [reviewedCount, setReviewedCount] = useState(0);
  const [cardsReviewed, setCardsReviewed] = useState(Array(items.length).fill(0));
  const [state, setState] = useState(false);
  const [imgVisibility, setImgVisibility] = useState("none");
  const [cardBackground, setCardBackground] = useState('none');
  const [mainText, setMainText] = useState("Can you guess the bird?");
  const [currAns, setCurrAns] = useState(mainText);
  const [currentImg, setCurrentImg] = useState(null);

  const count = items.length;

  const flipCard = () => {
    setState(state => !state);
  }

  const nextCard = () => {
    let index = Math.floor(Math.random() * items.length);
    //Increments counter
    if (cardsReviewed[index] == 0) {
      setReviewedCount(reviewedCount + 1);
      let updated = [...cardsReviewed];
      updated[index] = 1;
      setCardsReviewed(updated);
    }
    //Changes background
    setCardBackground(items[index].order);

    setCurrAns(items[index].ans);
    setMainText("Whats this bird?");
    setCurrentImg(items[index].imageSrc);
    setImgVisibility("unset");
  }

  const flip = {
    transform: state ? "rotateY(0deg)" : "rotateY(180deg)",
    transition: "transform 0.8s"
  };

  return(
    <div className='App'>
      <div className='title'>
        <h1>Bird Cards!</h1>
        <h2>How good are you at guessing birbs!</h2>
      </div>

      <h3>{reviewedCount} out of {count} cards reviewed</h3>

      <div className="quiz">
        <div onClick={flipCard} className='card'>
          <div className="flipCardInner" style={flip}>
              <div className="flipCardFront" style={{backgroundImage: cardBackground}}>
                <p><strong>{currAns}</strong></p>
              </div>
              <div className="flipCardBack" style={{backgroundImage: cardBackground}}>
                <p><strong>{mainText}</strong></p>
                <img style={{display: imgVisibility}} src={currentImg}></img>
              </div>
          </div>
        </div>
        <button onClick={nextCard}><strong>Next!</strong></button>
      </div>
    </div>
  

  );
}

export default App 