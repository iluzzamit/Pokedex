import { Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Tooltip } from "@mui/material";
import { useSearchParams } from 'react-router-dom';
import { SortByAlpha } from "@mui/icons-material";
import { Item, PokemonItem } from "./Item";
import styled from "styled-components";
import axios from "../../config/axios";
import React from "react";

const pokemonTypes = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy',]
const displayOptions = [10, 30, 50]

const StyledGrid = styled(Grid)`
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;

  .fadeInOut {
    opacity: 1;
    animation: fade 2s infinite;
  }

  @keyframes fade {
    0%,100% { opacity: 0 }
    50% { opacity: 1 }
  }

  .action-btns {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`

export function ItemList() {
  const [data, setData]: [Array<PokemonItem>, Function] = React.useState([]);
  const [pages, setPages]: [number, Function] = React.useState(0);
  const [error, setError]: [undefined | string, Function] = React.useState(undefined);
  const [isLoading, setIsLoading]: [boolean, Function] = React.useState(true);

  // query params
  const [query, setQuery] = useSearchParams();

  const fetch = React.useCallback(async () => {
    try {
      setIsLoading(true)
      const { data: { data, pages } }: { data: { data: Array<PokemonItem>, pages: Number }} = await axios.get('/pokemon/', { params: query });
      setData(data);
      setPages(pages);
    } catch (e: unknown) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [query])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  const handleClickSort = () => {
    query.set('sort', query.get('sort') === 'desc' ? 'asc' : 'desc');
    setQuery(query);
  }

  const handleFilter = (e: any) => {
    if (e.target.value === 'None') {
      query.delete('filter')
    } else {
      query.set('filter', e.target.value);
    }
    setQuery(query);
  }

  const handleDisplay = (e: any) => {
    if (e.target.value === 10) {
      query.delete('display')
    } else {
      query.set('display', e.target.value);
    }
    setQuery(query);
  }

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value === 1) {
      query.delete('page')
    } else {
      query.set('page', value.toString());
    }
    setQuery(query);
  }

  return (
    <StyledGrid container item xs={12} spacing={2}>
      <Grid className='action-btns' item xs={12}>
        <Tooltip title={query.get('sort') === 'desc' ? 'Sort as descending' : 'Sort as ascending'}>
          <Button disabled={isLoading} onClick={handleClickSort}>
            <SortByAlpha color='secondary' />
          </Button>
        </Tooltip>
        <FormControl>
          <InputLabel>Filter</InputLabel>
          <Select value={query.get('filter') || 'None'} onChange={handleFilter} sx={{ m: 1, minWidth: 120 }}>
            <MenuItem value="None">None</MenuItem>
            {pokemonTypes.map((type: string, index: number) => (
              <MenuItem key={index} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Items to Display</InputLabel>
          <Select value={query.get('display') || 10} onChange={handleDisplay} sx={{ m: 1, minWidth: 150 }}>
            {displayOptions.map((option: number, index: number) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid className='action-btns' item xs={12}>
        <Pagination count={pages} page={Number(query.get('page') || 1)} onChange={handlePage} />
      </Grid>
      {
        (data.length > 0 ? data : Array.from(Array(30).keys())).slice(0, 30)?.map((item: any, index: any) => (
          <Grid item xs={2} className='item' key={item?.number || index}>
            <Item data={item?.number ? item : undefined} />
          </Grid>
        ))
      }
    </StyledGrid >
  );
}
