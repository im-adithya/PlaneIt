import React from "react";
import axios from "axios";
import { AuthContext } from "../Auth";

import { fly } from "../actions/planeit";
import { upcoming } from "../actions/upcoming";

export const useLogin = () => {
  const authContext = React.useContext(AuthContext);
  const loginHandler = (googleData) => {
    authContext.setscheduleLoading(true);
    axios
      .post(
        "/api/v1/auth/google",
        { token: googleData.tokenId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("planeituser", JSON.stringify(res.data));
        authContext.user.setCurrentUser(res.data);
        axios.get("/api/schedule/" + res.data.email).then((res) => {
          const data = res.status === 204 ? [] : res.data;
          if (data.length !== 0) authContext.existing.setExistingUser(true);
          authContext.edited.setUnEdited(JSON.stringify(data));
          authContext.sched.setSchedule(res.status === 204 ? [] : res.data);
          authContext.upcome.setUpComing(
            upcoming(res.status === 204 ? [] : res.data)
          );
          authContext.fly.setFlyDestination(
            fly(res.status === 204 ? [] : res.data)
          );
          authContext.setscheduleLoading(false);
        });
      });
  };
  return loginHandler;
};
