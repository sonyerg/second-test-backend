import { Request, Response } from "express";

import CalculationTreeModel from "../models/CalculationTree";

export async function startTree(req: Request, res: Response) {
  const { startingNumber } = req.body;

  const newTree = new CalculationTreeModel({
    startingNumber,
    operations: [],
  });

  try {
    const savedTree = await newTree.save();
    res.status(201).json(savedTree);
  } catch (error) {
    res.status(500).json({ error: "Failed to start calculation tree" });
  }
}

export async function addOperation(req: Request, res: Response) {
  const { treeId } = req.params;
  const { operation, rightNumber } = req.body;

  try {
    const tree = await CalculationTreeModel.findById(treeId);
    if (!tree) {
      return res.status(404).json({ error: "Calculation tree not found" });
    }

    const lastResult =
      tree.operations.length > 0
        ? tree.operations[tree.operations.length - 1].result
        : tree.startingNumber;

    let result: number;
    switch (operation) {
      case "+":
        result = lastResult + rightNumber;
        break;
      case "-":
        result = lastResult - rightNumber;
        break;
      case "*":
        result = lastResult * rightNumber;
        break;
      case "/":
        result = lastResult / rightNumber;
        break;
      default:
        return res.status(400).json({ error: "Invalid operation" });
    }

    const newOperation = { operation, rightNumber, result };
    tree.operations.push(newOperation);

    const updatedTree = await tree.save();
    res.status(200).json(updatedTree);
  } catch (error) {
    res.status(500).json({ error: "Failed to add operation" });
  }
}

export async function getTree(req: Request, res: Response) {
  const { treeId } = req.params;

  try {
    const tree = await CalculationTreeModel.findById(treeId);
    if (!tree) {
      return res.status(404).json({ error: "Calculation tree not found" });
    }

    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch calculation tree" });
  }
}
