import { useState } from 'react';

export default function ReviewForm({ adventureId, userId, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      adventureId,
      userId,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    // Save to localStorage
    const reviews = JSON.parse(localStorage.getItem('adventureReviews') || '[]');
    reviews.push(review);
    localStorage.setItem('adventureReviews', JSON.stringify(reviews));
    setSubmitted(true);
    if (onSubmit) onSubmit(review);
  };

  if (submitted) {
    return <div style={{ margin: '16px 0', color: 'green' }}>Thank you for your review!</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: '16px 0', border: '1px solid #eee', borderRadius: 8, padding: 16, maxWidth: 400 }}>
      <h3>Leave a Review</h3>
      <div style={{ marginBottom: 8 }}>
        <label>Rating: </label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Comment: </label>
        <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} style={{ width: '100%' }} required />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
} 