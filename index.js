// index.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
app.use(express.json());

app.get('/',async (req,res) => {
  return res.json("Hello world")
})

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
   
 const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt);
     const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

 
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
