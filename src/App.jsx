import { useEffect, useState } from 'react'
import './App.css'
import useFetchAPI from "../src/utils/useFetchAPI"
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';  
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';


function App() {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
 
  const getUserData = async () => {
    const data = await useFetchAPI();
    setUser(data);
    setLoading(false);
  }

  useEffect(()=>{
    window.addEventListener("load", getUserData);
    console.log("dat--10",user)
    return () => {
      window.removeEventListener("load", getUserData);
    };

  },[getUserData])


  // const rows = [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //   { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ];
  
  // const columns: GridColDef[]  = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];



  return (
    <Container maxWidth="sm">
    {
      user ?      
  
        // [...user].map((domp,i) => (
        //   <>
        //     <div key={domp.id}>
        //       <li>{domp.name}</li>
        //     </div>   
         
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid 
              columns={[
                { field: 'id' },
                { field: 'name' },
                { field: 'email' },
                { field:"address",
                    headerName: 'city', 
                    width: 150, 
                    valueGetter: (value,row) => { return row?.address?.city},                
                  // options: {
                  //     filter: true,
                  //     sort: true,
                  // }
                }            
              ]}
              rows={user}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              pageSizeOptions={[5, 10]}
              loading={loading ? true : false}
            />
        </Box>

            // </>
        // ))      

      : ""
    }
    </Container>

  )
}

export default App
