import Home from './pages/Home.vue';
import Auth from './components/Auth.vue';
import Success from './components/AuthSuccess.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Auth },
  { path: '/success', component: Success},
];

export default routes;