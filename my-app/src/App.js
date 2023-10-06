import logo from './logo.svg';
import './App.css';
import React from 'react';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key))
    },
  };
  function Title(props) {
  return <h1>{props.children}</h1>;
}
const Form = ({ updateCounter }) => {
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const hangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
  
  function handleinputChange(data) {
    const userValue = data.target.value;
    if(hangul(userValue)) {
      setErrorMessage('한글을 입력할 수 없습니다.');
    } else {
      setErrorMessage('');
    }
    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    // setErrorMessage('');
    if(value === '') {
      setErrorMessage('값이 없으므로 추가할 수 없습니다.');
      return;
    }
      updateCounter();
  }
    
  return (
  <form action="" onSubmit={handleFormSubmit}>
    <input type="text" name="name" 
      placeholder="상품명을 입력하세요" 
      onChange={handleinputChange}
      value={value}
      />
      <button type="submit">추가</button>
      <p style= {{color: "#ff003e", fontSize: "12px"}}>{errorMessage}</p>
      </form>
  );
}

const MainCard = ({ src, handleHeartClick, heart, choiceFavorites }) => {
  const heartIcon = choiceFavorites ? '💝' : '🤍'
    return (
      <div className="main-card">
        <img 
          src={src} 
          alt="올리브 오일" 
          width="400" 
          style= {{ border: "1px solid red" }}
        />
        <button onClick={handleHeartClick} >{heartIcon}{heart}</button>
      </div>
    );
  }
      
const FoodItem = ({ src }) => {
  return (
    <li>
      <img src={src} alt="음식" style={{width: "150px", height: "100px",backgroundSize: "contain" ,}}/>
    </li>
  );
}

const Favorites = ({ favorites }) => {
  return (
    <ul className="favorites">
      {favorites.map((food, index) => <FoodItem src={food} key={index + Date.now()} />)}
    </ul>
  );
}

const App = () => {
  const foodOne = 'img/food-one.jpg';
  const foodTwo = 'img/food-two.jpg';
  const foodThree = 'img/food-three.jpg';
  const [mainFood, setMainFood] = React.useState(foodOne);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || []
  });
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter')
  });
  const [heart, setHeart] = React.useState(() => {
    return (jsonLocalStorage.getItem('heartCounter'));
  });      
  // 하트 버튼
  const choiceFavorites = favorites.includes(mainFood);

  function updateCounter() {
    setCounter((pre) => {
      const nextCounter = pre + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });
    setMainFood(foodTwo);
  }

  function handleHeartClick() {
    setFavorites((pre) => {
      const nextFavorites = [...pre, mainFood];
      jsonLocalStorage.setItem('favorites', nextFavorites);
      return nextFavorites;
    })
    setHeart((pre) => {
      const nextHeart = (heart < 0 || pre + 1);
      jsonLocalStorage.setItem('heartCounter', nextHeart);
      return nextHeart;
    });
  }

  return (
    <div>
      <Title>페이지 {counter}</Title>
      <Form updateCounter={updateCounter} />
      <MainCard src={mainFood} handleHeartClick={handleHeartClick} heart={heart} choiceFavorites={choiceFavorites}/>
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
