import React from 'react';

import Ryloading from './../Ryloading';

export default {
  title: 'Ry/Loading',
  component: Ryloading,
  parameters: {
    myAddon: {
      data: 'this data is passed to the addon',
    },
  },
  argTypes: {
    size: { 
      description: 'The size of your circle loader.',
      type: {
        required: true
      },
      table: {
        type: { summary: 'string' }
      },
      control: { type: 'select', options: ['small', 'big', 'huge'],},
    },
    status: {
      description: 'From the component that you were using it you shoud pass some these status.',
      type: {
        required: true
      },
      table: {
        type: { summary: 'string' }
      },
      control: { type: 'select', options: ['hold', 'running', 'done', 'error'],},
    },
    text: {
     description: 'Text that will display below the circle loader.', 
      type: {
        required: true
      },
      table: {
        type: { summary: 'string' }
      },
    }
  },
};

const Template = (args) => <Ryloading {...args} />;

export const Default = Template.bind({});
Default.args = {
    onRyLoadingReset: function() {
      //do something
    }
};