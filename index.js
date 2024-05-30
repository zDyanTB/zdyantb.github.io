// Make navbar transparent when scroll down
// document.addEventListener("DOMContentLoaded", () => {
//   const is_glass = Array.prototype.slice.call(document.querySelectorAll('.is-black'), 0);


//   // Function to handle navigation bar scroll behavior
//   const handleNavScroll = () => {

//     const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

//     is_glass.forEach(el => {
//       if (currentScrollPosition === 0) {
//         el.classList.remove('is-glass');
//       } else {
//         el.classList.add('is-glass');
//       }
//     });

//   };

//   // Throttle function to limit execution of a callback
//   const throttle = (callback, time) => {
//     let throttleTimer;
//     return () => {
//       if (throttleTimer) return;
//       throttleTimer = true;
//       setTimeout(() => {
//         callback();
//         throttleTimer = false;
//       }, time);
//     };
//   };

//   // Media query to check for reduced motion preference
//   const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

//   // Event listener for scroll events
//   window.addEventListener("scroll", () => {
//     if (!mediaQuery.matches) {
//       throttle(handleNavScroll, 250)();
//     }
//   });
// });

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
fetch('https://api.github.com/users/zDyanTB')
  .then(response => response.json())
  .then(data => {

    // Update HTML elements with fetched data
    document.getElementById('bio').textContent = data.bio;
    document.getElementById('avatar').src = data.avatar_url;
  })
  .catch(error => {
    console.error('Error fetching user data:', error);
  });


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
    const imgElement = repoClone.querySelector('.img');
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
  { repoName: 'zDyanTB/HyprNova', bannerPath: 'src/nova-banner.png' },
  { repoName: 'zDyanTB/ADHD-Floorp', bannerPath: '.github/banner.png' },
  { repoName: 'zDyanTB/aesthetic-wallpapers', bannerPath: 'banner.png' }
];

// Fetch and display repositories in order
repositories.forEach(repo => fetchRepo(repo.repoName, repo.bannerPath));
