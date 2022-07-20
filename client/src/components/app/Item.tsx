import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Skeleton, Tooltip, Typography } from "@mui/material";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import StarIcon from '@mui/icons-material/Star';
import styled from "styled-components";
import React from "react";

export interface PokemonItem {
    number: number,
    name: string
    type_one: string,
    type_two: string,
    total: number,
    hit_points: number,
    attack: number,
    defense: number,
    special_attack: number,
    special_defense: number,
    speed: number,
    generation: number,
    legendary: boolean,
}

const statsToDisplay = [
    ['Generation', 'generation'],
    ['Attack', 'attack'],
    ['Special Attack', 'special_attack'],
    ['Defense', 'defense'],
    ['Special Defense', 'special_defense'],
    ['Speed', 'speed'],
]

const fixedIcons = {
    'Nidoran♀': 'nidoran-m',
    'Nidoran♂': 'nidoran-f'
}

const StyledCard = styled(Card)`
    .avatar-img {
        height: 5rem;
    }
`

export function Item({ data }: { data: any }) {
    const [isCatched, setIsCatched]: [boolean, Function] = React.useState(localStorage.getItem(`${data?.number}`) === 'true' ? true : false);
    
    const setCatched = () => {
        setIsCatched(!isCatched);
        window.localStorage.setItem(`${data?.number}`, !isCatched ? 'true' : 'false')
    }

    return (
        <StyledCard>
            <React.Fragment>
                <CardHeader
                    title={data ? `#${data.number} ${data.name}` : <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />}
                    subheader={data ? `Type: ${data.type_one}${data.type_two && `/${data.type_two}`}` : <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 6 }} />}
                    avatar={data ? <img className='avatar-img' src={`https://img.pokemondb.net/sprites/x-y/normal/${data.name?.toLowerCase()}.png`} /> : <Skeleton variant="circular" width={40} height={40} />}
                />
                <CardContent>
                    {statsToDisplay.map(([title, key]: string[], index: number) => (
                        <Typography variant="body2" key={key}>
                            {data ? `${title}: ${data[`${key}`]}` : <Skeleton animation="wave" height={15} width={`${index * 3}rem`} style={{ marginBottom: 6 }} />}
                        </Typography>
                    ))}
                </CardContent>
                <CardActions>
                    {data?.legendary && <Tooltip title="This Pokémon is legendary!"><Button style={{ cursor: 'default' }}><StarIcon color='primary' /></Button></Tooltip>}
                    <Tooltip title={`${isCatched ? 'Unmark' : 'Mark'} as catched`}><span><Button disabled={!data} onClick={setCatched}><CatchingPokemonIcon color={isCatched ? 'primary' : 'secondary'} /></Button></span></Tooltip>
                </CardActions>
            </React.Fragment>
        </StyledCard>
    );
}
