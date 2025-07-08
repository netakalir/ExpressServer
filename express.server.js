import express from "express";
import { Server } from "http";

const app = express();
const users = [{ username: "neta" }];

app.get("/", (req, res) => {
    res.send("welcome to home");
});

app.get("/users", (req, res) => {
    console.log(req.query);
    const {username} = req.query;
    console.log(username);
    res.json(users);
});

app.get("/about", (req, res) => {
    res.send("about us");
});



app.listen(3005, () => {
    console.log("express server running on http://localhost:3005");
});