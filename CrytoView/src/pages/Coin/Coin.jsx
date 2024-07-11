import React, { useContext, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
const Coin = () => {

    const {coinId}=useParams();
    const[coinData,setCoinData]=useState();
    const[historicalData,setHistoricalData]=useState();
    const{currency}=useContext(CoinContext);

    const fetchCoinData=async ()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-SEjJ3vwiXAPrFtPMvcWnkBLA'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(response => response.json())
            .then(response => setCoinData(response))
            .catch(err => console.error(err));
    }
    const fetchHistoricalData=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-SEjJ3vwiXAPrFtPMvcWnkBLA'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(response => response.json())
            .then(response => setHistoricalData(response))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
       fetchCoinData();
       fetchHistoricalData();
    },[currency])


  if(coinData,historicalData){
  return (
    <div className='coin'>
        <div className="coin-name">
            <img src={coinData.image.large} alt="" />
            <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
            <LineChart historicalData={historicalData}></LineChart>
        </div>
        <div className='coin-info'>
            <ul>
                <li>
                    Crypto Market Rank
                </li>
                <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
                <li>
                    Current Price
                </li>
                <li>{currency.symbol} {coinData.market__data.current_price[currency.name].toLocalString()}</li>
            </ul>
            <ul>
                <li>
                    Market cap
                </li>
                <li>{currency.symbol} {coinData.market__data.market_cap[currency.name].toLocalString()}</li>
            </ul>
            <ul>
                <li>
                    24 hour high 
                </li>
                <li>{currency.symbol} {coinData.market__data.high_24h[currency.name].toLocalString()}</li>
            </ul>
            <ul>
                <li>
                    24 hour Low
                </li>
                <li>{currency.symbol} {coinData.market__data.low_24h[currency.name].toLocalString()}</li>
            </ul>
        </div>
      
    </div>
  )}
  else{
    return (
        <div className='spinner'>
            <div className="spin">
                
            </div>
          
        </div>
    )
  }
}

export default Coin
