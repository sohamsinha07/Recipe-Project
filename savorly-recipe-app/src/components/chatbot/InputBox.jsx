import React, { useState } from 'react';
import '../../styles/InputBox.css';

const InputBox = ({ value, onChange, disabled }) => {

	return (
			<input
				className="user-input"
				type="text"
				value={value}
				onChange={onChange}
				placeholder="Type your query here..."
				disabled={disabled}
			/>
	);
};

export default InputBox