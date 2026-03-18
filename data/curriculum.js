import { phase1Units } from "./phase1.js";
import { templateUnits } from "./templateUnits.js";

export const curriculum = [...phase1Units, ...templateUnits].map((unit, index) => ({
  ...unit,
  id: `unit-${index + 1}`,
  lessonNumber: index + 1
}));
