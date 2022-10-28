import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CreditCardIcon from '@mui/icons-material/CreditCardTwoTone';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Constants from '../../constants';
import Styles from './styles';

const HomeScreenDesktop = ({ existingPaymentMethods, handleFormState }) => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const styles = Styles();

  const updateSelectedPaymentMethod = () => {
    let selectedPaymentMethod;
    // If this is the first or last element in the Swiper carousel
    // NOTE: NOT the existingPaymentMethods, but rather relative to the carousel
    if (swiperRef.current.activeIndex === 0 || swiperRef.current.activeIndex === existingPaymentMethods.length - 1) {
      // Mark this as the expense entry which was not part of the pre-configured payment methods
      // NOTE: We assume that the first and last element will always be the default expense entry
      // which we have set as a <SwiperSlide> component
      selectedPaymentMethod = null;
    } else {
      // Otherwise this should be a valid existing payment method
      // NOTE: We need to -1 from the active Swiper index since the first configured payment method
      // will start from index 1 in the Swiper component
      // (index 0 and the last index in the Swiper will be the default expense entry)
      selectedPaymentMethod = existingPaymentMethods[swiperRef.current.activeIndex - 1];
    }

    handleFormState((prevState) => ({ 
      ...prevState, 
      expense: selectedPaymentMethod
    }));
  }

  return (
    <Grid container direction="column" alignItems="center" sx={{ marginTop: 5 }}>
      <Grid xs>
        <Typography variant='h2'>{Constants.CONTENT.HOME.TITLE}</Typography>
      </Grid>
      <Grid xs={8} sx={{ marginTop: 5 }}>
        <Stack direction="row">
          <IconButton 
            disabled={!existingPaymentMethods || existingPaymentMethods.length < 1} 
            onClick={() => swiperRef.current.slidePrev()}>
            <KeyboardArrowLeftIcon fontSize='large' />
          </IconButton>
          <Swiper
            slidesPerView={
              existingPaymentMethods.length >= 3 ? 3 : Math.min(1, existingPaymentMethods.length)
            }
            loop
            onBeforeInit={(swp) => {
              swiperRef.current = swp;
            }}
          >
            {existingPaymentMethods.map((mtd, idx) => (
              <SwiperSlide key={idx}>
                <Stack alignItems="center">
                  <CreditCardIcon sx={styles.card(idx)} />
                  <Typography>{`${mtd.paymentName} (${mtd.paymentType})`}</Typography>
                  <Typography>{mtd.paymentIssuer}</Typography>
                </Stack>
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <Stack alignItems="center">
                <RequestQuoteIcon sx={styles.defaultCard} />
                <Typography>{Constants.CONTENT.HOME.DEFAULT_EXPENSE_ENTRY}</Typography>
              </Stack>
            </SwiperSlide>
          </Swiper>
          <IconButton 
            disabled={!existingPaymentMethods || existingPaymentMethods.length < 1} 
            onClick={() => swiperRef.current.slideNext()}>
            <KeyboardArrowRightIcon fontSize='large' />
          </IconButton>
        </Stack>
      </Grid>
      <Grid xs sx={{ marginTop: 5 }}>
        <Button 
          variant='contained' 
          onClick={() => { 
            updateSelectedPaymentMethod();
            navigate(Constants.PATHS.HOME_CREATE_EXPENSE); 
          }}
        >
          {Constants.CONTENT.HOME.CREATE_ENTRY_BTN}
        </Button>
      </Grid>
    </Grid>
  );
}

export default HomeScreenDesktop;