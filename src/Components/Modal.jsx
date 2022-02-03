import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  export default function TransitionsModal({priceToPay,storeTransaction}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const stripePromise = loadStripe(
      "pk_test_51KH7SdLyE3w569dvyH2Va8GSPG42YBY5CCRsurEzhm5YmgA3Y6mYxgd4L1EVKtjEHOH4RcRRxsbS9AyHxU8aAJni00tiI35K4Q"
    );
    
    const CheckoutForm = () => {
      const stripe = useStripe();
      const elements = useElements();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });
    
        if (!error) {
          const { id } = paymentMethod;
    
           const { dataStripe } = await axios.post("http://localhost:3001/api/checkout", {
             id,
             amount: priceToPay * 100,
           });
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <CardElement />
          </div>
          <button style= {{width:'250px'}} onClick={()=>storeTransaction()} >Buy with Stripe</button>
        </form>
      );
    };
  
  
    return (
      <div>
        <Button  variant='contained' onClick={handleOpen}>Pay with Stripe</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                tu pago debe ser de : {priceToPay}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }