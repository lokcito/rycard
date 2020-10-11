import React, { Component } from 'react';
import styles from './styles.module.css'

class Rycircle extends Component {
	getClass(){
		var _str=styles['ulala-loading-check'] + " ";
		if(this.props.done){
			_str+=" " + styles['load-complete'] + " ";
		}
	if(this.props.size){
		_str+=" "+ styles[this.props.size]+" ";
	}
	if(this.props.error){
		_str+=" " + styles['red'] + " ";
	}
	return _str;
	}

	getSnapshotBeforeUpdate(prevProps) {
		return { notifyRequired: (prevProps.done !== this.props.done || 
			prevProps.error !== this.props.error) };
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot.notifyRequired) {
			this.updateAndNotify();
		}
	}
	updateAndNotify() {
		setTimeout(function(argument) {
			if ( this.props.done ) {
				this.props.onDoneChange(false);
			} if ( this.props.error ) {
				this.props.onErrorChange(false);
			} else {
	
			}
		}.bind(this), 1000);
	}
	
	showComponent() {
		return <div 
			className={this.getClass()} >
			<div className={styles['checkmark'] + " draw"}></div>
		</div>
	}
	
	render() {
		return(
			<div >
				{this.showComponent()}
			</div>
		)
	}	
}

class Ryloading extends Component {
	constructor(props){
		super(props);
		this.state = {
			'done': false,
			'error': false
		}
		this.reset = this.reset.bind(this);
	}

	getSnapshotBeforeUpdate(prevProps) {
		return { notifyRequired: prevProps.status !== this.props.status };
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot.notifyRequired) {
			this.updateAndNotify();
		}
	}
	updateAndNotify() {
		if ( this.props.status === 'done' ) {
			this.setState({
				'done': true,
				'error': false
			})
		} else if ( this.props.status === 'error' ) {
			this.setState({
				'error': true,
				'done': false
			})
		} else {

		}
	}
	
	getAlertClass() {
		if ( this.props.alert === 'done' ) {
			return 'alert-success';
		} else if ( this.props.alert === 'error' ) {
			return 'alert-danger';
		}
	}
	
	showAlert() {
		if (this.props.text) {
			if ( this.props.text.length > 0 ) {
				return <div className={"alert" + " " +  this.getAlertClass()} role="alert">
					{this.props.text}
				</div>
			}
		}
		return <div></div>
	}
	reset() {
		this.setState({
			'done': false,
			'error': false
		});
		this.props.onRyLoadingReset();
	}
	showComponent() {
		if ( this.props.status === 'running' || 
			this.props.status === 'done' || 
			this.props.status === 'error') {
			return <div className="mt-2" >
				<div className="text-center">
					<Rycircle done={this.state.done} error={this.state.error} 
						size={this.props.size} 
						onDoneChange={this.reset} 
						onErrorChange={this.reset}/>
				</div>
			</div>
		} else {
			return <div></div>
		}
	}
	
	
	render() {
		return(
			<div >
				{this.showComponent()}
				<div className="mt-2" >
					{this.showAlert()}
				</div>
			</div>
		)
	}
}


Ryloading.defaultProps = {
		text: undefined,
		size: 'small',
		status: 'hold',
		
}


export default Ryloading;
