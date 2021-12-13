import React, {useRef} from "react";
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
    CreatePlatformScreen,
    ProfileScreen,
    CreateQuizScreen,
    TakeQuizScreen,
    DraftsScreen,
    PlatformScreen,
    PlatformSettings,
    SearchResultsScreen,
    FullLeaderboard,
    NoMatch
} from './screens';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavigationControl from './components/NavigationControl/NavigationControl'
import { globalState, globalLoggedIn } from "./state/UserState";
import { setContext } from '@apollo/client/link/context';

const link = process.env.REACT_APP_NODE_ENV === "development" ? 'http://localhost:4000/graphql' : "https://api.yway.app/graphql";

const httpLink = createHttpLink({
    uri: link
});

const authLink = setContext(() => {
    const { accessToken } = globalState();
    return {
        headers: {
            authorization: accessToken || ''
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
});


export default function App() {
    const loggedIn = useReactiveVar(globalLoggedIn);
    const user = useReactiveVar(globalState);
    const userId = user?._id;

    // Hacky solution
    var timeLimit = 20 * 1000;
    const timeLeft = useRef(timeLimit)

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Router>
                    <NavigationControl client={client}
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
                            <Route exact path="/quiz/edit/:quizId">
                                <CreateQuizScreen edit={true} />
                            </Route>
                            <Route exact path="/quiz/take/:quizId">
                                <TakeQuizScreen timeLeft={timeLeft}/>
                            </Route>
                            <Route exact path="/platform/create">
                                <CreatePlatformScreen />
                            </Route>
                            <Route exact path="/platform/:platformName">
                                <PlatformScreen />
                            </Route>
                            <Route path="/platformSettings/:platformName">
                                <PlatformSettings />
                            </Route>
                            <Route path="/leaderboard/:platformName">
                                <FullLeaderboard />
                            </Route>
                            <Route exact path="/quiz/create/:draftId">
                                <CreateQuizScreen draft={true} />
                            </Route>
                            <Route exact path="/drafts">
                                <DraftsScreen />
                            </Route>
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
                            <Route path="/search">
                                <SearchResultsScreen />
                            </Route>
                            <Route path="*">
                                <NoMatch />
                            </Route>
                            {/* <Route exact path="/user/:userId/overview">
                                <ProfileScreen tab={0} />
                            </Route>
                            <Route exact path="/user/:userId/achievements">
                                <ProfileScreen tab={1} />
                            </Route>
                            <Route exact path="/user/:userId/quizzes">
                                <ProfileScreen tab={2} />
                            </Route>
                            <Route exact path="/user/:userId/platforms">
                                <ProfileScreen tab={3} />
                            </Route>
                            <Route exact path="/user/:userId/history">
                                <ProfileScreen tab={4} />
                            </Route>
                            <Route exact path="/user/:userId/friends">
                                <ProfileScreen tab={5} />
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

                        </Switch>} />
                </Router>
            </ThemeProvider>
        </ApolloProvider>
    );
}
