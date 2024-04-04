import { useEffect, useState, useCallback } from "react";
import useFetchAPI from "../src/utils/useFetchAPI";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import CusModel from "../src/components/CusModel";
import SearchBars from "./components/SearchBars";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DmData from "./dummyData/DmData.js"

function App() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState("");
  const [rowModel, setRowModel] = useState(false);
  const [modelData, setModelData] = useState("");

  //getUserData: custom hook call user data
  const getUserData = async () => {
    const data = await useFetchAPI();
    setUser(data?data:DmData);
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("load", getUserData);
    return () => {
      window.removeEventListener("load", getUserData);
    };
  }, [getUserData]);

  //requestSearch: refer to custom search with name , username
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

  // handelModel: refer to open the model & send row data to child component
  const handelModel = (e, params) => {
    setRowModel(true);
    setModelData(params.row);
  };

  // handleClose function refer to close the model
  const handleClose = () => setRowModel(false);

  // columns represent to data table
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

      {user ? (

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
        ""
      )}

    </Container>
  );
}

export default App;
