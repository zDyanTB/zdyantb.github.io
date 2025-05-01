export async function fetchGithubUser(username) {
  const user_url = `https://api.github.com/users/${username}`;
  let data = null;

  try {
    const response = await fetch(user_url);
    if (!response.ok) throw new Error('Error fetching github');
    data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return Error;
  }
}
