import { Fragment } from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { KingBed, Shower, SquareFoot, Verified } from '@mui/icons-material';
import millify from 'millify';
import { base_url, api } from '../../utils/api';
import ImageScrollbar from '../../components/Layout/ImageScrollbar';
import Head from 'next/head';
import PropTypes from 'prop-types';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'white',
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function PropertyDetails({
  propertiesDetails: {
    photos,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
  },
}) {
  return (
    <Fragment>
      <Head>
        <title>Real State Solution</title>
        <meta
          name='description'
          content='Most popular real estates in the world'
        />
      </Head>
      <Box>
        {photos && <ImageScrollbar data={photos} />}
        <Box sx={{ margin: '2rem' }}>
          <Grid>          
            <Typography variant='h6' gutterBottom>
              AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
              {isVerified && (
                <Verified sx={{ fontSize: 13.5, color: 'green' }} />
              )}
            </Typography>

            <Stack direction='row' spacing={1}>
              <Chip icon={<KingBed />} label={rooms} variant='outlined' />
              <Chip icon={<Shower />} label={baths} variant='outlined' />
              <Chip
                icon={<SquareFoot />}
                label={millify(area) + 'sqft'}
                variant='outlined'
              />
            </Stack>
            <Typography
              variant='button'
              display='block'
              gutterBottom
              sx={{ marginTop: 2, marginBottom: 1 }}
            >
              {title}
            </Typography>

            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ marginTop: 2, marginBottom: 1 }}
            >
              {description}
            </Typography>
          </Grid>
          <div style={{ width: '100%' }}>
            <Box              
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.paper',
              }}
            >
              <Item>Type | {type}</Item>
              <Item>Purpose | {purpose}</Item>
              {furnishingStatus && (
                <Item>Furnishing Status | {furnishingStatus}</Item>
              )}
            </Box>
          </div>
          <Box>
            {amenities.length && <Typography>Facilities:</Typography>}
            <Grid>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {amenities?.map((item) =>
                  item?.amenities?.map((amenity) => (
                    <Chip
                      sx={{ m: 1 }}
                      key={amenity.text}
                      label={amenity.text}
                      color='primary'
                    />
                  ))
                )}
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await api(`${base_url}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertiesDetails: data,
    },
  };
}
