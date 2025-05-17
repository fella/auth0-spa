import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
} from '@auth0/auth0-spa-js';

const config: Auth0ClientOptions = {
  domain: 'dev-n6li42pa7lfgyazm.us.auth0.com',
  client_id: 't2puMJ6IDe6LC8pKbV1ecG6N3mplbMAR',
  redirect_uri: window.location.origin,
  audience: 'https://api.harvest.org', // Optional if calling APIs
};

let auth0: Auth0Client;

const login = async () => {
  await auth0.loginWithRedirect();
};

const logout = () => {
  auth0.logout({ returnTo: window.location.origin });
};

const getToken = async () => {
  const token = await auth0.getTokenSilently();
  console.log('🔐 Access Token:', token);
};

const initAuth = async () => {
  auth0 = await createAuth0Client(config);

  // Handle the redirect back from Auth0
  if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  }

  const isAuthenticated = await auth0.isAuthenticated();

  console.log('✅ Authenticated:', isAuthenticated);

  if (isAuthenticated) {
    const user = await auth0.getUser();
    console.log('👤 User:', user);
    await getToken();
    document.getElementById('content')!.innerText = `Welcome ${user?.name}`;
  } else {
    document.getElementById('content')!.innerText = `You are not logged in.`;
  }

  document.getElementById('login')?.addEventListener('click', login);
  document.getElementById('logout')?.addEventListener('click', logout);
};

initAuth();
