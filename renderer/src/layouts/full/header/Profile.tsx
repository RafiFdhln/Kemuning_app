import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";

import { IconBuilding, IconChevronDown, IconChevronUp, IconLayoutNavbarExpand, IconListCheck, IconMail, IconSettings, IconUser, IconUserCircle } from "@tabler/icons-react";
import FullLayout from "../FullLayout";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box
    sx={{
      display: 'flex',        
      alignItems: 'center',
    }}>
      <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      <IconButton
        size="medium"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "text.primary",
          }),
        }}
        onClick={handleClick2}
      >
        {anchorEl2 ? <IconChevronUp /> : <IconChevronDown />}
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem component={Link} href="/profile/CompanyProfile" onClick={handleClose2}>
          <ListItemIcon>
            <IconBuilding width={20} />
          </ListItemIcon>
          <ListItemText>Profil Perusahaan</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/profile/OfficialProfile" onClick={handleClose2}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Profil Pengurus</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/profile/Setting" onClick={handleClose2}>
          <ListItemIcon>
            <IconSettings width={20} />
          </ListItemIcon>
          <ListItemText>Pengaturan</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};