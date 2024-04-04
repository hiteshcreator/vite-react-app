import { useEffect, useState, useCallback } from "react";
import useFetchAPI from "../src/utils/useFetchAPI";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CusModel from "../src/components/CusModel";

import SearchBars from "./components/SearchBars";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

function App() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState("");
  const [rowModel, setRowModel] = useState(false);
  const [modelData, setModelData] = useState("");

  const getUserData = async () => {
    const data = await useFetchAPI();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("load", getUserData);
    console.log("dat--10", user);
    return () => {
      window.removeEventListener("load", getUserData);
    };
  }, [getUserData]);

  const requestSearch = useCallback((searchedVal) => {
      if (!searchedVal) {
        setSearched("");
        getUserData();
      } else {
        setSearched(searchedVal);
        const filtered = user.filter((obj) => {
          return (
            obj.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
            obj.username.toLowerCase().includes(searchedVal.toLowerCase())
          );
        });

        setUser(filtered);
      }

    },[searched, user]  );

  const handelModel = (e, params) => {
    setRowModel(true);
    setModelData(params.row);
  };

  const handleClose = () => setRowModel(false);

  const columns = [
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "address",
      headerName: "city",
      width: 150,
      valueGetter: (value, row) => {
        return row?.address?.city;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      editable: false,
      renderCell: (params) => (
        <>
          <Button variant="text" onClick={(e) => handelModel(e, params)}>
            <EditIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="sm">
      
      {rowModel ? (
        <CusModel
          show={rowModel}
          handleClose={handleClose}
          modelData={modelData}
        />
      ) : (
        ""
      )}

      <SearchBars searched={searched} requestSearch={requestSearch} />

      {/* <h1>Material UI</h1>
      <TextField id="outlined-basic"  variant="outlined"
        size="small"
        value={searched}
        onChange={(e)=>requestSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <SearchIcon/>
          )
        }}
      /> */}
      {user ? (
        // [...user].map((domp,i) => (
        //   <>
        //     <div key={domp.id}>
        //       <li>{domp.name}</li>
        //     </div>

        <Box sx={{ height: 500, width: "100%", marginTop: "10px" }}>
          <DataGrid
            columns={columns}
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
            editMode="row"
          />
        </Box>
      ) : (
        // </>
        // ))

        ""
      )}
    </Container>
  );
}

export default App;
