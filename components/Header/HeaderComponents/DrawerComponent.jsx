import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  StylesProvider,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import styles from "../../../styles/navbar.module.css";
import Image from "next/image";
import CinemaLogo from "../../../public/assets/homepage/CinemaLogo.png";
import { marketPlaceData, moreData, socialData } from "data/data";

const DrawerComponent = () => {

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className={styles.drawerbg}>
          <List>
            <ListItem>
              <ListItemButton onClick={handleClick}>
                <ListItemText>MARKETPLACE</ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="li" disablePadding className={styles.dropdown}>
                {marketPlaceData.map((item, index) => (
                  <a href={item.link} target="_blank" key={item.id}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>{item.title}</ListItemText>
                    </ListItemButton>
                  </a>
                ))}
              </List>
            </Collapse>
            <ListItem>
              <ListItemButton>
                <ListItemText>REFERRAL</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleClick2}>
                <ListItemText>COMMUNITY</ListItemText>
                {open2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="li" disablePadding className={styles.dropdown}>
                {socialData.map((item, index) => (
                  <a href={item.link} target="_blank" key={item.id}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>{item.title}</ListItemText>
                    </ListItemButton>
                  </a>
                ))}
              </List>
            </Collapse>
            <ListItem>
              <ListItemButton onClick={handleClick3}>
                <ListItemText>MORE</ListItemText>
                {open3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="li" disablePadding className={styles.dropdown}>
                {moreData.map((item, index) => (
                  <a href={item.link} target="_blank" key={item.id}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>{item.title}</ListItemText>
                    </ListItemButton>
                  </a>
                ))}
              </List>
            </Collapse>
            <ListItem>
              <Image
                src={CinemaLogo}
                alt="CinemaLogo"
                width={130}
                height={29}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <div className={styles.menuButton}>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default DrawerComponent;
