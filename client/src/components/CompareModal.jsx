import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import IconButton from '@material-ui/core/IconButton';


const CompareModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => (e) => {
    e.preventDefault();
    if (e.target.nodeName === 'svg' || e.target.nodeName === 'path' || e.target.nodeName === 'BUTTON') {
      // console.log(`compare ${this.state.currentId} with ${this.state.productView}`);
      setOpen(true);
      setScroll(scrollType);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <IconButton id="icon-button" title="Compare Products" onClick={handleClickOpen('paper')}>
        <CompareArrowsIcon id="icon" fontSize="large" style={{ color: 'white' }} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle>Modal!!!!</DialogTitle>

      </Dialog>
    </div>
  );
};

export default CompareModal;
