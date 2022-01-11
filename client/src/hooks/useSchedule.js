import React from "react";
import axios from "axios";
import { AuthContext } from "../Auth";

import { fly } from "../actions/planeit";
import { upcoming } from "../actions/upcoming";

export const useSchedule = () => {
  const authContext = React.useContext(AuthContext);
  const scheduleHandler = (schedule) => {
    if (authContext.existingUser) {
      axios
        .post("api/schedule/update/" + authContext.user.currentUser.email, {
          meets: schedule,
        })
        .then((res) => {
          authContext.sched.setSchedule(res.data.meets);
          authContext.edited.setUnEdited(JSON.stringify(res.data.meets));
          authContext.upcome.setUpComing(
            upcoming(res.status === 204 ? [] : res.data.meets)
          );
          authContext.fly.setFlyDestination(
            fly(res.status === 204 ? [] : res.data.meets)
          );
        });
    } else {
      axios
        .post("/api/schedule/add", {
          email: authContext.user.currentUser.email,
          meets: schedule,
        })
        .then((res) => {
          authContext.sched.setSchedule(res.data.meets);
          authContext.edited.setUnEdited(JSON.stringify(res.data.meets));
          authContext.upcome.setUpComing(
            upcoming(res.status === 204 ? [] : res.data.meets)
          );
          authContext.fly.setFlyDestination(
            fly(res.status === 204 ? [] : res.data.meets)
          );
        });
    }
  };
  return scheduleHandler;
};
