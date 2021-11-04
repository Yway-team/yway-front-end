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
import NavigationControl from './components/NavigationControl'
import { globalState } from "./state/UserState";

console.log('Before' + globalState._id);
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: { authorization: globalState._id }
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
    }, components: {},

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
                            {/*<Route exact path="/quiz/create">*/}
                            {/*    <CreateQuizScreen />*/}
                            {/*</Route>*/}
                            <Route exact path="/create">
                                <CreateScreen />
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
                            <Route exact path="/user">
                                <ProfileScreen />
                            </Route>
                            <Route exact path="/user/:userId">
                                <ProfileScreen />
                            </Route>
                            <Route exact path="/favorites">
                                <FavoritesScreen />
                            </Route>
                            {/*<Route exact path="/user/:userId/quizzes">*/}
                            {/*    <MyQuizzesScreen />*/}
                            {/*</Route>*/}
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