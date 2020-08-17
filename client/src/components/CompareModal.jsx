import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    padding: '5px',
  },
  tableContainer: {
    minHeight: 250,
    width: 500,
  },
  tableHeader: {
    top: 0,
    // border: '1px solid red',
  },
  headerText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
});

const CompareModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => (e) => {
    e.preventDefault();
    setOpen(true);
    setScroll(scrollType);
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

  const classes = useStyles(props);


  console.log('props.currentProductInfo', props.currentProductInfo);
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
        <DialogTitle className={classes.title}>
          <Typography className={classes.comparing}>COMPARING</Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer className={classes.tableContainer}>
            <Table>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell align="left" className={classes.headerText}>
                    {props.currentProductInfo.name}
                  </TableCell>
                  <TableCell align="right" className={classes.headerText}>
                    {props.comparedProductName}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompareModal;
