import React, { useState, useEffect } from "react";
import MeetingCard from "../../../Components/MeetingCard/MeetingCard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./ClientDetailsMeetingsTab.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";
import { addClientMeeting } from "../../../Apis/Clients";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  DatePicker,
  TimeField,
  LocalizationProvider,
} from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";

function ClientDetailsMeetingsTab({ values, refresher }) {
  const [meetings, setMeetings] = useState([]);
  const [meetingBody, setMeetingBody] = useState("");
  const [open, setOpen] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [dialogType, setDialogType] = useState("view");

  const { clientId } = useParams();

  const handleOpen = (meeting) => {
    setDialogType("view");
    setMeetingTitle(meeting.title);
    setMeetingBody(meeting.body);
    setOpen(true);
  };

  const handleOpenAdd = () => {
    setDialogType("add");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMeetingTitleChange = (event) => {
    const { value } = event.target;
    setMeetingTitle(value);
  };

  const handleSubmit = async () => {
    await addClientMeeting(clientId, {
      title: meetingTitle,
      body: meetingBody,
    });
    setMeetingBody("");
    setMeetingTitle("");
    setOpen(false);
    refresher();
  };

  useEffect(() => {
    setMeetings(values);
  }, [values]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        className="AddMeetingButton disabled"
        onClick={handleOpenAdd}
        disabled={clientId === "new"}
      >
        Add Meeting
      </Button>
      <div className="MeetingsTabContainer">
        {clientId === "new" ? (
          <Typography>
            Meetings cannot be created until client info is submitted.
          </Typography>
        ) : meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              title={meeting.title}
              body={meeting.body}
              date={meeting.date}
              onClick={() => handleOpen(meeting)}
            />
          ))
        ) : (
          <Typography>
            There are no meetings to show. Feel free to add them by clicking on
            the link above.
          </Typography>
        )}
      </div>
      <Dialog
        onClose={handleClose}
        open={open}
        className="MeetingsDialogContainer"
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <div className="MeetingsDialog">
            <DialogTitle sx={{ paddingLeft: 0, paddingTop: 0 }}>
              Meeting Title
            </DialogTitle>
            <TextField
              className="MeetignsTabTextfield"
              name="meetingTitle"
              value={meetingTitle}
              onChange={handleMeetingTitleChange}
            />

            <div className="DateTimeContainer">
              <div>
                <DialogTitle sx={{ paddingLeft: 0, paddingTop: 0 }}>
                  Date
                </DialogTitle>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker
                    label="Select date"
                    defaultValue={DateTime.now()}
                    // onChange={(newDate) => {
                    //   setSelectedDate(newDate);
                    // }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <DialogTitle sx={{ paddingLeft: 0, paddingTop: 0 }}>
                  Time
                </DialogTitle>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <TimeField
                    defaultValue={DateTime.now()}
                    label="Select time"
                    // value={}
                    // onChange={(newDate) => {
                    //   setSelectedDate(newDate);
                    // }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <DialogTitle sx={{ paddingLeft: 0 }}>Description</DialogTitle>
            <ReactQuill
              theme="snow"
              className="MeetingQuill"
              value={meetingBody}
              onChange={setMeetingBody}
              readOnly={dialogType === "view" ? true : false}
              modules={{ toolbar: dialogType === "view" ? false : true }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {dialogType !== "view" && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="MeetingDialogButton Contained"
              disabled={meetingBody === "" && meetingTitle === ""}
            >
              Submit
            </Button>
          )}
          <Button
            onClick={handleClose}
            variant="outlined"
            className="MeetingDialogButton Outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClientDetailsMeetingsTab;
