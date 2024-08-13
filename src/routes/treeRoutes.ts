import { Router } from "express";
import {
  startTree,
  addOperation,
  getTree,
} from "../controllers/treeController";

const router = Router();

router.post("/start-tree", startTree);
router.post("/add-operation/:treeId", addOperation);
router.get("/tree/:treeId", getTree);

export default router;
