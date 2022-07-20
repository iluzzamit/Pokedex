import { Button, Grid, Tooltip, Typography } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import styled from "styled-components";

const StyledGrid = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: center;
    
    .header {
    display: flex;
    justify-content: center;
    align-items: center;
    }
    
    .title {
    font-size: 5rem;
    }

    .actions {
        display: flex;
        flex-direction: row;
        justify-content: right;
    }
`

export function Header({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: Function }) {
    return (
        <StyledGrid container>
            <Grid item xs={3} />
            <Grid item xs={6} className='header'>
                <img src='https://icon-library.com/images/pokemon-ball-icon/pokemon-ball-icon-28.jpg' width='120' alt='logo' />
                <Typography className='title'>Pokédex</Typography>
            </Grid>
            <Grid item xs={3} className='actions'>
                <Tooltip title='Change Mode'>
                    <Button onClick={() => {
                        localStorage.setItem('darkMode', !darkMode ? 'true' : 'false')
                        setDarkMode(!darkMode)}
                    }>
                        <Brightness4Icon fontSize='large' />
                    </Button>
                </Tooltip>
            </Grid>
        </StyledGrid>
    );
}
