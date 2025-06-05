import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatPage from '../components/chatbot/ChatPage'
import { FaArrowLeft } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FaClock } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi";
import { FaHeart } from 'react-icons/fa';
import { HiUser } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import '../styles/RecipeDetailsPage.css'
import { db } from '../firebase';
import { doc, getDoc, setDoc, deleteDoc, collection, addDoc, arrayRemove, updateDoc, arrayUnion } from 'firebase/firestore';
import Comments from '../components/recipe-details/Comments';
import { Link, NavLink, useLocation } from "react-router-dom";
import { Rating } from '@mui/material';
import { AuthContext } from '../AuthContext';
import RecipeDetailsSkeleton from '../components/recipe-details/RecipeDetailsSkeleton';

const RecipeDetailsPage = () => {

	const location = useLocation();
	const { type, id } = useParams(); // type = edamam or user, id = recipe id
	const navigate = useNavigate()
	const [recipe, setRecipe] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [copySuccess, setCopySuccess] = useState("");
	const textAreaRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [averageRating, setAverageRating] = useState(0);
	const { user } = useContext(AuthContext);

	const notifyCopy = () => toast.success('Recipe link copied to clipboard', {
		autoClose: 2000,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
	});

	// async function copyToClip() {
	// 	const url = location.href;
	// 	await navigator.clipboard.writeText(url);
	// 	setCopySuccess("Copied");
	// 	notifyCopy();
	// }
	async function copyToClip() {

		const el = document.createElement('input');
		el.value = window.location.href;
		document.body.appendChild(el);
		el.select(); document.execCommand('copy');
		document.body.removeChild(el);

		setCopySuccess(true);
		notifyCopy();
	}

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				setLoading(true);

				// if the recipe is from edamam, fetch via API (backend)
				if (type === 'edamam') {
					const response = await fetch(`/recipe-details?id=${encodeURIComponent(id)}`);
					if (!response.ok) {
						throw new Error('Failed to fetch recipe');
					}
					const data = await response.json();
					setRecipe(data.hits[0]?.recipe || data.recipe);

					// if it's user generated, fetch from firebase
				} else if (type === 'user') {

					const docRef = doc(db, 'recipes', id);
					const docSnap = await getDoc(docRef);

					if (docSnap.exists()) {
						setRecipe(docSnap.data());

						const data = docSnap.data();
						setRecipe(data);
						if (data.averageRating) {
							setAverageRating(data.averageRating);
						}
					} else {
						throw new Error('Recipe not found');
					}
				}
			} catch (error) {
				console.error('Error loading recipe:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (type && id) {
			fetchRecipe();
		}
	}, [type, id]);

	// check if the recipe is saved for this user
	useEffect(() => {
		const checkIfSaved = async () => {
			if (user?.uid && id) {
				const userRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(userRef);
				if (docSnap.exists()) {
					const userData = docSnap.data();
					setIsSaved(userData.savedRecipes?.includes(id));
				}
			}
		}
		checkIfSaved();
	}, [user, id])

	const handleSaveRecipe = async () => {
		if (!user) {
			toast.info('Please login to save recipes');
			return;
		}
		try {
			const userRef = doc(db, 'users', user.uid);

			if (isSaved) {
				await updateDoc(userRef, {
					savedRecipes: arrayRemove(id),
				});
				toast.success('Recipe removed from saved');
			} else {
				await updateDoc(userRef, {
						savedRecipes: arrayUnion(id),
					});
				toast.success('Recipe saved!');
			}
			setIsSaved(!isSaved);
		} catch (error) {
			console.error('Error saving recipe:', error);
		}

	}

	if (!recipe) {
		return (
			<div className="details-page">
				<div className="error">Recipe not found</div>
			</div>
		);
	}

	if (loading) {
		return (
			<RecipeDetailsSkeleton />
		)
	}

	return (

		<div className='details-page'>
			<div className='header'>
				<Link to="/recipe">
					<button><FaArrowLeft /> Back to Recipes</button>
				</Link>
				<div className='header-right'>
					<button onClick={handleSaveRecipe}>
						{isSaved ? <FaHeart /> : <FaRegHeart />}
						{isSaved ? 'Unsave Recipe' : 'Save Recipe'}
					</button>
					<div>
						<button
							onClick={function (event) {
								copyToClip()
							}}
						><FiShare2 /> Share
						</button>
						<ToastContainer />
					</div>
				</div>

			</div>
			<div className='recipe-content'>
				<div className='recipe-img-container'>
					{recipe.image && (
						<img
							className='recipe-img'
							src={recipe.image}
							alt={recipe.title}
						>
						</img>
					)}
				</div>

				<h1 className='recipe-title'>{recipe.title}</h1>
				<div className='recipe-author-desc'>

				</div>
				{recipe.description && (
					<p className='recipe-description'>{recipe.description}</p>
				)}
				<div className='recipe-meta'>
					<span className='rating'>
						<Rating
							name="read-only"
							value={averageRating}
							readOnly
							precision={0.5}
						/>
					</span>
					{recipe.author && (
						<div className='meta-item'>
							<HiUser />
							<span>By: {recipe.author}</span>
						</div>
					)}
					{recipe.totalTime && (
						<div className='meta-item'>
							<FaClock />
							<span>{recipe.totalTime} min</span>
						</div>
					)}
					{recipe.servings && (
						<div className='meta-item'>
							<HiUsers />
							<span>{recipe.servings} servings</span>
						</div>
					)}
				</div>

				<div className='recipe-steps'>
					{/* left side */}
					<div className='ingredients-instructions'>

						<div className='ingredients-section'>
							<h2>Ingredients</h2>
							<ul className='ingredients-list'>
								{(recipe.ingredients || []).map((ingredient, index) => (
									<li key={index}>
										<input type="checkbox" id={`ingredient-${index}`} />
										<label htmlFor={`ingredient-${index}`}>{ingredient}</label>
									</li>
								))}
							</ul>
						</div>
						<div className='instructions-section'>
							<h2>Instructions</h2>
							{recipe.instructions && recipe.instructions.length > 0 ? (
								<ol className='instructions-list'>
									{(Array.isArray(recipe.instructions) ? recipe.instructions : recipe.instructions.split('\n'))
										.filter(step => step.trim())
										.map((step, index) => (
											<li key={index}>
												<span className='step-number'>{index + 1}</span>
												<span>{step}</span>
											</li>
										))}
								</ol>
							) : (
								<div className='no-instructions'>
									<p>Detailed instructions not available.</p>
									{recipe.url && (
										<a href={recipe.url} target="_blank" rel="noopener noreferrer">
											View full recipe at source
										</a>
									)}
								</div>
							)}
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
				<Comments
					recipeId={id}
					// currentUserId={'bmEllYa1L8YLdeKOxE8r'}
					currentUserId={user?.uid || null}
				/>
			</div>
		</div>
	)
}

export default RecipeDetailsPage