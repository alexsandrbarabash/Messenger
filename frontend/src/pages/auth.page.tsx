import React from 'react';
import { Button, Grid, TextField, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { PagesEnum } from '../enums';
import { useLogin } from '../hooks';

const AuthPage = () => {
  const navigate = useNavigate();
  const { logInHandler, username, password, setUsername, setPassword } =
    useLogin();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
      <Paper
        sx={{
          height: 200,
          width: 300,
          padding: 10,
          backgroundColor: '#a4cdf1'
        }}
      >
        <Grid
          container
          direction='column'
          justifyContent='center'
          rowSpacing={1}
        >
          <Grid item xs={5}>
            <TextField
              id='standard-basic'
              label='Username'
              variant='standard'
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id='standard-password-input'
              label='Password'
              type='password'
              fullWidth
              autoComplete='current-password'
              variant='standard'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={{ xs: 3 }}>
              <Grid item xs={3}>
                <Button variant='contained' onClick={logInHandler}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    navigate(PagesEnum.REGISTER);
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AuthPage;
