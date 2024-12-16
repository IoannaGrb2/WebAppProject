// Select the toggle button and the nav menu
const toggleButton = document.querySelector('.toggle-menu');
const navLinks = document.querySelector('.nav-links');

// Toggle the menu visibility on button click
toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

        // JavaScript to toggle favorite state
        const favoriteIcon = document.getElementById("changeFavicon");
        const itemId = "exampleFavoriteItem"; // Unique ID for this item
    
        // Check and set the initial state from localStorage
        let isFavorite = localStorage.getItem(itemId) === "true";
    
        // Update the icon based on the favorite state
        function updateIcon() {
          if (isFavorite) {
            favoriteIcon.src = "../images/redfav.png"; // Favorite state
          } else {
            favoriteIcon.src = "../images/favorite.png"; // Non-favorite state
          }
        }
    
        // Toggle favorite state
        function changeFavicon() {
          isFavorite = !isFavorite;
          localStorage.setItem(itemId, isFavorite); // Save state to localStorage
          updateIcon(); // Update the icon
        }
    
        // Initialize the icon on page load
        updateIcon();

    // Function to handle the submission of a comment
    document.getElementById('submitComment').addEventListener('click', function () {
        // Get the value from the textarea
        const commentText = document.getElementById('commentInput').value;

        // Ensure the comment is not empty
        if (commentText.trim() === '') {
            alert('Please write something before submitting!');
            return;
        }

        // Create a new comment element
        const commentPost = document.createElement('div');
        commentPost.classList.add('comment-post');

        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        const userMetaDiv = document.createElement('div');
        userMetaDiv.classList.add('user-meta');

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.textContent = 'Ioanna'; // Replace with the logged-in user's name if applicable

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = 'Just now';

        userMetaDiv.appendChild(nameDiv);
        userMetaDiv.appendChild(dayDiv);

        userDiv.appendChild(userMetaDiv);

        const commentContent = document.createTextNode(commentText);

        // Append the user info and comment content to the new comment element
        commentPost.appendChild(userDiv);
        commentPost.appendChild(commentContent);

        // Append the new comment to the list
        document.querySelector('.list').appendChild(commentPost);

        // Clear the textarea
        document.getElementById('commentInput').value = '';

        // Optionally save to server
        fetch('/save-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: commentText })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Comment saved:', data);
            // Optionally re-render comments from the response
        })
        .catch(error => console.error('Error:', error));
    });