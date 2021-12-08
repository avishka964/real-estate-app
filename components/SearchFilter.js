import {useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { filterData, getFilterValues } from '../utils/filterData';

function SearchFilter() {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter()

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const {query} =  router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if(item.value && filterValues?.[item.name]){
        query[item.name] = item.value
      }     
    })

    router.push({pathname:path, query})
  }

  return (
    <Box sx={{margin: '2rem'}}>
      <Grid container spacing={3}>
        {filters.map((filter) => (
          <Grid item xs={12} md={3} key={filter.queryName}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>{filter.placeholder}</InputLabel>
              <Select               
                label={filter.placeholder}
                onChange={(e) => searchProperties({[filter.queryName]: e.target.value})}
              >
                {filter?.items?.map((item) => (
                 <MenuItem value={item.value} key={item.value}>{item.name}</MenuItem>
                ))}
         
              </Select>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SearchFilter;
