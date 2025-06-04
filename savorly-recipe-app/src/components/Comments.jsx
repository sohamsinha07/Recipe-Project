import React, { useEffect, useState } from "react"
import { collection, addDoc, query, orderBy, onSnapshot, doc, Timestamp, deleteDoc, updateDoc, getDocs, where, getDoc } from 'firebase/firestore'
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { FaReply, FaTrash, FaEdit, FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/Comments.css'


const Comments = ({ recipeId, currentUserId }) => {

	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState([]);
	const [newReplies, setNewReplies] = useState({});
	const [showReplyForm, setShowReplyForm] = useState({});
	const [userCache, setUserCache] = useState({});
	const [loading, setLoading] = useState(true);

	// fetch comments
	useEffect(() => {
		if (!recipeId) return;

		const commentsRef = collection(db, 'comments');
		const q = query(
			commentsRef,
			orderBy('createdAt', 'desc')
		)

		// data from firebase
		const unsubscribe = onSnapshot(q, async (snapshot) => {
			const commentsData = [];

			for (const docSnapshot of snapshot.docs) {

				const commentData = { id: docSnapshot.id, ...docSnapshot.data() };

				// filter for a specific recipe, given its id
				if (commentData.recipeId === recipeId) {

					// saving comment's username
					commentData.username = await getUserName(commentData.userId);
					console.log('username:', commentData.username);

					// fetch comment replies
					const repliesQuery = query(
						collection(db, 'replies'),
						where('commentId', '==', docSnapshot.id),
						orderBy('createdAt', 'asc')
					);

					const repliesSnapshot = await getDocs(repliesQuery);

					const replies = await Promise.all(
						repliesSnapshot.docs.map(async (replyDoc) => {
							const replyData = { id: replyDoc.id, ...replyDoc.data() };
							replyData.username = await getUserName(replyData.userId);
							return replyData;
						})
					);

					commentData.replies = replies;
					commentsData.push(commentData);
				}
			}

			setComments(commentsData);
			setLoading(false);
		})
		return () => unsubscribe();
	}, [recipeId]);

	// Adding a new comment
	const handleAddComment = async (e) => {
		e.preventDefault();

		if (!newComment.trim() || !currentUserId) return;

		try {
			await addDoc(collection(db, 'comments'), {
				content: newComment.trim(),
				createdAt: Timestamp.now(),
				recipeId: recipeId,
				userId: currentUserId,
				likes: 0,
				likedBy: []
			});
			setNewComment('')
		} catch (error) {
			console.error('Error adding comment:', error);
			toast.error('Failed to add comment');
		}
	};

	// add a reply to a comment
	const handleAddReply = async (commentId) => {
		const newReply = newReplies[commentId];
		if (!newReply?.trim() || !currentUserId) return;

		try {

			await addDoc(collection(db, 'replies'), {
				content: newReply.trim(),
				createdAt: Timestamp.now(),
				userId: currentUserId,
				commentId,
				likes: 0,
				likedBy: []
			});
			setNewReplies(prev => ({ ...prev, [commentId]: '' }));
			setShowReplyForm(prev => ({ ...prev, [commentId]: false }));
		} catch (error) {
			console.error('Error adding reply:', error);
			toast.error('Failed to reply to comment');
		}
	}

	// delete comment
	const handleDeleteComment = async (commentId) => {
		if (!currentUserId) return;

		if (window.confirm('Are you sure you want to delete this comment?')) {
			try {
				await deleteDoc(doc(db, 'comments', commentId));
				toast.success('Comment deleted successfully!');
			} catch (error) {
				console.error('Error deleting comment:', error);
				toast.error('Failed to delete comment');
			}
		}
	};

	// delete reply
	const handleDeleteReply = async (commentId, replyId) => {
		if (!currentUserId) return;

		if (window.confirm('Are you sure you want to delete this reply?')) {
			try {
				await deleteDoc(doc(db, 'replies', replyId));
				toast.success('Reply deleted successfully!');
			} catch (error) {
				console.error('Error deleting reply:', error);
				toast.error('Failed to delete reply');
			}
		}
	};

	// Handling likes on comments
	const handleLikeComment = async (commentId, currentLikes, likedBy = []) => {
		if (!currentUserId) return;

		try {
			// see if current user has already liked this comment
			const hasLiked = likedBy.includes(currentUserId);
			// if they haven't, add them to liked array
			const newLikedBy = hasLiked ? likedBy.filter(id => id !== currentUserId) : [...likedBy, currentUserId];

			await updateDoc(doc(db, 'comments', commentId), {
				likes: hasLiked ? currentLikes - 1 : currentLikes + 1,
				likedBy: newLikedBy
			});
		} catch (error) {
			console.error('Error updating like:', error);
		}
	};

	// time formatting for comments
	const formatDate = (timestamp) => {
		if (!timestamp) return '';
		const date = timestamp.toDate();
		return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// get user's name from the user database
	// store in user cache if not there already
	const getUserName = async (userId) => {
		if (!userId) return 'Anonymous';
		if (userCache[userId]) return userCache[userId];

		// if not in cache, fetch from firebase:
		try {
			const userRef = doc(db, 'users', userId);
			const userDocSnap = await getDoc(userRef);

			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				const userName = userData.username || 'Anonymous';

				// Update cache
				setUserCache(prev => ({ ...prev, [userId]: userName }));
				return userName;
			}
			return 'Anonymous';
		} catch (error) {
			console.error('Error fetching user name:', error)
			return 'Anonymous';
		}
	}

	if (loading) {
		return <div className="comments-loading">Loading comments...</div>
	}

	return (
		<div className="comments-section">

			<h2>Comments ({comments.length})</h2>

			{currentUserId ? (
				<form onSubmit={handleAddComment} className='add-comment-form'>
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder='Share a comment about the recipe!'
						rows='3'
						maxLength='300'
					/>
					<div className='comment-form-footer'>
						<span className='char-count'>
							{newComment.length}/300
						</span>
						<button type="submit">
							Post
						</button>
					</div>
				</form>
			) : (
				<div className="login-prompt"><p>Login to leave a comment.</p></div>
			)}

			<div className="comments-list">
				{comments.length === 0 ? (
					<div className="no-comments">
						<p>No comments yet. Be the first to share!</p>
					</div>
				) : (
					comments.map((comment) => (
						<div key={comment.id} className="comment-item">
							<div className="comment-header">
								<div className="comment-user">
									<div className="user-avatar">
										{comment.userId ? comment.userId.charAt(0).toUpperCase() : '?'}
									</div>
									<div className="user-info">
										<span className="username">{comment.username || 'Anonymous'}</span>
										<span className="comment-date">{formatDate(comment.createdAt)}</span>
									</div>
								</div>

								{currentUserId === comment.userId && (
									<div className="comment-actions">
										<button
											onClick={() => handleDeleteComment(comment.id)}
											className="action-btn delete-btn"
										>
											<FaTrash />
										</button>
									</div>
								)}
							</div>
							<div className="comment-content">
								<p>{comment.content}</p>
							</div>
							<div className="comment-footer">
								<button
									onClick={() => handleLikeComment(
										comment.id,
										comment.likes || 0,
										comment.likedBy || []
									)}
									className={`like-btn ${comment.likedBy?.includes(currentUserId) ? 'liked' : ''}`}
								>
									{comment.likedBy?.includes(currentUserId) ? <FaHeart /> : <FaRegHeart />}
									<span>{comment.likes || 0}</span>
								</button>
								{currentUserId && (
									<button
										onClick={() => setShowReplyForm(prev => ({
											...prev,
											[comment.id]: !prev[comment.id]
										}))}
										className="reply-btn"
									>
										<FaReply /> Reply
									</button>
								)}
							</div>
							{/* Reply Form */}
							{showReplyForm[comment.id] && (
								<div className="reply-form">
									<textarea
										value={newReplies[comment.id] || ''}
										onChange={(e) => setNewReplies(prev => ({
											...prev,
											[comment.id]: e.target.value
										}))}
										placeholder="Write a reply..."
										rows="2"
										maxLength="300"
									/>
									<div className="reply-actions">
										<button
											onClick={() => handleAddReply(comment.id)}
											disabled={!newReplies[comment.id]?.trim()}
										>
											Reply
										</button>
										<button
											onClick={() => setShowReplyForm(prev => ({
												...prev,
												[comment.id]: false
											}))}
											className="cancel-btn"
										>
											Cancel
										</button>
									</div>
								</div>
							)}

							{/* Replies */}
							{comment.replies && comment.replies.length > 0 && (
								<div className="replies-section">
									{comment.replies.map((reply) => (
										<div key={reply.id} className="reply-item">
											<div className="reply-header">
												<div className="reply-user">
													<div className="user-avatar small">
														{reply.userId ? reply.userId.charAt(0).toUpperCase() : '?'}
													</div>
													<div className="user-info">
														<span className="username">{reply.username || 'Anonymous'}</span>
														<span className="reply-date">{formatDate(reply.createdAt)}</span>
													</div>
												</div>

												{currentUserId === reply.userId && (
													<button
														onClick={() => handleDeleteReply(comment.id, reply.id)}
														className="action-btn delete-btn"
													>
														<FaTrash />
													</button>
												)}
											</div>
											<div className="reply-content">
												<p>{reply.content}</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Comments;