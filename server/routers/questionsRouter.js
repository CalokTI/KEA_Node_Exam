import { Router } from "express";
const router = Router();

import db from "../database/createConnection.js";

/* se alle, se alle aktive, opret ny, opdater, opdater og luk, slet */

router.get("/api/questions", async (req, res) => {
    const questions = await db.questions.find().toArray();
    if (questions) res.json({data: questions})
    res.sendStatus(404)
});

router.get("/api/questions/active", async (req, res) => {
    const questions = await db.questions.find({active:true}).toArray();
    if (questions) res.json({data: questions})
    res.sendStatus(404)
});

router.post("/api/questions", (req, res) => {
    const { name, semester, issue, subject} = req.body;
    let active = true;
    let solution = '';
    db.questions.insertOne({ name, semester, issue, subject, active, solution})
    res.sendStatus(200)
});

router.patch("/api/questions/:id", (req, res) => {
    const id = req.params.id;
    res.sendStatus(200)
});

router.delete("/api/questions/:id", (req, res) => {
    const id = req.params.id;
    db.questions.deleteOne({id})
    res.sendStatus(200)
});

export default router;
