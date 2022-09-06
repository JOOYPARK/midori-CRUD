import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import { IconButton } from '@mui/material';

const MenuList = [
  
    {
      id: 1,
      name: 'Spicy chicken combo',
      description: 'Save $1.00! Spicy chicken w/rice + gyoza or eggroll',
      price: 15.49
    },
    {
      id: 2,
      name: 'Garlic spicy chicken combo',
      description: 'Save $1.00! Garlic spicy Chicken w/rice + gyoza or eggroll',
      price: 15.49
    },
    {
      id: 3,
      name: 'Crispy chicken combo',
      description: 'Save $1.00! Crispy Chicken w/rice + gyoza or eggroll',
      price: 16.49
    },
    {
      id: 4,
      name: 'General chicken combo',
      description: 'Save $1.50! General Tso Chicken w/rice + gyoza or eggroll',
      price: 16.99
    },
    {
      id: 5,
      name: 'Spciy chicken',
      description: 'Stir-fried grilled chicken with spicy sauce, over the rice',
      price: 12.99
    },
    {
      id: 6,
      name: 'Garlic spicy chicken',
      description: 'Stir-fried grilled chicken with spicy sauce and garlic sauce, over the rice',
      price: 12.99
    },
    {
      id: 7,
      name: 'Crispy chicken',
      description: 'Crispy breaded deep-fried chicken with garlic sauce and katsu sauce, over the rice',
      price: 13.99
    },
    {
      id: 8,
      name: 'General chicken',
      description: 'Stir-fried breaded deep-fried chicken with general tso sauce, over the rice',
      price: 14.99
    },
    {
      id: 9,
      name: 'Chicken teriyaki',
      description: 'Grilled chicken with teriyaki sauce, over the rice',
      price: 13.99
    },
    {
      id: 10,
      name: 'Crispy tofu',
      description: 'Crispy breaded deep-fried tofu with garlic sauce and katsu sauce, over the rice',
      price: 15.99
    },
    {
      id: 11,
      name: 'General tofu',
      description: 'Stir-fried breaded deep-fried tofu with general tso sauce, over the rice',
      price: 13.99
    },
    {
      id: 12,
      name: 'Gyoza eggroll plate',
      description: '8 pcs of gyozas and 2pcs of eggrolls with rice',
      price: 12.99
    },
    {
      id: 13,
      name: '8pcs Gyozas',
      description: '8pcs potstickers stuffed with vegetable and chicken',
      price: 6.50
    },
    {
      id: 14,
      name: '2pcs eggrolls',
      description: '2pcs eggrolls stuffed with vegetable and pork',
      price: 6.50
    },
    {
      id: 15,
      name: 'Kimchi',
      description: 'Korean spicy and sour salad',
      price: 3.99
    },
    {
      id: 16,
      name: 'Seaweed salad',
      description: 'Seaweed salad',
      price: 3.99
    },
    {
      id: 17,
      name: 'Salad',
      description: 'Green salad',
      price: 2.50
    },
    {
      id: 18,
      name: 'White rice',
      description: 'Steamed white rice',
      price: 2.50
    },
    {
      id: 19,
      name: 'Brown rice',
      description: 'Steamed brown rice',
      price: 3.50
    },
    {
      id: 20,
      name: 'Side sauce(2oz)',
      description: 'Side of sauce(Garlic sauce, teriyaki sauce, salad dressing) ',
      price: 0.5
    },
];

function AddItem(props) {
  const { setRows,setNewVersionRows } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', description: '', price:'',isNew: true }]);
    setNewVersionRows((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridCellModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
     
            <Button size = 'medium' variant = 'outlined' startIcon = {<AddCircleOutlineIcon/> }  onClick={handleClick}>
        Add Item
        </Button>

  );
}

AddItem.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function EditItem() {
  const [rows, setRows] = React.useState(MenuList);
  const [newVersionRows, setNewVersionRows] = React.useState({});

  const beginRowEdit = (event) => {
    event.defaultMuiPrevented = true;
  };

  const stopRowEdit = (event) => {
    event.defaultMuiPrevented = true;
  };

  const editClick = (id) => () => {
    setNewVersionRows({ ...newVersionRows, [id]: { mode: GridCellModes.Edit } });
  };

  const saveClick = (id) => () => {
    setNewVersionRows({ ...newVersionRows, [id]: { mode: GridCellModes.View } });
  };

  const deleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const cancelClick = (id) => () => {
    setNewVersionRows({
      ...newVersionRows,
      [id]: { mode: GridCellModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const rowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: 'name', headerName: 'Name', align:'left',width: 200, editable: true },
    { field: 'description', headerName: 'Description',align:'left', width:700, editable: true },
    {
      field: 'price',
      align:'left',
      headerName: 'Price',
      headerAlign:'left',
      type: 'number',
      width: 180,
      editable: true,
    },
    {
      field: 'edit',
      type: 'actions',
      headerName: '',
      width: 300,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = newVersionRows[id]?.mode === GridCellModes.Edit;

        if (isInEditMode) {
          return [
            <Box>
              <Button
              onClick={saveClick(id)}
              sx={{ ml: 1 }}
             >
              Save
             </Button>
              
            <Button
              onClick={cancelClick(id)}
              sx={{ ml: 1 }}
            >
              Cancle</Button>,
            </Box>
          ];
        }

        return [
          <Box>
          <Button
            onClick={editClick(id)}
            sx={{ ml: 1 }}
          >Edit</Button>
          <Button
            onClick={deleteClick(id)}
            sx={{ ml: 1 }}
          > 
          Delete
          </Button>
          </Box>
        ];
      },
    },
  ];
  const header = 'Midori Teriyaki'
  const menu = 'Menu'

  return (
    <Box
      sx={{
        height: 700,
        width: '100%',
        '& .actions': {
          color: 'text.primary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <h1 style = {{textAlign: 'center',background:'green'}}>{header}</h1>
      <h2 style={{textAlign : 'center'}}>{menu}</h2>
      <DataGrid
      
        rows={rows}
        columns={columns}
        editMode="row"
        newVersionRows={newVersionRows}
        onRowEditStart={beginRowEdit}
        onRowEditStop={stopRowEdit}
        processRowUpdate={rowUpdate}
        components={{
          Toolbar: AddItem,
        }}
        componentsProps={{
          toolbar: { setRows, setNewVersionRows },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      </Box>
    
  );
}