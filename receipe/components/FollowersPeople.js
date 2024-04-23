import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import {useDispatch} from 'react-redux';
import { profile_id } from '@/reduxtoolkit/Slice';

export default function FollowersPeople({item}) {

  const dispatch = useDispatch();
  const router=useRouter();

  return (
    <List sx={{ width: '100%', maxWidth: 900, background: "whitesmoke", marginRight: "10px", borderRadius: "4px" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>


          <Avatar alt="Remy Sharp" src={`../images/${item.image}`} onClick={(e)=>{
            dispatch(profile_id(item.userid))
            router.push(`/profile/${item.userid}`)
            }} />


        </ListItemAvatar>
        <ListItemText
          primary={item.username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {item.name}
              </Typography>
              
            </React.Fragment>
          }
        />
       

      </ListItem>
      <Divider variant="inset" component="li" />
      
    </List>
  );
}