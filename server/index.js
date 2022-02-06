const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { application } = require("express");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password:"password",
    database: "students"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded());

app.get("/api/get",(req,res) =>{
    const sqlGet = "SELECT * FROM student";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    })
})

app.get("/api/get/:id",(req,res) =>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM students.attendance LEFT JOIN students.student ON students.attendance.id = students.student.id;";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    })
})



app.post("/api/post",(req,res)=>{
    const{name} = req.body;
    const sqlInsert = "INSERT INTO student(name) VALUES(?)";
    db.query(sqlInsert,[name],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})

app.delete("/api/remove/:id",(req,res)=>{
    const{id} = req.params;
    const sqlRemove = "DELETE FROM student WHERE id= ?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
})

app.post("/api/present/:id",(req,res)=>{
    const{id} = req.params;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    
    const sqlPresent = "INSERT INTO students.attendance VALUES(?,?,?,?,?)";
    db.query(sqlPresent,[id,day,month,year,'P'],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
    console.log(id);
    
    
    
})

app.post("/api/absent/:id",(req,res)=>{
    const{id} = req.params;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
   
    const sqlAbsent = "INSERT INTO students.attendance VALUES(?,?,?,?,?)";
    db.query(sqlAbsent,[id,day,month,year,'A'],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
    console.log(id);
    
    
})



app.get("/",(req,res)=>{
    // const sqlInsert = "INSERT INTO students (name) VALUES ('yash')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("error",error);
    //     console.log("result",result);
    //     res.send("Hello Express");
        
    // })
})

app.listen(5000,() => {
    console.log("Server is running on port 5000");
})