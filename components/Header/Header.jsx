import React from "react";
import Header from "./Header/Header.css";
import Netflix from "../../assets/images/netflix1.jpg"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function Header = () => {
  return (
    <div className="header_outer_container">
      <div className="header_container">
        <div className="header_left">
          <ul>
            { <li><img src={NetflixLogo} alt="Netflix Logo" width="100" /></li> /}
            <li>Netflix</li>
            <li>Home</li>
            <li>TVShow</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>MyList</li>
            <li>Browser by Language</li>
          </ul>
        </div>
        <div className="header_right">
          <ul>
            <li>
            <SearchIcon />
          </li>
          <li>
            <NotificationNoneIcon />
          </li>
          <li>
            <AccountBoxIcon />
          </li>
          <li>
            <ArrowDropDownIcon />
          </li> 
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
