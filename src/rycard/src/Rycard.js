import './App.css';

import React, { Component } from 'react';
import qs from 'qs';

import Ryloading from './Ryloading';
import payment from 'payment';
import axios from 'axios';

class Rycard extends Component {
  constructor(props){
	super(props);
		this.state = {
			card: {
				'card': {
					'valid': undefined
				},
				'cvv': {
					'valid': undefined,
				},
				'expiry': {
					'valid': undefined
				}
			},
			resp: {
				text: undefined,
			},
			loading: {
				'status': 'hold',
				'alert': 'hold'
			}
		}
	
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onRyLoadingReset = this.onRyLoadingReset.bind(this);
		
		this.handleCardNumberBlur = this.handleCardNumberBlur.bind(this);
		this.handleCardCVCCBlur = this.handleCardCVCCBlur.bind(this);
		this.handleCardExpiryBlur = this.handleCardExpiryBlur.bind(this);
		
		this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
		this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
		this.handleCardCVCChange = this.handleCardCVCChange.bind(this);
	
  }
  
  handleFormChange() {
  	this.setState({
  		...this.state.loading,
  		'loading': {
  			'alert': undefined
  		},
  		'resp': {
  			'text': undefined
  		}
  	});
  }
  
	handleCardNumberChange(e) {
		var value = e.target.value;
		this.setValuesOnCard('card', value);
		payment.formatCardNumber(e.target);
		this.handleFormChange();
	}
	handleCardExpiryChange(e) {
		var value = e.target.value;
		this.setValuesOnCard('expiry', value);
		payment.formatCardExpiry(e.target);
		this.handleFormChange();
	}
	handleCardCVCChange(e) {
		var value = e.target.value;
		this.setValuesOnCard('cvv', value);
		payment.formatCardCVC(e.target);
		this.handleFormChange();
	}

	handleCardExpiryBlur(e) {
		var value = e.target.value;
		var v = payment.fns.validateCardExpiry(value);

		this.setState({
			'card': {
				...this.state.card,
				'expiry': {
					...this.state.card.expiry,
					'valid': v
				}
			}
		}, function(){
	  	this.setValuesOnCard('expiry', value);		  
		});
	}

	handleCardCVCCBlur(e) {
		var value = e.target.value;
		var v = payment.fns.validateCardCVC(value);

		this.setState({
			'card': {
				...this.state.card,
				'cvv': {
					...this.state.card.cvv,
					'valid': v
				}
			}
		}, function(){
		  this.setValuesOnCard('cvv', value);
		});
	}
  
	handleCardNumberBlur(e) {
		var value = e.target.value;
		var v = payment.fns.validateCardNumber(value);
		this.setState({
			'card': {
				...this.state.card,
				'card': {
					...this.state.card.card,
					'valid': v
				}
			}
		}, function(){
		  this.setValuesOnCard('card', value);
		});
	}

	setValuesOnCard(field, value) {
		value = value.split(' ').join('');
		if ( field === 'expiry' ) {
			value = value.split('/');
			this.setState({
				'card': {
					...this.state.card,
					'expiry': {
						...this.state.card.expiry,
						'year': value[1],
						'month': value[0]
					}
				}
			});
		} else if ( field === 'card' ) {
			this.setState({
				'card': {
					...this.state.card,
					'card': {
						...this.state.card.card,
						'value': value
					}
				}
			});
		} else if ( field === 'cvv' ) {
			this.setState({
				'card': {
					...this.state.card,
					'cvv': {
						...this.state.card.cvv,
						'value': value
					}
				}
			});
		} else if ( field === 'email' ) {
			this.setState({
				'card': {
					...this.state.card,
					'email': {
						...this.state.card.email,
						'value': value
					}
				}
			});
		}
	}
  
  onRyLoadingReset() {
		this.setState({
		  loading: {
		  	...this.state.loading,
				'status': 'hold',
		  }
		});
  }
  animateLoading(status, t) {
		this.setState({
		  'loading': {
				'status': status,
				'alert': status
		  }
		});
		
		this.setState({
		  'resp': {
				'text': t
		  }
		});
  }
  
	getWarningClassOnFields(field) {
		if ( field === 'number' ) {
			if (this.state.card.card.valid === false) {
				return 'is-invalid';	
			}
		} else if ( field === 'expiry' ) {
			if (this.state.card.expiry.valid === false) {
				return 'is-invalid';	
			}
		} else if ( field === 'cvv' ) {
			if (this.state.card.cvv.valid === false) {
				return 'is-invalid';	
			}
		}
		return '';
	}

