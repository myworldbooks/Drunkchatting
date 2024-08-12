const editProfileButton = document.getElementById('editProfileButton');
const profileUsername = document.getElementById('profileUsername');
const profileBio = document.getElementById('profileBio');
const profileAvatar = document.getElementById('profileAvatar');

editProfileButton.addEventListener('click', () => {
    const newUsername = prompt('Enter your new username:', profileUsername.innerText);
    const newBio = prompt('Enter your new bio:', profileBio.innerText);

    if (newUsername) {
        profileUsername.innerText = newUsername;
        profileAvatar.src = `https://api.adorable.io/avatars/285/${newUsername}.png`;
    }
    if (newBio) {
        profileBio.innerText = `Bio: ${newBio}`;
    }
});
