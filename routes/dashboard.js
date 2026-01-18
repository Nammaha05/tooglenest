// import express from "express";
// import { getDashboardStats } from "../controllers/dashboardController.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// router.get("/stats", auth, getDashboardStats);

// export default router;
import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.get("/stats", protect, getDashboardStats);
export default router;