// Mobile menu ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});


// Fetch data
async function fetchUser(username) {
  try {
    const user_url = `https://api.github.com/users/${username}`;
    const response = await fetch(user_url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Update HTML elements with fetched data
    document.getElementById('bio').textContent = data.bio;
    document.getElementById('account-name').textContent = data.name;
    document.getElementById('avatar').src = data.avatar_url;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Fetch repo ----------------------------------------------------------------------
async function fetchRepo(repoName, bannerPath) {
  const apiUrl = `https://api.github.com/repos/${repoName}`;
  const contentsUrl = `${apiUrl}/contents/${bannerPath}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      console.error('Error fetching repository data:', data.message);
      return;
    }

    const repoTemplate = document.getElementById('repo-template');
    const repoContainer = document.getElementById('repo-container');
    const repoClone = document.importNode(repoTemplate.content, true);

    // Ensure elements are selected correctly
    const titleDiv = repoClone.querySelector('.repo-title');
    const descriptionDiv = repoClone.querySelector('.repo-desc');
    const starCountDiv = repoClone.querySelector('.star-count');
    const imgElement = repoClone.querySelector('.repo-img');
    const repoLink = repoClone.querySelector('.repo-link');

    if (!descriptionDiv || !starCountDiv || !imgElement || !repoLink) {
      console.error('Error: One or more elements not found in the template');
      return;
    }

    // Set the description and star count
    titleDiv.textContent = data.name;
    descriptionDiv.textContent = data.description;
    starCountDiv.textContent = data.stargazers_count;
    repoLink.href = data.html_url;

    // Fetch banner image
    const bannerResponse = await fetch(contentsUrl);
    const bannerData = await bannerResponse.json();

    if (bannerResponse.ok) {
      const bannerImageUrl = bannerData.download_url;
      imgElement.src = bannerImageUrl;
    } else {
      console.error('Error fetching banner image:', bannerData.message);
    }

    // Append the cloned template to the container
    repoContainer.appendChild(repoClone);

  } catch (error) {
    console.error('Error fetching repository data:', error);
  }
}

// Define repositories and their banner paths
const repositories = [
  { repoName: 'zDyanTB/HyprNova', bannerPath: '.github/nova-banner.png' },
  { repoName: 'zDyanTB/ADHD-Floorp', bannerPath: '.github/banner.png' },
];

fetchUser("zDyanTB");
repositories.forEach(repo => fetchRepo(repo.repoName, repo.bannerPath));
