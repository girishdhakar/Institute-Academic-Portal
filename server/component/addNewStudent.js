async function addNewStudent(req, res, db) {

    const {name, roll_no, email, department, mobileNo, batch, address} = req.body;

    console.log("req.body in addNewStudent", req.body);

    try {
        const response  = await db.query('INSERT INTO student (name, email, roll_no, department, batch, mobileNo, address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, email, roll_no, department, batch, mobileNo, address])        
        console.log("Added new student successfully");

        try{
            const addToTakes = await db.query('INSERT INTO takes (roll_no) VALUES ($1)', [roll_no]);
            console.log("new student added to takes successfully");
        }
        catch(err){
            console.error("Error adding new student to takes data", err);
            res.status(500).send('Internal Server Error');
        }
        
        res.status(200).send("Added new student successfully");
    } catch (err) {
        console.error("Error adding new Student", err);
        res.status(500).send('Internal Server Error');
    }
}

export default addNewStudent;
