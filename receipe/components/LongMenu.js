import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { deleteResult, editResult1 } from '@/reduxtoolkit/Slice';
import {toast} from 'sonner';
import axios from 'axios';
import { NEXT_APP_BASE_URL } from './Env';
import { useRouter } from 'next/router';

const options = [
  'Edit',
  'Delete'
];

const ITEM_HEIGHT = 48;

export default function LongMenu({item}) {

  const dispatch=useDispatch();
  const router=useRouter();  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete=()=>{
       dispatch(deleteResult(item._id));
       toast.success('Post deleted successfully');
       axios.post(`${NEXT_APP_BASE_URL}/deletePost`,{id:item._id});
  }
  const handleEdit=()=>{
      console.log(item);
       dispatch(editResult1(item));
       router.push('/edit');
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem  onClick={(e)=>handleDelete()}>
         Delete
        </MenuItem>
    
        <MenuItem  onClick={(e)=>handleEdit()}>
         Edit
        </MenuItem>
      </Menu>
    </div>
  );
}