import React from 'react';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { MenuWrapper } from './menu.styles';
import { Image } from '../../common/styles';

export const MenuComponent = () => {
  return (
    <MenuWrapper>
      <div>
        <Image
          src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
          alt='Your browser not support this picture'
        />
      </div>
      <div className='icons'>
        <AddCircleOutlineIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
        <MessageOutlinedIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
        <SettingsOutlinedIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
      </div>
      <div>
        <LogoutOutlinedIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
      </div>
    </MenuWrapper>
  );
};
