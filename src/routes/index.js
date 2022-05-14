import Home from '../pages/Home';
import Anime from '../pages/Anime';

const PATH = {
  HOME: '/',
  ANIME: '/anime',
};
const routeList = [
  { exact: true, path: PATH.HOME, component: <Home /> },
  { exact: false, path: `${PATH.ANIME}/:id`, component: <Anime /> },
];

export { routeList, PATH };
