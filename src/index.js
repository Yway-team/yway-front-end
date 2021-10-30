
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  ExploreScreen,
  FavoritesScreen,
  CreateScreen,
  ProfileScreen,
} from './Screens';
import NavigationControl from './Components/NavigationControl';

const client = new ApolloClient({
  uri: 'http://3.129.119.115:4000/graphql',
  cache: new InMemoryCache()
});

const theme = createTheme({
  palette: {
    primary: {
      light: '#fae1d9',
      main: '#ff5a1d',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    button:
    {
      textTransform: "none"
    }
  }
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
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
              <ProfileScreen />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
