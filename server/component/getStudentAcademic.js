async function getStudentAcademic(req, res, db) {
    const { userID } = req.body;
  
  
    try {
      const result = await db.query(
        `SELECT takes.takes_id, takes.roll_no, takes.course_ID, takes.grade, course.course_name, course.semester
        FROM takes
        JOIN course ON takes.course_ID = course.course_ID
        WHERE takes.roll_no = $1
        ORDER BY course.semester;`,
        [userID]
      );
  
      res.status(200).json(result.rows); // Sending response as JSON
    } catch (error) {
      console.error('Error executing query in getStudentAcademic:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export default getStudentAcademic;
  