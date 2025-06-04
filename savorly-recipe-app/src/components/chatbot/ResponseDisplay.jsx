import React from 'react';
import '../../styles/ResponseDisplay.css';

const ResponseDisplay = ({ messages }) => {
	return (
		<div className="response-display">
			{messages.map((msg, index) => {
				const isUser = msg.role === 'user';
				const className = isUser ? 'user-message' : 'bot-message';

				return (
					<div
						key={index}
						className={msg.role === 'user' ? 'user-message' : 'bot-message'}
					>
						<strong>{msg.role === 'user' ? 'You:' : 'Bot:'}</strong> {msg.content}
					</div>

				);
			})}
		</div>
	);
};

export default ResponseDisplay;
