// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { userService } from './services/user.service.js';
import { SET_USER } from './store/reducers/user.reducer.js';

async function bootstrap() {
   // Restore user from session storage and hydrate from storage service if possible
   const sessionUser = userService.getLoggedinUser();
   const hydratedUser =
      sessionUser && sessionUser._id ? await userService.getById(sessionUser._id).catch(() => null) : null;
   const activeUser = hydratedUser || sessionUser;

   if (activeUser) {
      store.dispatch({ type: SET_USER, user: activeUser });
   }

   createRoot(document.getElementById('root')).render(
      <Provider store={store}>
         <App />
      </Provider>
   );
}

bootstrap();
