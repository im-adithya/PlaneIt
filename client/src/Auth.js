import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";

import { fly } from "./actions/planeit";
import { upcoming } from "./actions/upcoming";
import loader from "./assets/loader.svg";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [unEdited, setUnEdited] = useState(null);
  const [upComing, setUpComing] = useState([]);
  const [helper, setHelper] = useState(false);
  const [flyDestination, setFlyDestination] = useState(null);
  const [existingUser, setExistingUser] = useState(false);
  const [scheduleLoading, setscheduleLoading] = useState(true);

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("planeituser"));
    if (user) {
      setCurrentUser(user);
      axios.get("/api/schedule/" + user.email).then((res) => {
        const data = res.status === 204 ? [] : res.data;
        if (data.length !== 0) setExistingUser(true);
        setUnEdited(JSON.stringify(data));
        setSchedule(res.status === 204 ? [] : res.data);
        setUpComing(upcoming(res.status === 204 ? [] : res.data));
        setFlyDestination(fly(res.status === 204 ? [] : res.data));
        setscheduleLoading(false);
      });
    } else {
      setscheduleLoading(false);
    }
  }, []);

  if (scheduleLoading) {
    return <Image src={loader} width="50px" className="d-block mx-auto mt-5" />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: { currentUser, setCurrentUser },
        sched: { schedule, setSchedule },
        edited: { unEdited, setUnEdited },
        existing: { existingUser, setExistingUser },
        upcome: { upcoming, setUpComing },
        fly: { flyDestination, setFlyDestination },
        unEdited,
        existingUser,
        upComing,
        flyDestination,
        setscheduleLoading,
        helper: { helper, setHelper },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
