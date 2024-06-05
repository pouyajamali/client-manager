import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import "./MeetingCard.scss";

function MeetingCard({ title, date, onClick }) {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");

  useEffect(() => {
    setMeetingTitle(title);
    const isoDate = date.replace(" ", "T");
    const formattedDate = DateTime.fromISO(isoDate).toFormat("MMMM d, yyyy");
    setMeetingDate(formattedDate);
  }, [title, date]);

  return (
    <div className="MeetingCardContainer" onClick={() => onClick()}>
      <Typography className="title">{meetingTitle}</Typography>
      <br />
      <Typography className="date">{meetingDate}</Typography>
    </div>
  );
}

export default MeetingCard;
