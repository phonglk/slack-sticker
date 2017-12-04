import _ from 'lodash';

const candy = '11f712f3240e20c';

export function loadImgurAlbum(id) {
  return new Promise((resolve) => {
    fetch(`https://api.imgur.com/3/album/${id}/images`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Client-ID ${candy}`,
        Accept: 'application/json',
      }),
      mode: 'cors',
    })
    .then(resp => resp.json())
    .then(res => {
      const images = res.data;
      resolve(images.map(img => ({
        url: img.link.replace(/http:/, 'https:'),
      })));
    }).catch((error) => {
      console.error(`Error while loading ${id}: ${error.message}`);
      resolve([]);
    });
  });
}

export function gatherClientData() {
  const clientFn = () => {
    const apiVersionId = TS.boot_data.version_uid.substr(0, 8);
    const apiToken = TS.boot_data.api_token;
    const data = { apiVersionId, apiToken };
    document.body.dataset.clientData = window.JSON.stringify(data);
  }
  var script = document.createElement('script');
  script.textContent = '(' + clientFn.toString() + ')()';
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}

export function getClientData() {
  let modelObId;
  if (document.querySelector('#msgs_div ts-message')) {
    modelObId = document.querySelector('#msgs_div ts-message').dataset.modelObId;
  } else {
    modelObId = window.location.href.match(/messages\/([^/]+)/)[1]
  }
  return {
    ...JSON.parse(document.body.dataset.clientData),
    modelObId,
  };
}

function getTS() {
  const first = Math.round(new Date().getTime() / 1000)
  const second = '000' + _.padStart(Math.floor(Math.random() * 99), 3, '0');
  return first + '.' + second;
}

// export function sendMessage (message) {
//   const { apiToken, modelObId } = getClientData();
//   const url = `/api/chat.postMessage`;
//   const headers = new Headers({
//     'Content-type': 'application/json',
//     'Authorization': `Bearer ${apiToken}`,
//     'Origin': document.location.origin,
//   })
//   const payload = JSON.stringify({
//     channel: modelObId,
//     text: message,
//   })
//   return fetch(url, {
//     credentials: 'include',
//     method: 'POST',
//     headers,
//     body: payload,
//   })
// }

export function sendImage (imageUrl) {
  const { apiToken, modelObId } = getClientData();
  const url = `/api/chat.postMessage`;
  const headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
    'Origin': document.location.origin,
  })
  const payload = JSON.stringify({
    channel: modelObId,
    attachments: [
      {
          "fallback": "Slack Sticker cannot load this image",
          "color": "#36a64f",
          "image_url": imageUrl,
          "author_name": "Slack Sticker",
          "author_link": "https://chrome.google.com/webstore/detail/slack-sticker/djibdabhbdjgfipekjefbhijjjeagela",
          "ts": new Date().getTime() / 1000
      }
    ]
  })
  return fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers,
    body: payload,
  })
}