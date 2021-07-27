import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

function HomeMenu({ anchorEl, setAnchorEl, setDrawerOpen, setModalOpen }) {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <MenuItem
        onClick={() => {
          handleClose();
          setDrawerOpen(true);
        }}
      >
        New Group
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          setModalOpen(true);
        }}
      >
        New Contact
      </MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );
}

export default HomeMenu;
