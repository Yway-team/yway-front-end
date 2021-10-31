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
    ExploreScreen,
    FavoritesScreen,
    CreateScreen,
    ProfileScreen,
} from './Screens';
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
        // MuiListItemText: {
        //     styleOverrides: {
        //         root: {
        //             fontSize: '14px',
        //             fontWeight: 600,
        //             fontFamily: "'Montserrat', sans-serif",
        //         },
        //     },
        // },
    },

});



export default function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <NavigationControl switch={<Switch>
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
                    </Switch>} />
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    );
}