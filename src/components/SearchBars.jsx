import React,{memo} from 'react'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const SearchBars = ({searched,requestSearch}) => {

  return (
      <>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <h2>Material UI</h2>
        </Grid>
        <Grid item xs={4}>
        <a href="https://www.linkedin.com/in/hitesh-sharma-creator/" target='blank'><LinkedInIcon /></a>
        <a href="https://github.com/hiteshcreator/vite-react-app/" target='blank' style={{marginLeft:'5px'}}><GitHubIcon /></a>
        </Grid>
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