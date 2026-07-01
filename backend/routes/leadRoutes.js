import express from "express";
import { getLeads, getLeadById, createLead, deleteLead } from "../controllers/leadController.js";

const router = express.Router();

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);
router.delete("/:id", deleteLead);

export default router;