import React from "react";
import { Link, useHistory  } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import './Landing.css';

import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Navbar = ({ handleSliderChange }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const history = useHistory();
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "About",
      icon: <InfoIcon />,
      link: "/about",
    },
    {
      text: "Achievement",
      icon: <EmojiEventsIcon />,
      link: "/achievement",
    },
    // {
    //   text: "Gallery",
    //   icon: <EmojiEventsIcon />,
    //   link: "/achievement",
    // },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      link: "/contact",
    },
  ];

  /*
  const handleAdmissionClick = () => {
    // Navigate to "/admindash" when the "ADMISSION" button is clicked
    history.push("/admindash");
  };
   <button className="primary-button" onClick={handleAdmissionClick}>
          ADMISSION
        </button>
        
*/
  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item) => (
          <Link key={item.text} to={item.link} onClick={() => handleSliderChange(item.link)}>
            {item.text}
          </Link>
        ))}
        
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
