import React, { useState } from 'react';
import InputBox from './InputBox'
import ResponseDisplay from './ResponseDisplay';
import { LuSend } from "react-icons/lu";
import '../../styles/ChatPage.css'
import { RiRobot2Line } from "react-icons/ri";

export const ChatPage = () => {

	const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'; 

	const [messages, setMessages] = useState([]); // holds message history
	const [inputValue, setInputValue] = useState(''); // controlled input
	const [loading, setLoading] = useState(false);

	const handleSend = async (event) => {

		event.preventDefault();
		const trimmedInput = inputValue.trim();
		if (!trimmedInput) return;

		// add user's message
		const newUserMessage = { role: 'user', content: trimmedInput }
		const updatedMessages = [...messages, newUserMessage];
		setMessages(updatedMessages);
		setInputValue('');
		setLoading(true);

		try {
			const response = await fetch(`${baseURL}/chat/send-message`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ model: "gpt-3.5-turbo", messages: updatedMessages }),
			});

			if (!response.ok) {
				const errText = await response.text();
				throw new Error(`Server error: ${response.status} - ${errText}`)
			}

			const data = await response.json();
			console.log('Raw API response:', data);

			const botMessage = data;
			setMessages(prev => [...prev, botMessage]);

		} catch (error) {
			console.error("Fetch failed:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className='chatbot-container'>
			<div className='chatbot-title'>
				<RiRobot2Line className='robot-icon' />
				<h2>Recipe Bot</h2>
			</div>

			<ResponseDisplay messages={messages} />
			{loading && <div>Loading...</div>}

			<div className='input-container'>
				<form onSubmit={handleSend}>
					<InputBox
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						disabled={loading}
					/>
					<button className='submit-btn' type='submit' disabled={loading}><LuSend size={30} /></button>
				</form>
			</div>

		</div>
	);
};

export default ChatPage;
