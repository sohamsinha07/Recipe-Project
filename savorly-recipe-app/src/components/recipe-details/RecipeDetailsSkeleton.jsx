import React from 'react'
import { Skeleton } from '@mui/material';

const RecipeDetailsSkeleton = () => {
	return (
		<div className="details-page">
			<div className="header">
				<Skeleton variant="text" animation="wave" width={200} height={40} />
				<Skeleton variant="rectangular" animation="wave" width={120} height={40} />
				<Skeleton variant="rectangular" animation="wave" width={120} height={40} />
			</div>

			<div className="recipe-content">
				<div className="recipe-img-container">
					<Skeleton variant="rectangular" animation="wave" width="100%" height={300} sx={{ borderRadius: 2 }} />
				</div>

				<Skeleton variant="text" animation="wave" width="60%" height={40} />
				<Skeleton variant="text" animation="wave" width="80%" height={24} />
				<Skeleton variant="text" animation="wave" width="40%" height={24} />

				<div className="recipe-meta">
					<Skeleton variant="text" animation="wave" width={100} height={24} />
					<Skeleton variant="text" animation="wave" width={100} height={24} />
					<Skeleton variant="text" animation="wave" width={100} height={24} />
				</div>

				<div className="recipe-steps">
					<div className="ingredients-instructions">
						<Skeleton variant="text" animation="wave" width="30%" height={32} />
						{[...Array(5)].map((_, idx) => (
							<Skeleton key={idx} variant="text" animation="wave" width="80%" height={24} />
						))}

						<Skeleton variant="text" animation="wave" width="30%" height={32} sx={{ mt: 4 }} />
						{[...Array(4)].map((_, idx) => (
							<Skeleton key={idx} variant="rectangular" animation="wave" width="100%" height={50} sx={{ mb: 2 }} />
						))}
					</div>

					<div className="details-right-side">
						<Skeleton variant="rectangular" animation="wave" width="100%" height={400} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RecipeDetailsSkeleton