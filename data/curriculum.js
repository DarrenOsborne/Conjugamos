import { phase1Units } from "./phase1.js";
import { templateUnits } from "./templateUnits.js";
import { expandUnitDrills } from "./drillGenerator.js";

export const curriculum = [...phase1Units, ...templateUnits].map((unit, index) => ({
  ...expandUnitDrills(unit),
  id: `unit-${index + 1}`,
  lessonNumber: index + 1
}));
