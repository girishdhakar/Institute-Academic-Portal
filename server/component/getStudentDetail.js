async function getStudentDetail(req, res, db) {
    
    const { roll_no } = req.body;

    // Log the request body for debugging purposes
    console.log("req.body in getStudentDetail", req.body);

    try {
        const response = await db.query('SELECT * FROM student WHERE roll_no = $1', [roll_no]);

        if (response.rows.length === 0) {
            return res.status(404).send('Student not found');
        }

        res.status(200).send(response.rows);
    } catch (err) {

        console.error("Error retrieving student details", err);

        res.status(500).send('Internal Server Error');
    }
}

export default getStudentDetail;
