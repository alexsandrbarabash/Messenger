import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { SearchWrapper } from './search.styles';

export const Search = () => {
  return (
    <SearchWrapper>
      <div>
        <SearchIcon sx={{ fontSize: 30, cursor: 'pointer' }} />
      </div>
      <input type='text' placeholder='Search' />
    </SearchWrapper>
  );
};
