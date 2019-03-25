import Home from './pages/Home.vue';
import Contact from './pages/Contact.vue';
import Calendar from './pages/Calendar.vue';
import About from './pages/About.vue';
import Auth from './pages/Auth.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Auth },
  { path: '/calendar', component: Calendar},
  { path: '/about', component: About},
  { path: '/contact', component: Contact}
];

export default routes;