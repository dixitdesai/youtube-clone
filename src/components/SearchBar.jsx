import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Search } from '@mui/icons-material'
import { Paper, IconButton } from '@mui/material'

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            navigate(`search/${searchTerm}`)
            setSearchTerm('');
        }
    }

  return (
    <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
            borderRadius: 20,
            border: '1px solid #e3e3e3',
            pl: 2,
            boxShadow: 'none',
            mr: { sm: 5 }
        }}
    >

        <input 
            type="text"
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
        />

        <IconButton 
            type="submit"
            sx={{color: 'red', p: '10px'}}
        >
            <Search />
        </IconButton>
    </Paper>
  )
}

export default SearchBar