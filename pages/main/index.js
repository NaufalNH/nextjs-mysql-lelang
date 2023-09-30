// const Home = () => {

    
//     return(
// <div>kasdknasaskjjn</div>
//     )
// }

// export default Home;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {

  return (
    <>
    <div>
    <div className='flex flex-row gap-[1rem] flex-wrap'>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD 1"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD 2"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD 3"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong>16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 240}} className='mb-[1rem]'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="ROG Strix GL553VD"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img" 
        image="/assets/images/notfound.png"
        alt="Paella dish"
        sx={{height:140}}    
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tanggal : <strong className='text-sky-600' > 16 September 2016</strong>
        </Typography>
          <Typography variant="body2" color="text.secondary">
          Harga: <strong className='text-sky-600'>Rp. 2.000.000</strong>
        </Typography>
      </CardContent>
          <CardActions>
      <Button size="small">Offer</Button>
    </CardActions>
    </Card>
    </div>
    </div>
    </>
  );
}