import { useEffect, useState } from "react";
import React from 'react';

function USDtoCoins({ prices }) {
  const [amount, setAmount] = React.useState("");
  const [inverted, setInverted] = React.useState(false);
  const onChange = (event) => {
    // console.log(event.target.value);
    setAmount(event.target.value);
    console.log(amount);
  };

  const reset = () => setAmount("");
  const onInvert = () => {
    reset();
    setInverted((current) => !current);
  };

  return (

    <div>
      <div>
        <label htmlFor="usd">USD</label>
        <input
          value={inverted ? amount * prices : amount}
          id="usd"
          placeholder="0"
          type="number"
          onChange={onChange}
          disabled={inverted}
        />
      </div>

      <div>
        <label htmlFor="coin">Coins</label>
        <input
          value={inverted ? amount : amount / prices}
          id="coin"
          placeholder="0"
          type="number"
          onChange={onChange}
          disabled={!inverted}
        />
      </div>
      <button onClick={reset}>Reset</button>
      <button onClick={onInvert}>{inverted ? "USD" : "Coins"}</button>
    </div>

  );
}

// ! 1. App이 실행 된다.
function App() {
  const [loading, setLoading] = useState (true);
  const [coins, setCoins] = useState ([]);
  const [price, setPrice] = useState(0);
  const onSelect = (event) => {
    setPrice(event.target.value)
    // console.log(event.target.value);
    // price = event.target.value
    // console.log(price);
  }

  useEffect(() => {
    // ! 3. fetch를 활용해 json 항목을 불러와 준다.
    fetch("https://api.coinpaprika.com/v1/tickers")
    // ! 4. .then(( response 객체는 fetch를 통해서 요청했을 때 웹서버가 응답한 결과를 담고있는 객체데이터이며, 객체 안에는 여러가지의 속성값을 통해서 서버와 통신 시 어떠한 상태로 통신이 이루워져있는지 알 수 있는 다양한 단서들이 들어있다.) => response.json / response에서 json 파일을 불러온다.())
    .then((response) => response.json())
    .then((json) => {
      // ! 5. 불러온 json 목록을 setCoins 함수를 사용해 coins라는 Array에 넣어준다.
      setCoins(json);
      // ! 6. setLoading 함수를 사용해 loading을 false로 변경해준다.
      setLoading(false);
    }
    );
  }, []);
  // console.log(coins)

  // ! 2. {loading ? 만약 loading이 true라면 Loading... 띄우고 : 아니라면 코인 목록을 불러온다. {coins.map / Array안의 모든 item을 수정 가능한 함수. 즉 위에 설정한 coins라는 Array에 coin을 넣어준다. ((coin의 정보를 가지고 온다. / 아무 이름 지정 가능, 원하면 banana라고 해도 되는데 그럴 경우에는 return을 banana.name등으로 작성해야 한다.) => <option>{coin의 이름을 불러온다.} ({coin의 symbol을 가지고 온다.}): {coin > quotes > USD > price를 가지고 온다.} USD</option>)}}
  return (
    <div>
      <h1>The Coins! {loading ?  "" : `(${coins.length})`}</h1>
      
      {loading ? <strong>Loading...</strong> :
            <select onChange={onSelect}>
              <option value="xx">Select Coins</option>
            {coins.map((coin) =>
            <option key={coin.id} value={(coin.quotes.USD.price)}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD</option>)}
          </select>
      }

      {price === 0 ? null : price === "xx" ? null : <USDtoCoins prices={price} />}
    </div>
  );
}

export default App;
