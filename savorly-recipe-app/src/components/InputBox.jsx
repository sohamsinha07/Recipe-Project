import React, { useState } from 'react';
import '../styles/InputBox.css';

const InputBox = ({ value, onChange, disabled }) => {

	return (
		<div className='input-container'>
			<input
				className="user-input"
				type="text"
				value={value}
				onChange={onChange}
				placeholder="Type your query here"
				disabled={disabled}
			/>
		</div>
	);
};

export default InputBox