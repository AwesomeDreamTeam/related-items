import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
);
