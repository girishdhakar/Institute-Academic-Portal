async function getInstrCourses(req, res, db) {
    console.log("inside getInstrCourses");
    const { userID } = req.body;

    // const userID = 'a.ajith123'

    console.log("user_ID in getInstrCourses", userID);
  
  
    try {
      const result = await db.query(
        `SELECT * FROM course WHERE instructor_ID = $1;`,
        [userID]
      );

      console.log("instr courses : ", result.rows);
  
      res.status(200).json(result.rows); // Sending response as JSON
    } catch (error) {
      console.error('Error executing query in getInstrCourses:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export default getInstrCourses;
  