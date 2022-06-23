import { Router } from "express";
const router = Router();

import db from "../database/createConnection.js";
import {ObjectId} from 'mongodb';

/* se alle, se alle aktive, opret ny, opdater, opdater og luk, slet */

router.get("/api/questions", async (req, res) => {
    const questions = await db.questions.find().toArray();
    if (questions) res.json({data: questions})
    else res.sendStatus(404)
});

router.get("/api/questions/active", async (req, res) => {
    const questions = await db.questions.find({active:true}).toArray();
    if (questions) res.send({ data: questions })
    else res.sendStatus(404)
});

router.post("/api/questions", (req, res) => {
    const { name, semester, issue, subject, IDsocket} = req.body;
    let active = true;
    let solution = '';
    db.questions.insertOne({ name, semester, issue, subject, active, solution, IDsocket})
    res.sendStatus(200)
});

router.patch("/api/questions/:id", async (req, res) => {
    const id = new ObjectId(req.params.id);
    const { active, solution } = req.body;
    const filter = { '_id': id };
    const update = { $set: {'solution': solution, 'active': active} }
    const result = await db.questions.updateOne( filter, update )
    res.sendStatus(200)
});

router.delete("/api/questions/:id", (req, res) => {
    const id = req.params.id;
    db.questions.deleteOne({id})
    res.sendStatus(200)
});

export default router;
