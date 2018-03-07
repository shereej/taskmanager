import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

const Header = () => (
  <AppBar
    title="Task Creator"
    iconElementLeft={<IconButton><Menu /></IconButton>}    
  />
);

export default Header;