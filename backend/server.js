const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/validate', (req, res) => {
  const { cardNumber } = req.body;
  const isValid = validateCardNumber(cardNumber);
  
  res.json({ valid: isValid });
});

function validateCardNumber(cardNumber) {
  const sanitizedCardNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(sanitizedCardNumber)) {
    return false;
  }
  
  let sum = 0;
  let double = false;
  for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedCardNumber.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    double = !double;
  }
  
  return sum % 10 === 0;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
