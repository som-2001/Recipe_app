import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function FollowingGrid({ item,length }) {

  // console.log(length?.following?.length);
  return (
    <AvatarGroup renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
    total={length?.following?.length} style={{width:"230px",height:"130px",margin:"40px"}}>
      {item ? (item?.slice(0,2)?.map((data, index) => (
        <Avatar alt="Remy Sharp" key={index} src={`../images/${data.image}`} style={{width:"130px",height:"130px"}}/>
      ))):(<img src='../images/no_data.gif' alt='' style={{width:"200px",height:"150px"}} />)}
    </AvatarGroup>
  );
}
