import React from 'react';

import { GameBoard } from './GameBoard';

export default {
  title: 'GameBoard',
  component: GameBoard,
};

const Template = (args) => <GameBoard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  level: {},
};
Basic.parameters = {
  ignoreConsoleErrors: true,
  tests: [
    [
      'test a test',
      () => {
        expect(1).toBe(1);
      },
    ],
  ],
};
