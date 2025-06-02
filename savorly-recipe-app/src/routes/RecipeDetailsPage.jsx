import React from 'react'
import ChatPage from '../components/ChatPage'
import { FaArrowLeft } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FaClock } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi";
import '../styles/RecipeDetailsPage.css'

const RecipeDetailsPage = () => {
	return (
		<div className='details-page'>
			<div className='header'>
				<button><FaArrowLeft /> Back to Recipes</button>
				<div className='header-right'>
					<button><FaRegHeart /> Save Recipe</button>
					<button><FiShare2 /> Share</button>
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