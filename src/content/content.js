import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

console.log('Slack Sticker Loaded successfully');
document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  root.classList.add('slack-sticker-extension-root');
  document.querySelector('#msg_form').appendChild(root);
  ReactDOM.render(<App />, root);
});
