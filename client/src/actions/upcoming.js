import { PROPER_SCHEDULERS } from "../constants/properSchedulers";

export const upcoming = (schedule) => {
  const today = new Date();
  const day = PROPER_SCHEDULERS[today.getDay()];
  const hour = today.getHours();

  var result = [];
  for (let destination of schedule) {
    if (!destination.days.includes(day)) continue;
    else {
      if (hour < destination.startTime) {
        result.push(destination);
      }
    }
  }
  return result.sort((a, b) => a.startTime - b.startTime).splice(0, 3);
};
