import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    useReactiveVar
} from "@apollo/client";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {
    HighlightsScreen,
    TopPlatformsScreen,
    TopQuizzesScreen,
    FavoritesScreen,
    CreateScreen,
    ProfileScreen,
    CreateQuizScreen
} from './screens';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavigationControl from './components/NavigationControl'
import { globalState } from "./state/UserState";
import { setContext } from '@apollo/client/link/context';

import PlatformScreen from "./screens/PlatformScreen";
import PlatformSettings from "./screens/PlatformSettings";

const httpLink = createHttpLink({
    uri: 'http://api.yway.app/graphql'
});

const authLink = setContext(() => {
    const { _id } = globalState();
    return {
        headers: {
            authorization: _id
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: 'include'
});

const theme = createTheme({
    palette: {
        primary: {
            light: '#fae1d9',
            main: '#ff5a1d',
            contrastText: '#fff',
        },
        common: {
            black: '#333333',
        }
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif",
        htmlFontSize: 16,
        fontSize: 14,
        button:
        {
            textTransform: "none"
        },
        h5: {
            fontWeight: '700',
            fontSize: 16,
            color: '#333333',
            my: 4,
            ml: 2,
        },
        body1:
        {
            fontSize: '14px',
        }
    }, components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    elevation: 0,
                    boxShadow: 'none',
                },
                contained: {
                    "&:hover": {
                        boxShadow: 'none',
                        backgroundColor: '#fae1d9',
                        color: '#ff5a1d',
                    }
                }

            }
        },
    },
}
);


export default function App() {
    const user = useReactiveVar(globalState);
    const userId = user?._id;
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <NavigationControl
                        switch={<Switch>
                            <Route exact path="/">
                                <Redirect to="/highlights" />
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
                            <Route exact path="/quiz/create">
                                <CreateQuizScreen />
                            </Route>
                            <Route exact path="/create">
                                <CreateScreen />
                            </Route>
                            <Route exact path="/testplatform">
                                <PlatformScreen />
                            </Route>
                            <Route exact path="/testplatformsettings">
                                <PlatformSettings />
                            </Route>
                            {/*<Route exact path="/quiz/create/:draftId">*/}
                            {/*    <EditDraftScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/platform/create">*/}
                            {/*    <CreatePlatformScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/user/:userId/drafts">*/}
                            {/*    <DraftsScreen />*/}
                            {/*</Route>*/}
                            <Route exact path="/favorites">
                                <FavoritesScreen />
                            </Route>
                            <Route path="/user/:userId">
                                <ProfileScreen />
                            </Route>
                            <Route path="/user" >
                                {userId
                                    ?
                                    <Redirect to={`/user/${userId}`} />
                                    :
                                    <Redirect to="/highlights" />}
                            </Route>
                            {/* <Route exact path="/user/overview">
                                <ProfileScreen tab = {0} />
                            </Route>
                            <Route exact path="/user/achievements">
                                <ProfileScreen tab = {1} />
                            </Route>
                            <Route exact path="/user/quizzes">
                                <ProfileScreen tab = {2} />
                            </Route>
                            <Route exact path="/user/platforms">
                                <ProfileScreen tab={3} />
                            </Route>
                            <Route exact path="/user/history">
                                <ProfileScreen tab={4} />
                            </Route>
                            <Route exact path="/user/friends">
                                <ProfileScreen tab={4} />
                            </Route> */}


                            {/* <Route exact path="/user/:userId">
                                <ProfileScreen tab={0} {...props} />
                            </Route>
                            <Route exact path="/user/:userId/achievements">
                                <ProfileScreen tab={1} {...props} />
                            </Route> */}
                            {/*<Route exact path="/user/:userId/platforms">*/}
                            {/*    <MyPlatformsScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/user/:userId/history">*/}
                            {/*    <HistoryScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/user/:userId/friends">*/}
                            {/*    <FriendsScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/user/:userId/settings">*/}
                            {/*    <UserPrivacyScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/user/:userId/edit">*/}
                            {/*    <EditUserProfileScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/platform/:platformName">*/}
                            {/*    <PlatformScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/platform/:platformName/leaderboard">*/}
                            {/*    <PlatformLeaderboardScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/platform/:platformName/settings">*/}
                            {/*    <PlatformSettingsScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/platform/:platformName/:quizName/:quizId">*/}
                            {/*    <QuizInfoScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/quiz/:quizName/:quizId">*/}
                            {/*    <AnswerQuestionScreen />*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/search/:query/:filter">*/}
                            {/*    <SearchResultsScreen />*/}
                            {/*</Route>*/}
                        </Switch>} />
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    );
}