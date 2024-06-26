import { useState, useEffect } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link";
import pdfIcon from "../../Assets/Icons/icons8-pdf-48.png";
import "./DocumentCard.scss";

const MenuDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  const options = ["Download", "Forward"];
  const ITEM_HEIGHT = 48;

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open && undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',  // Changed from 'top' to 'bottom'
          horizontal: 'right', // Aligns the right edge of the menu with the right edge of the icon button
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

function DocumentCard() {
  return (
    <>
      <Card className="DocumentCardContainer">
        <CardActionArea>
          <div className="PDFIconContainer">
            <img src={pdfIcon} className="PDFIcon" />
          </div>
          {/* <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent> */}
        </CardActionArea>
        <CardActions>
          <Link href="#" className="DocumentName">
            Heather_Kent_Needs_Analysis.pdf
          </Link>
          <MenuDropdown />
        </CardActions>
      </Card>
    </>
  );
}

export default DocumentCard;
