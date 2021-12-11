import { Paper, InputBase, IconButton } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';

export default function SearchBar({ theme }) {
    //this component will handle rebounce of key strokes so that the API will make only when the user stops typing
    const history = useHistory();
    const searchParams = new URLSearchParams(useLocation().search);
    let [queryString, filter] = [searchParams.get('query'), searchParams.get('filter')];
    if (queryString) queryString = decodeURIComponent(queryString);
    const [query, setQuery] = useState(queryString || '');

    useEffect(() => {
        console.log(query);
        const timeOutId = setTimeout(() => handleSearch(), 100);
        return () => clearTimeout(timeOutId);
    }, [query]);


    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter") {
                console.log("Enter key was pressed. Run your function.");
                event.preventDefault();
                document.activeElement.blur();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    function handleSearch() {
        if (query) history.push(`/search?query=${encodeURIComponent(query)}&filter=${filter}`);
    }
    return (
        <Paper
            elevation={0}
            component="form"
            sx={{
                px: 2,
                display: 'flex',
                alignItems: 'center',

                width: '100%',
                height: '36px',
                maxWidth: '500px',
                background: theme.palette.grey[200]
            }}
        >
            <InputBase
                sx={{
                    ml: 1, flex: 1, fontSize: 14, fontWeight: 500,
                }}
                placeholder="Search Yway"
                inputProps={{ 'aria-label': 'search Yway' }}
                onChange={
                    (event) => {
                        setQuery(event.target.value);
                    }
                }
                onFocus={() => {
                    handleSearch();
                }}
            />
            <IconButton sx={{ p: '3px' }} aria-label="search">
                <SearchRounded sx={{ fill: theme.palette.grey['500'] }} />
            </IconButton>
        </Paper>);
}
