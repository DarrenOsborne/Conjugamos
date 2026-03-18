import { expandUnitDrills } from "./drillGenerator.js";
import { lesson as lesson01 } from "./lessons/lesson01.js";
import { lesson as lesson02 } from "./lessons/lesson02.js";
import { lesson as lesson03 } from "./lessons/lesson03.js";
import { lesson as lesson04 } from "./lessons/lesson04.js";
import { lesson as lesson05 } from "./lessons/lesson05.js";
import { lesson as lesson06 } from "./lessons/lesson06.js";
import { lesson as lesson07 } from "./lessons/lesson07.js";
import { lesson as lesson08 } from "./lessons/lesson08.js";
import { lesson as lesson09 } from "./lessons/lesson09.js";
import { lesson as lesson10 } from "./lessons/lesson10.js";
import { lesson as lesson11 } from "./lessons/lesson11.js";
import { lesson as lesson12 } from "./lessons/lesson12.js";
import { lesson as lesson13 } from "./lessons/lesson13.js";
import { lesson as lesson14 } from "./lessons/lesson14.js";
import { lesson as lesson15 } from "./lessons/lesson15.js";
import { lesson as lesson16 } from "./lessons/lesson16.js";
import { lesson as lesson17 } from "./lessons/lesson17.js";
import { lesson as lesson18 } from "./lessons/lesson18.js";
import { lesson as lesson19 } from "./lessons/lesson19.js";
import { lesson as lesson20 } from "./lessons/lesson20.js";
import { lesson as lesson21 } from "./lessons/lesson21.js";
import { lesson as lesson22 } from "./lessons/lesson22.js";
import { lesson as lesson23 } from "./lessons/lesson23.js";
import { lesson as lesson24 } from "./lessons/lesson24.js";
import { lesson as lesson25 } from "./lessons/lesson25.js";
import { lesson as lesson26 } from "./lessons/lesson26.js";

const lessons = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
  lesson21,
  lesson22,
  lesson23,
  lesson24,
  lesson25,
  lesson26
];

export const curriculum = lessons.map((unit, index) => ({
  ...expandUnitDrills(unit),
  id: `unit-${index + 1}`,
  lessonNumber: index + 1
}));
