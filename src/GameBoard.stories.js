import React from 'react';

import { GameBoard } from './GameBoard';

export default {
  title: 'GameBoard',
  component: GameBoard,
};

const Template = (args) => <GameBoard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  level: {}
};
