import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Grid, Box, Typography, Button } from '@mui/material';
import SearchFilter from '../components/SearchFilter';
import Property from '../components/Property';
import notFound from '../assets/not-found.png';
import { base_url, api } from '../utils/api';

function Search({ properties }) {
  const [searchFilter, setSearchFilter] = useState(false);
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>Real Estate Solution</title>
        <meta
          name='description'
          content='Most popular real estates in the world'
        />
      </Head>
      <Box>
        <Grid container justifyContent='center' alignItems='center'>
          <Typography variant='h5' fontWeight='bold'>
            Search Property
          </Typography>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
          <Button
            variant='outlined'
            onClick={() => setSearchFilter((prevFilter) => !prevFilter)}
          >
            Filter
          </Button>
        </Box>
        {searchFilter && <SearchFilter />}
        <Box sx={{ margin: '1rem 2rem' }}>
          <Typography variant='h4'>
            Properties {router.query.purpose}{' '}
          </Typography>
          <Grid
            container
            spacing={3}
            direction='row'
            justifyContent='space-evenly'
            alignItems='center'
          >
            {properties.map((property) => (
              <Property property={property} key={property.id} />
            ))}
          </Grid>

          {properties.length === 0 && (
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='center'
              marginTop='3rem'
            >
              <Grid item sm={12}>
                <Image
                  width={300}
                  height={300}
                  alt='no-result'
                  src={notFound}
                />
              </Grid>
              <Typography variant='h6'>Results Not Found</Typography>
            </Grid>
          )}
        </Box>
      </Box>
    </Fragment>
  );
}

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await api(
    `${base_url}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
