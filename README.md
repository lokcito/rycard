# rycard

> Is a react component that implements an input card form to receipt the Number cards, Dates expired and CVV code. 
To help to the user the form shows some errors when the card is incomplete or when the date expired is not in range of valid dates.

[![NPM](https://img.shields.io/npm/v/rycard.svg)](https://www.npmjs.com/package/rycard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save rycard
```

## Usage

```jsx
import React, { Component } from 'react'

import Rycard from 'rycard'
import 'rycard/dist/index.css'

class Example extends Component {
  constructor(props){
    this.state = {
      'endpoint': '/my-route-where-i-charge',
      'email': 'someone@somedomain.com',
      'price': 100.00
    };
  }
  render() {
    return <Rycard endpoint={this.state.endpoint} 
      email={this.state.email} 
      price={this.state.price} />
  }
}
```
### Params
| Name | Description | Type | 
| ------ | ------ | ------ |
| endpoint |Url where the card will send the request POST | String
| email | Email that will be part of the form request. | String
| price |The amount that will be charge by the backend.| Number

## Bootstrap
To get stylized this form you must include bootstrap in your html headers
 [![Example](https://i.imgur.com/6xq0ANg.png)](http://games.rayrojas.info/card/?path=/docs/ry-card--default)
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
```

## Storybook

[http://games.rayrojas.info/card](http://games.rayrojas.info/card)

## License

MIT © [lokcito](https://github.com/lokcito)


## References: 
 - https://www.npmjs.com/package/create-react-library
 - https://github.com/Groftware/template-reactnpm
 - https://github.com/zxol/react-component-publish
 - https://stackoverflow.com/questions/48395804/where-is-create-react-app-webpack-config-and-files
 - https://www.npmjs.com/package/react-button-component