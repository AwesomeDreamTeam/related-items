import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
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
    padding: '0px',
  },
  comparing: {
    paddingTop: '10px',
    paddingLeft: '10px',
    fontSize: '16px',
    fontWeight: 'lighter',
  },
  tableContainer: {
    maxHeight: 500,
    width: 525,
    overflow: 'auto',
    position: 'static',
  },
  tableHeader: {
    top: 0,
    padding: 0,
  },
  headerText: {
    width: '33%',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  check: {
    color: '#1e88e5',
  },
});

const CompareModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const currentProductFeatures = props.currentProductInfo.features;
  const comparedProductFeatures = props.comparedProductFeatures;
  const rows = [];
  const Features = new Set();
  const currentValues = [];
  const comparedValues = [];

  const getUniqueFeatures = () => {
    currentProductFeatures.forEach((feature) => {
      Features.add(feature.value);
      currentValues.push(feature.value);
    });
    comparedProductFeatures.forEach((feature) => {
      Features.add(feature.value);
      comparedValues.push(feature.value);
    });
  };
  getUniqueFeatures();

  function createData(bool1, feature, bool2) {
    return { bool1, feature, bool2 };
  }

  function createRows() {
    let compareHasFeature;
    let currentHasFeature;

    Features.forEach((feature) => {
      compareHasFeature = comparedValues.includes(feature);
      currentHasFeature = currentValues.includes(feature);
      if (feature !== 'null') {
        rows.push(createData(currentHasFeature, feature, compareHasFeature));
      }
    });
  }
  createRows();

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
            <Table stickyHeader>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell align="left" className={classes.headerText}>
                    {props.currentProductInfo.name}
                  </TableCell>
                  <TableCell align="center" className={classes.headerText} />
                  <TableCell align="right" className={classes.headerText}>
                    {props.comparedProductName}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map((row) => (
                    <TableRow key={row.feature}>
                      <TableCell align="left">
                        {
                          row.bool1
                            ? <CheckIcon className={classes.check} />
                            : null
                        }
                      </TableCell>
                      <TableCell align="center">{row.feature}</TableCell>
                      <TableCell align="right">
                        {
                          row.bool2
                            ? <CheckIcon className={classes.check} />
                            : null
                        }
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompareModal;
