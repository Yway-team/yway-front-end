import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {
    HighlightsScreen,
    TopPlatformsScreen,
    TopQuizzesScreen,
    FavoritesScreen,
    CreateScreen,
    ProfileScreen,

} from './screens';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavigationControl from './components/NavigationControl';

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
        htmlFontSize: 16,
        fontSize: 14,
        button:
        {
            textTransform: "none"
        },
        body1:
        {
            fontSize: '14px',
        }
    }, components: {
    },

});



export default function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <NavigationControl
                        switch={<Switch>
                            <Route exact path="/">
                                <HighlightsScreen />
                            </Route>
                            <Route exact path="/highlights">
                                <HighlightsScreen />
                            </Route>
                            <Route exact path="/platform">
                                <TopPlatformsScreen />
                            </Route>
                            <Route exact path="/quiz">
                                <TopQuizzesScreen />
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
                        </Switch>} />
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    );
}