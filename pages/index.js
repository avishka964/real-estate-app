import Link from 'next/link';
import Image from 'next/image';
import { Grid, Box, Typography, Button, Paper, ButtonBase} from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from '../styles/Home.module.css';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%', 
});

const Banner = ({imageUrl , purpose, title, desc, linkName, buttonText}) => (
  <Paper sx={{ p: 2, margin: 'auto',  maxWidth: 800, flexGrow: 1 }}>
  <Grid container spacing={2}>
    <Grid item>
      <ButtonBase>
        <Image src={imageUrl} width={500} height={300} alt='main-banner' />
      </ButtonBase>
    </Grid>
    <Grid item xs={12} sm container>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1" component="div">
            {purpose}
          </Typography>
          <Typography variant="body2" gutterBottom>
           {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
)

export default function Home() {
  return (
    <div className={styles.container}>
    <Banner  
      purpose='RENT A HOME'
      title='Rental Homes for Everyone'
      desc='Explore Apartments, Villas, Homes and many more'
      buttonText='Explore Renting'
      linkName='/search?purpose=for-rent'
      imageUrl='https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
     />
     <Grid>
 
     </Grid>
    <Banner  
      purpose='BUY A HOME'
      title='Find, Buy & Own your Dream Home'
      desc='Explore Apartments, Villas, Homes and many more'
      buttonText='Explore Buying'
      linkName='/search?purpose=for-sale'
      imageUrl='https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
     />
    <Grid>

    </Grid>
    </div>
  )
}
