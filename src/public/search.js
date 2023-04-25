const searchForm = document.querySelector('#search-form');
const userIdInput = document.querySelector('#user-id-input');

function searchUser(userId) {
  fetch(`/users/${userId}`)
    .then(response => response.json())
    .then(userData => {
      // Update the dashboard with the search results
      const dashboard = document.querySelector('#dashboard');
      dashboard.innerHTML = `
        <h2>User Information</h2>
        <ul>
          <li>User ID: ${userData.id}</li>
          <li>Name: ${userData.name}</li>
          <li>Email: ${userData.email}</li>
        </ul>
      `;
    })
    .catch(error => {
      console.error('Search error:', error);
    });
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const userId = userIdInput.value;
  searchUser(userId);
});