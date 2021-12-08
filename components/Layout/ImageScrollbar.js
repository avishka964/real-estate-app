import { useContext } from 'react';
import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
        m: 1,
      }}
    >
      <IconButton  onClick={() => scrollPrev()} >
        <ArrowCircleLeftIcon />
      </IconButton>
    </Box>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
        m: 1,
      }}
    >
      <IconButton onClick={() => scrollNext()} >
        <ArrowCircleRightIcon />
      </IconButton>
    </Box>
  );
};

function ImageScrollbar({ data }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: 'hidden'}}
    >
      {data.map((item) => (
        <Box
          key={item.id}
          itemId={item.id}
          sx={{
            width: 910,
            overflow: 'hidden',
            p: 1,
          }}
        >
          <Image
            alt='property'
            placeholder='blur'
            blurDataURL={item.url}
            src={item.url}
            width={1000}
            height={500}
            sizes='(max-width:500px) 100px, (max-width):1023px 400px, 1000px'
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}

export default ImageScrollbar;
