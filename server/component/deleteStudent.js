async function deleteStudent(req, res, db) {
    const rollNo = req.params.rollNo;

    console.log("Request to delete student with roll_no:", rollNo);

    try {
    const deleteResponse = await db.query('DELETE FROM student WHERE roll_no = $1 RETURNING *', [rollNo]);

    if (deleteResponse.rowCount === 0) {
        return res.status(404).send('Student not found');
    }

    res.status(200).send(`Student with roll_no ${rollNo} deleted successfully`);
    } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).send('Internal Server Error');
    }
};
      

export default deleteStudent;
