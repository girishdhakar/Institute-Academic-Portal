async function register(req, res, db, bcrypt, saltRounds) {
    const { userType, email, password, name, mobileNo, userID } = req.body;
    const dbUserType = userType.toLowerCase();
  
    try {
      const checkResult = await db.query(`SELECT * FROM ${dbUserType} WHERE email = $1`, [email]);
      if (checkResult.rows.length > 0) {
        return res.status(400).send('Email already exists. Try logging in.');
      }
  
      const hash = await bcrypt.hash(password, saltRounds);
  
      const insertQuery = userType === 'Student' ?
        `INSERT INTO ${dbUserType} (roll_no, name, email, mobileNo, password) VALUES ($1, $2, $3, $4, $5)` :
        `INSERT INTO ${dbUserType} (ID, name, email, mobileNo, password) VALUES ($1, $2, $3, $4, $5)`;
  
      const insertParams = [userID, name, email, mobileNo, hash];
      await db.query(insertQuery, insertParams);
  
      res.status(201).send('Signup successful! You can login now.');
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export default register;
  