import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { blue, lightGreen, grey, lightBlue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[600],
    },
    secondary: {
      main: lightGreen[500],
    },
    background: {
      paper: '#303030',
    },
  },

});

export default theme;