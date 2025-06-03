import React, { useState, useRef } from 'react'
import ChatPage from '../components/ChatPage'
import { FaArrowLeft } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FaClock } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
import '../styles/RecipeDetailsPage.css'

const RecipeDetailsPage = () => {

	const [copySuccess, setCopySuccess] = useState("");
	const textAreaRef = useRef(null);
	const notifyCopy = () => toast.success('Recipe link copied to clipboard', {
		autoClose: 2000,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
	});

	async function copyToClip() {
		await navigator.clipboard.writeText(location.href);
		setCopySuccess("Copied");
	}

	return (
		<div className='details-page'>
			<div className='header'>
				<button><FaArrowLeft /> Back to Recipes</button>
				<div className='header-right'>
					<button><FaRegHeart /> Save Recipe</button>
					<div>
						<button
							onClick={function(event) {
								copyToClip()
								notifyCopy()
							}}
						><FiShare2 /> Share
						</button>
						<ToastContainer />
					</div>
				</div>

			</div>
			<div className='recipe-content'>
				<div className='recipe-img-container'>
					<img className='recipe-img'></img>
				</div>

				<h1 className='recipe-title'>Title</h1>
				<p className='recipe-description'>Description</p>

				<div className='recipe-meta'>
					<span className='rating'>⭐⭐⭐⭐⭐</span>
					<div className='meta-item'>
						<FaClock />
						<span>x min</span>
					</div>
					<div className='meta-item'>
						<HiUsers />
						<span>x servings</span>
					</div>
				</div>

				<div className='recipe-steps'>
					{/* left side */}
					<div className='ingredients-instructions'>

						<div className='ingredients-section'>
							<h2>Ingredients</h2>
							<ul className='ingredients-list'>
								<li>
									<input type="checkbox" />
									<span>ingredient 1</span>
								</li>
							</ul>
						</div>
						<div className='instructions-section'>
							<h2>Instructions</h2>
							<ol className='instructions-list'>
								<li>
									<span className='step-number'>1</span>
									<span>Instruction 1</span>
								</li>
							</ol>
						</div>
					</div>
					<div className='details-right-side'>
						<ChatPage />
						<div className='nutrition-facts'></div>
						{/* nutrition facts */}
					</div>
				</div>

			</div>
			<div className='comment-section'>
			</div>
		</div>
	)
}

export default RecipeDetailsPage