import fetch from 'node-fetch';

const sendWebhook = ({
  webhook, title, status, image, link,
}) => fetch(webhook, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    embeds: [{
      title: `[Amazon] ${title} is ${status}`,
      url: link,
      thumbnail: {
        url: image,
      },
    }],
  }),
});

export default sendWebhook;
