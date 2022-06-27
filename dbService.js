const dotenv = require('dotenv');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
let instance = null;
dotenv.config();

// MySQL connection
const dbCon = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT
})

dbCon.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('DB ', dbCon.state);
})
class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAll() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "select * from meetings";
                dbCon.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "select * from meetings where id = ?";
                dbCon.query(query,[id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async insertMeeting({uuid, alias, path}) {
        try {
            const insertedMeeting = await new Promise((resolve, reject) => {
                // Need to check the file path, if exist, continue, if not, give out an error
                // This process need to have more detail solution for file existing or not.

                const query = "insert into meetings (uuid, meeting_alias, path, status, started_time) values (?, ?, ? , ?, ?)";
                let status = "recording";
                let startTime = new Date();
                dbCon.query(query,[uuid, alias, path, status, startTime], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return insertedMeeting;
        } catch (error) {
            console.log(error);
        }
    }
}   


module.exports = DbService;