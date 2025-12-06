// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { userService } from './services/user.service.js';
import { stationService } from './services/station.service.js';
import { SET_USER } from './store/reducers/user.reducer.js';
import { addUserStation } from './store/actions/user.actions.js';

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

   // Hydrate full user (with savedStations, etc.) from storage
   const hydratedUser =
      sessionUser && sessionUser._id ? await userService.getById(sessionUser._id).catch(() => null) : null;
   const activeUser = hydratedUser || sessionUser;

   if (activeUser) {
      store.dispatch({ type: SET_USER, user: activeUser });

      // Seed default stations so the user starts with a usable library
      const savedStations = Array.isArray(activeUser.savedStations) ? activeUser.savedStations : [];
      const hasMinSaved = savedStations.length >= 6;

      if (!hasMinSaved) {
         try {
            const stations = await stationService.query();
            if (Array.isArray(stations) && stations.length) {
               const likedStation = stations.find((s) => s && s.name === 'Liked Songs');

               // Ensure Liked Songs exists and is pinned
               if (likedStation && likedStation._id) {
                  await addUserStation(likedStation._id, { isPinned: true });
               }

               // Top up to at least 6 total (including liked) with other stations
               const seedCountNeeded = Math.max(
                  0,
                  6 - ((store.getState().userModule.user.savedStations || []).length)
               );
               const fillerStations = stations.filter((s) => s && s._id && s.name !== 'Liked Songs');
               for (const station of fillerStations.slice(0, seedCountNeeded)) {
                  await addUserStation(station._id);
               }
            }
         } catch (err) {
            console.error('bootstrap -> failed seeding stations', err);
         }
      }
   }

   createRoot(document.getElementById('root')).render(
      <Provider store={store}>
         <App />
      </Provider>
   );
}

bootstrap();
