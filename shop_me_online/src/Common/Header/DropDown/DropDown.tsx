import React, { useState } from "react";
import useStyles from "./DropDownStyles";
import { useNavigate } from "react-router-dom";

//redux
import { useSelector } from 'react-redux';
import { ReduxState } from "../../../state";

//components
import { ConnectedUserDD } from "./ConnectedUserDD/ConnectedUserDD";
import { DisconnectedUserDD } from "./DisconnectedUserDD/DisconnectedUserDD";

//icons
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AiOutlineHome } from 'react-icons/ai';

export const DropDown = () => {
  //styles
  const { classes } = useStyles();

  //navigate
  const navigate = useNavigate();

  //state
  const [open, setOpen] = useState<boolean>(false);

  //redux state
  const user = useSelector((redux_state: ReduxState) => redux_state.user);

  const toggleDropDown = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <button className={classes.dropdown_btn} onClick={toggleDropDown}>
        <MenuIcon className={classes.icon} />
        <AccountCircleIcon className={classes.icon} />
      </button>

      <div className={`${classes.dropdown_menu} ${open ? 'active' : 'inactive'}`} >
        <ul>
          <li className={classes.dropdown_item} onClick={() => navigate('/')}>
            <AiOutlineHome className={classes.dropdown_item_icon} />
            <h3>Home</h3>
          </li>
          {
            user.token
              ?
              //things that connected users see
              <ConnectedUserDD toggleDropDown={toggleDropDown} />
              :
              //things that unconnected users see
              <DisconnectedUserDD />
          }
        </ul>
      </div>
    </>
  )
}