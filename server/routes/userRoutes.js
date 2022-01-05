import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  searchUsers,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router.route("/search").post(protect, searchUsers);
router.route("/profile").get(protect, getUserProfile);

router.route("/").post(protect, registerUser);
router.route("/").get(protect, getUsers);

router.route("/:id").delete(protect, deleteUser);
router.route("/:id").get(protect, getUserProfile);
router.route("/:id").put(protect, updateUserProfile);

export default router;
