import "./ClientsList.scss";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  gridClasses,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { deleteClient, getClients } from "../../Apis/Clients";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function ClientsList() {
  const navigate = useNavigate();
  const [clientsData, setClientsData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClients();
        setClientsData(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchData();
  }, [refresh]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
        <GridToolbarColumnsButton className="test" />
        <GridToolbarExport
          className="test"
          csvOptions={{
            fileName: "Total Client List",
          }}
        />
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      editable: false,
      flex: 1,
      filterable: false,
      headerClassName: "grid-header",
    },
    {
      field: "email",
      headerName: "EMAIL",
      editable: false,
      flex: 1,
      headerClassName: "grid-header",
    },
    {
      field: "phone",
      headerName: "PHONE NUMBER",
      editable: false,
      flex: 1,
      headerClassName: "grid-header",
    },
    {
      field: "actions",
      headerName: "DELETE CLIENTS",
      flex: 1,
      sortable: false,
      filterable: false,
      headerClassName: "grid-header",
      renderCell: (params) => {
        const handleDeleteClick = async (event) => {
          event.stopPropagation();
          console.log(params.row);
          await deleteClient(params.id);
          setRefresh(!refresh);
        };

        return (
          <Button
            className="ClientDeleteButton"
            variant="outlined"
            onClick={handleDeleteClick}
            color="primary"
            size="small"
          >
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="GridContainer">
      <Button
        variant="contained"
        className="AddClientButton"
        onClick={() => navigate(`/new`)}
      >
        + Add New Client
      </Button>
      <DataGrid
        rows={clientsData ? clientsData : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 25]}
        disableRowSelectionOnClick
        style={{ borderColor: "transparent" }}
        slots={{ toolbar: CustomToolbar }}
        onRowClick={(params) => {
          navigate(`/${params.id}`);
        }}
        sx={{
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
            {
              outline: "none",
            },
        }}
      />
    </div>
  );
}

export default ClientsList;
