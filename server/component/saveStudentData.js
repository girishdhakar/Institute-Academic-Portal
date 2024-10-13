async function saveStudentData(req, res, db) {
    console.log('req.body in saveStudentData:', req.body);

    const roll_no = req.body[0].roll_no;

    try {
        const deleteResult = await db.query('DELETE FROM takes WHERE takes.roll_no = $1', [roll_no]);
        console.log(`Deleted rows with roll_no: ${roll_no}`);
    } catch (err) {
        console.error("Error deleting takes rows with current roll_no:", err);
        return res.status(500).send('Internal Server Error');
    }

    try {
        const addTakesDataPromises = req.body.map((row) =>
            db.query('INSERT INTO takes (roll_no, course_id, grade) VALUES ($1, $2, $3)', [row.roll_no, row.course_id, row.grade])
        );

        await Promise.all(addTakesDataPromises);
        console.log(`Added takes data for roll_no: ${roll_no}`);
        res.status(200).send("Changes saved successfully");
    } catch (err) {
        console.error("Error adding takes data with current roll_no:", err);
        res.status(500).send('Internal Server Error');
    }
}

export default saveStudentData;
