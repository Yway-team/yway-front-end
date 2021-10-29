import ExploreScreen from './ExploreScreen';
import CreateScreen from './CreateScreen';
import FavoritesScreen from './FavoritesScreen';
import ProfilePage from '../Pages/ProfilePage';
import NavigationControl from './NavigationControl';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <NavigationControl />
      <Switch>
        <Route exact path="/">
          <ExploreScreen />
        </Route>
        <Route exact path="/create">
          <CreateScreen />
        </Route>
        <Route exact path="/favorites">
          <FavoritesScreen />
        </Route>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  );
}