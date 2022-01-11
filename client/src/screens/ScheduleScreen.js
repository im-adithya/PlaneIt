import React, { useState, useContext } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

import { useSchedule } from "../hooks/useSchedule";
import { AuthContext } from "../Auth";
import TimeTable from "../components/TimeTable";
import Helper from "../components/Helper";

export const ScheduleContext = React.createContext();

const ScheduleScreen = () => {
  const history = useHistory();
  const scheduleHandler = useSchedule();
  const { user, existingUser, unEdited, helper } = useContext(AuthContext);
  const unEdit = JSON.parse(unEdited);
  const sched = useContext(AuthContext).sched.schedule;

  const [schedule, setSchedule] = useState(sched);
  const userName = user.currentUser.name.split(" ")[0].toLowerCase();

  return (
    <Container className="h-100vh pt-5 text-center">
      {helper.helper && <Helper />}
      <ScheduleContext.Provider value={[schedule, setSchedule]}>
        <h2 className="my-4 mb-md-3 headline-3">
          Welcome {userName.charAt(0).toUpperCase() + userName.slice(1)}
          {existingUser
            ? ", edit your schedule!"
            : "! Let's set our schedule first!"}
        </h2>
        <TimeTable />
        <Button
          className="big-circ-btn my-3"
          onClick={() => {
            if (!_.isEqual(schedule, unEdit)) scheduleHandler(schedule);
            history.push("/set");
          }}
        >
          Proceed
        </Button>
      </ScheduleContext.Provider>
    </Container>
  );
};

export default ScheduleScreen;
