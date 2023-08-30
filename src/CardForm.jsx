import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { CreditCard as CreditCardIcon } from '@mui/icons-material';
import axios from 'axios';

function CardForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardProvider, setCardProvider] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleCardNumberChange = (event) => {
    const inputCardNumber = event.target.value;
    setCardNumber(inputCardNumber);

    if (inputCardNumber.startsWith('4')) {
      setCardProvider('Visa');
    } else if (inputCardNumber.startsWith('5')) {
      setCardProvider('MasterCard');
    } else if (inputCardNumber.startsWith('37') || inputCardNumber.startsWith('34')) {
      setCardProvider('American Express');
    } else {
      setCardProvider('');
    }
  };

  const handleValidate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/validate', { cardNumber });
      setIsValid(response.data.valid);
    } catch (error) {
      console.error('Error validating card:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Credit Card Validation
          </Typography>
          <TextField
            label="Enter Card Number"
            type='number'
            variant="outlined"
            fullWidth
            value={cardNumber}
            onChange={handleCardNumberChange}
            InputProps={{
              endAdornment: (
                <CreditCardIcon color="action" sx={{ marginLeft: '0.5rem' }} />
              )
            }}
          />
          {cardProvider && (
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: '0.5rem' }}>
              Card Provider: {cardProvider}
            </Typography>
          )}
          <Grid container justifyContent="flex-end" sx={{ marginTop: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleValidate}
              disabled={!cardNumber}
            >
              Validate
            </Button>
          </Grid>
          {isValid !== null && (
            <Typography variant="body2" sx={{ marginTop: '1rem' }}>
              {isValid ? 'Valid card.' : 'Invalid card.'}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default CardForm;
