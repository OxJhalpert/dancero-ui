import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';



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

export default function TransitionsModal({ idDoc, show }) {
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => setOpen(false);

  React.useEffect(() =>
  {
    setOpen(show);
  }, [show])

  return (
    <div>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Successful payment
          </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <a href={"https://api.whatsapp.com/send?phone=573053549993&text=Hi i just purchase a pack of hours with id + " + idDoc}>
                Send a message to our agents.
              </a>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}