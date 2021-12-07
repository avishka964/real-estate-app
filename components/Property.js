import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { KingBed, Shower, SquareFoot, Verified } from '@mui/icons-material';
import millify from 'millify';
import DefaultImage from '../assets/default-image.jpeg';

const Property = ({
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
    externalId,
    product,
  },
}) => {
  const heading = (
    <Fragment>
      {isVerified && <Verified sx={{ fontSize: 13.5 }} />} AED {millify(price)}
      {rentFrequency && `/${rentFrequency}`}
    </Fragment>
  );

  return (
    <Grid item md={4} sx={12}>
      <Card sx={{ maxWidth: 345 }}>
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
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Typography>
          <Button variant="contained" color="success">
            <Link href={`/property/${externalId}`} passHref>
              view more
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Property;
