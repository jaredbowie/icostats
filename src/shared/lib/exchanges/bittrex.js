import fetch from 'isomorphic-fetch';

const baseUrl = 'https://bittrex.com/api/v1.1/public';

export async function fetchTicker(a, b, raw = false) {
  const pair = `${a.toUpperCase()}-${b.toUpperCase()}`;
  const url = `${baseUrl}/getticker?market=${pair}`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json.result;
  }

  return json.result.Last;
}

export async function fetchPairs(raw = false) {
  const url = `${baseUrl}/getmarkets`;
  const res = await fetch(url);
  const json = await res.json();

  if (raw) {
    return json.result;
  }

  return json.result.map(el => el.MarketName);
}

export async function fetchPrices() {
  const url = `${baseUrl}/getmarkets`;
  const res = await fetch(url);
  const json = await res.json();
  const pairs = json.result.map(el => el.MarketName);
  const priceMap = {};

  pairs.forEach((data) => {
    const { MarketName, BaseCurrency, MarketCurrency } = data;

    priceMap[MarketName] = fetchTicker.bind(null, BaseCurrency, MarketCurrency);
  });

  return priceMap;
}

export default {
  fetchPairs,
  fetchTicker,
  fetchPrices
};