	getWarningOnFields(field) {
		if ( field === 'number' ) {
			if (this.state.card.card.valid === false) {
				return <div className="invalid-feedback">
				  Please enter a valid card number.
		  </div>;	
			}
		} else if ( field === 'expiry' ) {
			if (this.state.card.expiry.valid === false) {
				return <div className="invalid-feedback">
			Expiry invalid.
		  </div>;	
			}
		} else if ( field === 'cvv' ) {
			if (this.state.card.cvv.valid === false) {
				return <div className="invalid-feedback">
			CVV invalid.
		  </div>;	
			}
		}
	}	
  
  getIsSubmitIsOk() {
		return this.state.card.cvv.valid && 
		  this.state.card.expiry.valid && 
		  this.state.card.card.valid;
  }
  
  handleSubmit(event) {
		const endpoint = this.props.endpoint;
		if (endpoint === undefined) {
		  console.log("You must define an endpoint.")
		  event.preventDefault();
		  return;
		}
		const _this = this;
		
		this.animateLoading('running');
		
		const data = { 'email': this.props.email };
		const options = {
		  method: 'POST',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  data: qs.stringify(data),
		  url: endpoint
		};
		var t = undefined;
		axios(options)
		  .then(function (response) {
				const res = response.data;
				if (res['status']) {
					t = "Success";
					if (res && res['meta'] && res['meta']['msg']) {
						t = res['meta']['msg'];
					}
					_this.animateLoading('done', t);
				} else {
				  t = "Oops, something has gone bad. Please reload the browser and try again.";
				  if (res && res['meta'] && res['meta']['msg']) {
						t = res['meta']['msg'];
				  }
				  _this.animateLoading('error', t);
				}
		  })
		  .catch(function (error) {
				t = "Oops, something has gone bad. Please reload the browser and try again.";
				_this.animateLoading('error', t);
		  });      
		event.preventDefault();
  }

  render() {
	return (
	  <div className="rycard">
		<div className="card">
		  <div className="card-header">
			<div className="row">
			  <div className="col-12 col-sm-6">
				<span className="h5 mb-0">{this.props.email}</span>
			  </div>
			  <div className="col-12 col-sm-6 text-right">
				<span className="h5 text-success mb-0">$ {this.props.price}</span>
			  </div>
			</div>
		  </div>
		  <div className="card-body">
			<form onSubmit={this.handleSubmit}>
			  <div className="row">
				<div className="col-12">
				  <div className="form-group">
					<label htmlFor="cc-number" 
					  className="control-label">Number</label>
					<input id="cc-number" 
					  type="text" 
					  className={'form-control ' + this.getWarningClassOnFields('number')} 
					  onBlur={this.handleCardNumberBlur} 
					  onChange={this.handleCardNumberChange} />
					{this.getWarningOnFields('number')}
				  </div>
				</div>
			  </div>
			  <div className="row">
				<div className="col-12">
				  <label htmlFor="cc-exp" 
					className="control-label">Expiry</label>
				  <input id="cc-exp" 
						type="text" 
						className={'form-control ' + this.getWarningClassOnFields('expiry')} 
						onBlur={this.handleCardExpiryBlur} 
						onChange={this.handleCardExpiryChange} />
				  {this.getWarningOnFields('expiry')} 
				</div>
			  </div>
			  <div className="row">
				<div className="col-12">
				  <div className="form-group mt-3">
					<label htmlFor="cc-cvv" 
					  className="control-label">CVV</label>
					<input id="cc-cvv" 
					  type="text" 
					  className={'form-control ' + this.getWarningClassOnFields('cvv')} 
						onBlur={this.handleCardCVCCBlur} 
						onChange={this.handleCardCVCChange} />
					{this.getWarningOnFields('cvv')} 
				  </div>
				</div>
			  </div>
			  <div className="row">
				<div className="col-12">
				  <Ryloading text={this.state.resp.text} 
						status={this.state.loading.status} 
						alert={this.state.loading.alert}
						onRyLoadingReset={this.onRyLoadingReset} />
				  <div className="form-group mt-3 text-right">
					<button className="btn btn-primary" 
					  disabled={!this.getIsSubmitIsOk()} 
					  type="submit">Make Payment</button>
				  </div>
				</div>
			  </div>
			</form>
		  </div>
		</div>
	  </div>
	);
  }
}

Rycard.defaultProps = {
	email: "unknown@unknown.com",
	price: 0,
	endpoint: undefined
}

export default Rycard;
