import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

const loginBtn = document.getElementById('login') as HTMLButtonElement | null;
const output = document.getElementById('output') as HTMLElement | null;

const show = (msg: string): void => {
  if (output) {
    output.textContent += `\n${msg}`;
  }
};

(async (): Promise<void> => {
  const auth0: Auth0Client = await createAuth0Client({
    domain: 'dev-n6li42pa7lfgyazm.us.auth0.com',
    client_id: '3C5Hpt3c8Vili4i58ORomBAsawDBlvmg',
    audience: 'https://api.harvest.org',
    cacheLocation: 'localstorage',
    useRefreshTokens: true
  });

  if (loginBtn) {
    loginBtn.onclick = async (): Promise<void> => {
      try {
        await auth0.loginWithPopup();
        const user = await auth0.getUser();
        show('✅ Logged in');
        show(JSON.stringify(user, null, 2));
      } catch (err) {
        show(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
  } else {
    show('❌ Login button not found');
  }
})();


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
