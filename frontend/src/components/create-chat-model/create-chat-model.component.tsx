import React, { FC, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';

import { CustomInput, CustomButton } from '../../common/styles';
import { ChipBlock } from './create-chat-model.styles';

const style = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0d0d0d',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
};

interface IProps {
  open: boolean;
  handleClose: () => void;
  usernames: IChip[];
  setUsernames: (value: IChip[] | ((prevVar: IChip[]) => IChip[])) => void;
  username: string;
  setUsername: (value: string | ((prevVar: string) => string)) => void;
  submit: (data: any) => Promise<void>;
  title: string;
  setTitle: (value: string | ((prevVar: string) => string)) => void;
}

interface IChip {
  id: number;
  text: string;
}

export const CreateChatModel: FC<IProps> = ({
  open,
  handleClose,
  usernames,
  setUsernames,
  username,
  setUsername,
  title,
  setTitle,
  submit
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && username.trim()) {
      setUsernames((usernames) => [
        ...usernames,
        { id: Date.now(), text: username.trim() }
      ]);
      setUsername('');
    }
  };

  const handleRemoveChip = (id: number) => {
    const index = usernames.map((item) => item.id).indexOf(id);

    setUsernames((state) => [
      ...state.slice(0, index),
      ...state.slice(index + 1)
    ]);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h4>Chat Create</h4>
          <CustomInput
            placeholder={'Chat Name'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <CustomInput
              placeholder={'Username'}
              onKeyDown={handleKeyDown}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <CustomButton onClick={submit}>Create</CustomButton>
          <ChipBlock>
            {usernames.map((item) => (
              <Chip
                label={item.text}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
                color='info'
                onDelete={() => handleRemoveChip(item.id)}
                key={item.id}
              />
            ))}
          </ChipBlock>
        </Box>
      </Modal>
    </div>
  );
};
