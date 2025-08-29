const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const FULL_NAME = 'your_full_name_here'; // lowercase, e.g., 'john_doe'
const DOB = 'ddmmyyyy'; // e.g., '17091999'
const EMAIL = 'your_email@domain.com';
const ROLL_NUMBER = 'YOURROLL123';

function getUserId() {
  return `${FULL_NAME}_${DOB}`;
}

function alternateCaps(str) {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    res += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return res;
}

app.post('/bfhl', (req, res) => {
  try {
    const inputArray = req.body.data;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let all_letters = '';

    inputArray.forEach(item => {
      if (/^\d+$/.test(item)) {
        // Number as string
        if (parseInt(item) % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += parseInt(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        all_letters += item;
      } else if (/[^a-zA-Z0-9]/.test(item)) {
        special_characters.push(item);
      }
    });

    // The concatenation/reverse/alternate-caps for alphabets
    let reversed = all_letters.split('').reverse().join('');
    let concat_string = alternateCaps(reversed);

    res.status(200).json({
      is_success: true,
      user_id: getUserId(),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (e) {
    res.status(400).json({
      is_success: false,
      message: e.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
