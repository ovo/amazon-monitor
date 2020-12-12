import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { webhook, delayTime, skus } from './util/config';
import delay from './util/helpers';
import sendWebhook from './util/discord';

const init = async (sku, prevStock) => {
  const url = `https://www.amazon.com/dp/${sku}`;
  const productRes = await fetch(url);

  if (!productRes.ok) {
    return init(sku, prevStock);
  }

  const productText = await productRes.text();
  const $ = cheerio.load(productText);
  const inStock = ($('#outOfStock').find().length > 0);

  if (prevStock === null) {
    return init(sku, inStock);
  }

  if (inStock !== prevStock) {
    const title = $('#productTitle').text().trim();
    const image = $('#landingImage').attr('data-old-hires');
    const status = inStock ? 'in stock' : 'out of stock';

    await sendWebhook({
      webhook,
      title,
      status,
      image,
      link: url,
    });
  }

  await delay(delayTime);
  return init(sku, inStock);
};

console.log('Monitor running');
skus.forEach((sku) => init(sku, null));
