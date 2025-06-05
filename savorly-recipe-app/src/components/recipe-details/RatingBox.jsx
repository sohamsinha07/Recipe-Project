import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import '../../styles/RatingBox.css';

const RatingBox = ({ recipeId }) => {
	const [userRating, setUserRating] = useState(0);
	const [averageRating, setAverageRating] = useState(0);
	const [hasRated, setHasRated] = useState(false);

	useEffect(() => {
		if (!recipeId) return;

		const fetchRating = async () => {
			const docRef = doc(db, 'recipes', recipeId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				setAverageRating(data.averageRating || 0);

				// show the average
				setUserRating(data.averageRating || 0);
			}
		}

		fetchRating();
	}, [recipeId]);

	const handleRatingChange = async (event, newValue) => {
		if (!newValue) return;

		setUserRating(newValue);
		const recipeRef = doc(db, 'recipes', recipeId);

		try {
			const snap = await getDoc(recipeRef);
			if (snap.exists()) {
				const data = snap.data();
				const currentRatings = Array.isArray(data.ratings) ? data.ratings : [];
				const newRatings = [...currentRatings, newValue];

				// get new average
				const newAvg = newRatings.reduce((sum, r) => sum + r, 0) / newRatings.length;
				const roundedAvg = parseFloat(newAvg.toFixed(2));

				await updateDoc(recipeRef, {
					ratings: newRatings,
					averageRating: roundedAvg,
				});

				setAverageRating(roundedAvg);
				setHasRated(true);
				toast.success("Thanks for your rating!");
			}
		} catch (error) {
			console.error("Error updating rating", error);
			toast.error("Rating failed due to error");
		}
	}

	if (!recipeId) return null 
		return (
			<div className='rating-container'>
				<h3>Rate this Recipe</h3>
				<Rating
					value={hasRated ? userRating : averageRating}
					precision={0.5}
					onChange={handleRatingChange}
				/>
				{averageRating > 0 && (
					<span>({averageRating.toFixed(1)} average)</span>
				)}
			</div>
		)

}

export default RatingBox;