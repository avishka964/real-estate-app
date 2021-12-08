import { Fragment } from 'react';
import Link from 'next/link';
import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { KingBed, Shower, SquareFoot, Verified } from '@mui/icons-material';
import millify from 'millify';


const DefaultImage = 'https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'

function Property({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
    product,
  },
}) {
  
  const heading = (
    <Fragment>
      AED {millify(price)}
      {rentFrequency && `/${rentFrequency}`} {isVerified && <Verified sx={{ fontSize: 13.5, color:'green' }} />} 
    </Fragment>
  );

  

  return (
    <Grid item md={4} xs={12} sm={6}>
      <Card>
        <CardHeader
          avatar={<Avatar src={agency?.logo?.url} />}
          title={heading}
          subheader={product}
        />
        <CardMedia
          component='img'
          height='194'
          image={coverPhoto ? coverPhoto.url : DefaultImage}
          alt='house'
        />
        <CardContent>
          <Stack direction='row' spacing={1}>
            <Chip icon={<KingBed />} label={rooms} variant='outlined' />
            <Chip icon={<Shower />} label={baths} variant='outlined' />
            <Chip icon={<SquareFoot />} label={millify(area) + 'sqft'} variant='outlined'/>
          </Stack>
          <Typography variant='body2' color='text.secondary' sx={{marginTop: 2, marginBottom:1}}>
            {title.length > 50 ? `${title.substring(0, 50)}...` : title}
          </Typography>
          <Button variant="contained" color="success">
            <Link href={`/property/${externalID}`} passHref>
              view more
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Property;
