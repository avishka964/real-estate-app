import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  ButtonBase,
} from '@mui/material';
import { base_url, api } from '../utils/api';
import Property from '../components/Property';

const Banner = ({ imageUrl, purpose, title, desc, linkName, buttonText }) => (
  <Paper variant="outlined" sx={{ p: 2, margin: 'auto', maxWidth: 800, flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item>
        <ButtonBase>
          <Image src={imageUrl} width={500} height={300} alt='main-banner' />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction='column' spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant='subtitle1' component='div'>
              {purpose}
            </Typography>
            <Typography  variant="h5" gutterBottom fontWeight='bold'>
              {title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {desc}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant='contained'>
              <Link href={linkName}>{buttonText}</Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <Fragment>
      <Head>
        <title>Real Estate Solution</title>
        <meta
          name='description'
          content='Most popular real estates in the world'
        />
      </Head>
      <Banner
        purpose='RENT A HOME'
        title='Rental Homes for Everyone'
        desc='Explore Apartments, Villas, Homes and many more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
      />
      <Box
        sx={{
          margin: '2.5rem 2rem',       
        }}
      >
        <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"     
        >
          {propertiesForRent.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Grid>
      </Box>
      <Banner
        purpose='BUY A HOME'
        title='Find, Buy & Own your Dream Home'
        desc='Explore Apartments, Villas, Homes and many more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
      />

      <Box
        sx={{
          margin: '2.5rem 2rem',       
        }}
      >
      <Grid
        container
        direction='row'
        justifyContent='space-evenly'
        alignItems='center'
        spacing={3}
      >
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Grid>
      </Box>
    </Fragment>
  );
}

export async function getStaticProps() {
  const forSaleProp = await api(
    `${base_url}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const forRentProp = await api(
    `${base_url}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: forSaleProp?.hits,
      propertiesForRent: forRentProp?.hits,
    },
  };
}
