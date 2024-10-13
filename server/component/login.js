async function login(req, res, db, bcrypt) {
    const { userType, email, password } = req.body;
    const dbUserType = userType.toLowerCase();
  
    console.log('req.body:', req.body);
  
    try {
      const result = await db.query(`SELECT * FROM ${dbUserType} WHERE email = $1`, [email]);
      console.log('DB query result:', result.rows);
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
        // console.log('User found:', user);
  
        const storedHashedPassword = user.password;
  
        bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            res.status(500).send('Internal Server Error');
          } else {
            if (isMatch) {
              res.status(200).send({
                message: 'Login successful!',
                userID: userType === 'Student' ? user.roll_no : user.id,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileno,
              });
            } else {
              res.status(401).send('Incorrect Password');
            }
          }
        });
      } else {
        res.status(404).send('User not found....');
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export default login;
  