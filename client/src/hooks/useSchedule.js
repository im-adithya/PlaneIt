import React from "react";
import axios from "axios";
import { AuthContext } from "../Auth";

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
        });
    } else {
      axios
        .post("/api/schedule/add", {
          email: authContext.user.currentUser.email,
          meets: schedule,
        })
        .then((res) => {
          authContext.sched.setSchedule(res.data.meets);
        });
    }
  };
  return scheduleHandler;
};
