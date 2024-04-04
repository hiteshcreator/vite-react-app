import React,{memo} from 'react'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

const SearchBars = ({searched,requestSearch}) => {

  console.log("D")
  return (
      <>
      <Grid container justifyContent="center">
        <h2>Material UI</h2>
      </Grid>
        
      <TextField id="outlined-basic"  variant="outlined"
        size="small"
        fullWidth sx={{ m: 0 }}
        value={searched}
        onChange={(e)=>requestSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <SearchIcon/>
          )
        }}
       />

      </>
  )
}

export default memo(SearchBars);