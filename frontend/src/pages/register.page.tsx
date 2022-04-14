import React from 'react';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { PagesEnum } from '../enums';
import { useRegister } from '../hooks';

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    registerHandler,
    firstName,
    lastName,
    username,
    password,
    setFirstName,
    setLastName,
    setPassword,
    setUsername
  } = useRegister();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
      <Paper
        sx={{
          height: 200,
          width: 300,
          padding: 10,
          backgroundColor: '#a4cdf1',
          paddingTop: '30px',
          paddingBottom: '120px'
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
              label='First Name'
              variant='standard'
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id='standard-basic'
              label='Last Name'
              variant='standard'
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
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
              <Grid item xs={4}>
                <Button variant='contained' onClick={registerHandler}>Register</Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    navigate(PagesEnum.AUTH);
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
