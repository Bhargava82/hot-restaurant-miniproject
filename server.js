const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
})
app.get("/api/config", (req, res) => {
    res.json({success: true});
})
const reservations = [];
const waitlist = [];
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
})
app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "views/reserve.html"));
})
app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "views/tables.html"));
})
app.get("/api/tables", (req, res) => {
    res.json(reservations);
})
app.get("/api/waitlist", (req, res) => {
    res.json(waitlist);
})
app.post("/api/tables", (req, res) => {
    const reservation = req.body;
    if(reservations.length < 5){
        reservations.push(reservation); 
        res.json(true);
    }else{
        waitlist.push(reservation);
       res.json(false);
    }
})