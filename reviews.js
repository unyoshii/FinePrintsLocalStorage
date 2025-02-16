// Function to load reviews from localStorage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    return reviews;
  }
  
  // Function to format date and time
  function formatDateTime(date) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(date).toLocaleString('en-US', options);
  }
  
  // Function to render reviews in the table with a delete button for each review
  function renderReviews() {
    const reviews = loadReviews();
    const tableBody = document.getElementById('reviewsTableBody');
    tableBody.innerHTML = ''; // Clear the table before rendering
  
    reviews.forEach((review, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${review.name}</td>
        <td>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</td>
        <td>${review.review}</td>
        <td>${formatDateTime(review.timestamp)}</td>
        <td><button class="admin-delete-btn" data-index="${index}">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  
    // Attach event listeners to each delete button
    document.querySelectorAll('.admin-delete-btn').forEach(button => {
      button.addEventListener('click', adminDeleteReview);
    });
  }
  
  // Function for admin to delete a review
  function adminDeleteReview(e) {
    const index = e.target.getAttribute('data-index');
    const reviews = loadReviews();
  
    // Remove the review at the specified index
    reviews.splice(index, 1);
    localStorage.setItem('reviews', JSON.stringify(reviews));
  
    // Re-render the reviews table to reflect the deletion
    renderReviews();
  }
  
  // Load and render reviews when the page loads
  document.addEventListener('DOMContentLoaded', renderReviews);
  