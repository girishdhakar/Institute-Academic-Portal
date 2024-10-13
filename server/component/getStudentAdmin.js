async function getStudentAdmin(req, res, db) {
    // console.log('req.body in getStudentAdmin:', req.body);

    const { batch, class: department, rollNo: roll_no } = req.body;

    let query = `
        SELECT 
            student.roll_no AS roll_no, 
            student.name AS name, 
            student.email AS email, 
            student.department AS department, 
            student.batch AS batch, 
            student.mobileno AS mobileno, 
            student.address AS address, 
            takes.takes_id AS takes_id, 
            takes.grade AS grade, 
            takes.course_id AS course_id, 
            course.course_name AS course_name, 
            course.instructor_id AS instructor_id, 
            course.semester AS semester
        FROM 
            student
        JOIN 
            takes ON student.roll_no = takes.roll_no
        JOIN 
            course ON takes.course_ID = course.course_ID
        WHERE 
            1=1
    `;

    const params = [];
    
    if (batch) {
        // console.log("inside batch getStudentAdmin");
        query += ` AND student.batch = $${params.length + 1}`;
        params.push(parseInt(batch));
    }

    if (department) {
        // console.log("inside department getStudentAdmin");
        query += ` AND student.department = $${params.length + 1}`;
        params.push(department);
    }

    if (roll_no) {
        // console.log("inside rollNo getStudentAdmin");
        query += ` AND student.roll_no = $${params.length + 1}`;
        params.push(parseInt(roll_no));
    }

    query += ' ORDER BY student.batch, student.department, student.roll_no';

    try {
        // console.log(`final query : ${query}, final params : ${params}`);

        const result = await db.query(query, params);
        // console.log("student details fetched data : ", result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log("Error during fetching student data");
        console.error('Error during fetching student data', err);
        res.status(500).send('Internal Server Error');
    }
}

export default getStudentAdmin;
