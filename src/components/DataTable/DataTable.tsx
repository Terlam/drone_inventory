import React, {useState} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { server_calls } from '../../api'; // ADD THIS
import { useGetData } from '../../custom-hooks'; // ADD THIS
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core'; // ADD THESE
import { DroneForm } from '../../components/DroneForm'; // ADD THIS

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Drone Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      field: 'max_speed',
      headerName: 'Max Speed',
      type: 'string',
      width: 160,
    },
    {
      field: 'price',
      headerName: 'Price',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 90,
    },
  ];
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

interface gridData{
  data:{
    id?:string;
  }
}

export const DataTable =  () => {
  
  let { droneData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<gridData>({data:{}})

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    server_calls.delete(gridData.data.id!)
    getData()
  }

  console.log(gridData.data.id)

    return (
        <div style={{ height: 400, width: '100%' }}>
          <h2>Drones In Inventory</h2>
          <DataGrid rows={droneData} columns={columns} pageSize={5} checkboxSelection onRowSelected = { setData } />

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

          {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Drone Drone</DialogTitle>
          <DialogContent>
            <DialogContentText>Update Drone</DialogContentText>
              <DroneForm id={gridData.data.id!}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
        </Dialog>
        </div>
      );
}