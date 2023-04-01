import { Router } from "express";

const router = Router();
/**
 * Product
 */
router.get("/job", (req, res) => {
  res.json({ message: "job" });
});

router.get("/job/:id", (req, res) => {});

router.post("/job", (req, res) => {});

router.put("/job/:id", (req, res) => {});

router.delete("/job/:id", (req, res) => {});

/**
 * Update
 */

router.get("/blog", (req, res) => {});

router.get("/blog/:id", (req, res) => {});

router.post("/blog", (req, res) => {});

router.put("/blog/:id", (req, res) => {});

router.delete("/blog/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/message", (req, res) => {});

router.get("/message/:id", (req, res) => {});

router.post("/message", (req, res) => {});

router.put("/message/:id", (req, res) => {});

router.delete("/message/:id", (req, res) => {});

export default router;
