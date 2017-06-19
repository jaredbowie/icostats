import { expect } from 'chai';
import cryptopia from 'shared/lib/exchanges/cryptopia';

describe('Crytopia API Integration', function () {
  it('should support fetching listed pairs', async function () {
    const res = await cryptopia.fetchPairs();

    expect(res).to.include('GNO/BTC');
  });

  it('should support fetching tickers', async function () {
    const res = await cryptopia.fetchTicker('gno', 'btc');

    expect(res).to.be.a('number');
  });

  it('should support fetching priceMap', async function () {
    const boundPriceMap = await cryptopia.fetchBoundPriceMap();
    const fetchGNOBTCPrice = boundPriceMap['GNO/BTC'];
    const price = await fetchGNOBTCPrice();

    expect(price).to.be.a('number');
  });
});
