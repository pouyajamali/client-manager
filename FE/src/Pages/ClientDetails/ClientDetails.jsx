import "./ClientDetails.scss";
import { useParams } from "react-router-dom";
import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClientDetailsInfoTab from "./InfoTab/ClientDetailsInfoTab";
import ClientDetailsMeetingsTab from "./MeetingsTab/ClientDetailsMeetingsTab";
import { useState, useEffect } from "react";
import { getClientDetail } from "../../Apis/Clients";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function ClientDetails() {
  const { clientId } = useParams();
  const theme = useTheme();
  const [clientInfo, setClientInfo] = React.useState();
  const [clientMeetings, setClientMeetings] = React.useState([]);
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = React.useState(0);

  const refresher = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientDetail(clientId);
        const { meetings, ...clientInfo } = data;
        setClientInfo(clientInfo);
        setClientMeetings(data.meetings);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    if (clientId !== "new") {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="MainContainer">
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          className="customTabsClass"
        >
          <Tab label="Info Tab" {...a11yProps(0)} />
          <Tab label="Meetings Tab" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ClientDetailsInfoTab values={clientInfo} clientId={clientId} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ClientDetailsMeetingsTab
          values={clientMeetings}
          refresher={() => refresher()}
        />
      </TabPanel>
    </div>
  );
}

export default ClientDetails;
