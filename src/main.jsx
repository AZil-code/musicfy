// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { userService } from './services/user.service.js';
import { SET_USER } from './store/reducers/user.reducer.js';

//TEMPORARY
async function bootstrap() {
   // Seed or restore a demo user so the app has a logged-in context for testing.
   let sessionUser = userService.getLoggedinUser();

   if (!sessionUser) {
      const users = await userService.query();
      let demoUser = Array.isArray(users) && users.length ? users[0] : null;

      if (!demoUser) {
         demoUser = await userService.signup({ username: 'demo', password: 'demo', fullname: 'Demo User' });
      } else {
         await userService.login({ username: demoUser.username, password: demoUser.password || '' });
      }

      sessionUser = userService.getLoggedinUser();
   }

   if (sessionUser) {
      store.dispatch({ type: SET_USER, user: sessionUser });
   }

   createRoot(document.getElementById('root')).render(
      <Provider store={store}>
         <App />
      </Provider>
   );
}

bootstrap();
