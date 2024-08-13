import { Schema, model } from "mongoose";

interface Operation {
  operation: string;
  rightNumber: number;
  result: number;
}

interface CalculationTree {
  startingNumber: number;
  operations: Operation[];
}

const operationSchema = new Schema<Operation>({
  operation: { type: String, required: true },
  rightNumber: { type: Number, required: true },
  result: { type: Number, required: true },
});

const calculationTreeSchema = new Schema<CalculationTree>({
  startingNumber: { type: Number, required: true },
  operations: [operationSchema],
});

const CalculationTreeModel = model<CalculationTree>(
  "CalculationTree",
  calculationTreeSchema
);

export default CalculationTreeModel;
