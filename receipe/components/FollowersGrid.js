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

export default function FollowersGrid({ item, length }) {

  // console.log(length?.followers?.length);
  return (
    <AvatarGroup renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
      total={length?.followers?.length} style={{ width: "320px", height: "130px", marginTop: "40px" }}>
      {item ? (item?.slice(0, 2)?.map((data, index) => (
        <Avatar alt="Remy Sharp" src={`../images/${data.image}`} style={{ width: "130px", height: "130px" }} />
      ))) : (<div style={{ marginBottom: "2rem" }}><img src="../images/follow.gif" style={{ width: "310px", height: "250px" }} alt="" /></div>)}
    </AvatarGroup>
  );
}


