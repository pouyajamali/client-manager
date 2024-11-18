import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import "./PlansCard.scss";

function ExistingPlansCard() {
  return (
    <>
      <Card className="CardContainer">
        <CardContent>
          <Typography className="PlansLogo">Manulife(Logo)</Typography>
          <div className="PlanInfo">
            <Typography fontWeight={700}>Plan Type:</Typography>
            <Typography>&nbsp;Life Insurance</Typography>
          </div>
          <div className="PlanInfo">
            <Typography fontWeight={700}>Status:</Typography>
            <Typography>&nbsp;Active</Typography>
            <CircleRoundedIcon color="success" fontSize="small" />
          </div>
          <div className="PlanInfo">
            <Typography fontWeight={700}>Monthly Payment:</Typography>
            <Typography>&nbsp;$ 78.5</Typography>
          </div>
          <div className="PlanInfo">
            <Typography fontWeight={700}>Start Date:</Typography>
            <Typography>&nbsp;May 6th, 2022</Typography>
          </div>
        </CardContent>
        <CardActions className="Actions">
          <Link href="#">Link to plan</Link>
        </CardActions>
      </Card>
    </>
  );
}

export default ExistingPlansCard;
