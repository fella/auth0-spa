import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { createAuth0Client } from '@auth0/auth0-spa-js';

(async () => {
  const auth0 = await createAuth0Client({
    domain: 'dev-n6li42pa7lfgyazm.us.auth0.com',
    client_id: '3C5Hpt3c8Vili4i58ORomBAsawDBlvmg',
    audience: 'https://api.harvest.org',
    cacheLocation: 'localstorage',
    useRefreshTokens: true
  });

  // Your logic...
})();


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
