import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function MasonryImageList({item}) {

  // console.log(item.length);
  const itemData = item?.map((data, index) => ({
    img: `../images/${data.Recipe_pic}?auto=format&fit=crop&w=100&h=150&q=60`,
    ...(item.length === 1 ? ({ rows: 2.3, cols: 4 }) : (index % 3 === 0 && index % 4 === 0 && index % 5 === 0) ? { rows: 2, cols: 2 } : { cols: 2 })
  }));
  
  
  return (
    <div>
      {item.length===0?(<img src='../images/recipe_book.gif' style={{width:"150px"}} alt=''/>):(
    <ImageList
      sx={{ width: 340, height: 300,marginLeft:'6px'}}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {item.length!==0 ?(itemData?.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))):(null)}
    </ImageList>
    )}
    </div>
  );
}
