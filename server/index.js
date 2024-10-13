import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import login from './component/login.js';
import register from './component/register.js';
import getStudentAcademic from './component/getStudentAcademic.js';
import getStudentAdmin from './component/getStudentAdmin.js';
import getInstrCourses from './component/getInstrCourses.js';
import saveStudentData from './component/saveStudentData.js';
import addNewStudent from './component/addNewStudent.js';
import getStudentDetail from './component/getStudentDetail.js';
import deleteStudent from './component/deleteStudent.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'RegistrationPortal',
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

app.post('/submit-signup', async(req, res) => register(req, res, db, bcrypt, saltRounds));

app.post('/submit-login', async(req, res) => login(req, res, db, bcrypt));

app.post('/student-academic', async(req, res) => getStudentAcademic(req, res, db));

app.post('/student-admin', async(req, res) => getStudentAdmin(req, res, db));

app.post('/student-solo', async(req, res) => getStudentAdmin(req, res, db));

app.post('/instr-courses', async(req, res) => getInstrCourses(req, res, db));

app.post('/save-student-data', async(req, res) => saveStudentData(req, res, db));

app.post('/add-student', async(req, res) => addNewStudent(req, res, db));

app.post('/student-detail', async(req, res) => getStudentDetail(req, res, db));

app.delete('/delete-student/:rollNo', async (req, res) => deleteStudent(req, res, db));  


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
