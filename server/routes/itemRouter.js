import express from "express";
const router = express.Router();
import { getItems, getItemById, itemRegister, deleteItem, updateItem, itemCentres  } from "../controllers/itemController.js";

router.route("/").get(getItems);
router.route("/search").post(itemCentres);
router.route("/register").post(itemRegister);
router.route("/:id").delete(deleteItem).get(getItemById).put(updateItem);

export default router;

