import React from 'react';
import Rycard from './../index';

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
 
// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios, { delayResponse: 2000 });
 
// Mock any GET request to /users
mock
  .onPost("/status/success").reply(200, {
    status: true,
    meta: {
      msg: "Success"
    }
  })
  .onPost("/status/error").reply(200, {
    status: false,
    meta: {
      msg: "Error. Something has done bad :(."
    }
  })
  .onPost("/response/500").reply(500)
  .onPost("/response/400").reply(400);

export default {
  title: 'Ry/Card',
  component: Rycard,
  parameters: {
    myAddon: {
      data: 'this data is passed to the addon',
    },
  },
  argTypes: {
    endpoint: { 
      description: 'Url where the card will send the request POST',
      table: {
        type: { summary: 'string' }
      },
      type: {
        required: true,
      },
      control: { type: 'select', options: ['/status/success', 
        '/status/error', 
        'response/500', 
        'response/400'],},
    },
    size: { 
      description: 'Size of the spinner.',
      table: {
        type: { summary: 'string' }
      },
      type: {
        required: false,
      },
      control: { type: 'select', options: ['small', 
        'big', 
        'huge'],},
    },
    email: {
      description: 'Email that will be part of the form request.',
      type: {
        required: true,
      },
      table: {
        type: { summary: 'string' }
      },
    },
    price: {
      description: 'The amount that will be charge by the backend.',
      type: {
        required: true,
      },
      table: {
        type: { summary: 'number' }
      },
    },
    onResponse: {
      description: 'Callback when the server response successful, the component return just the data.',
      type: {
        required: false,
      },
      table: {
        type: { summary: 'function' }
      },
    },
    onNativeResponse: {
      description: 'Callback when the server response successful, the component return all the response.',
      type: {
        required: false,
      },
      table: {
        type: { summary: 'function' }
      },
    },
    onError: {
      description: 'Callback when the server return error.',
      type: {
        required: false,
      },
      table: {
        type: { summary: 'function' }
      },
    }
  },
};

const Template = (args) => <Rycard {...args} />;

export const Default = Template.bind({});
Default.args = {
};