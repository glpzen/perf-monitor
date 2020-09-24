import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Charts from "./compoenents/Charts";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));



function App() {
    const classes = useStyles();
  return (
      <div className={classes.root}>
          <Container maxWidth="md">
              <Charts/>
          </Container>
      </div>
  );
}

export default App;
