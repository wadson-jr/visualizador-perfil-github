const searchButton = document.getElementById("btn-search");
const searchInput = document.getElementById("input-search");
const profileResults = document.getElementById("profile-results");
const baseURL = "https://api.github.com";

function showLoader(show) {
  profileResults.innerHTML = show
    ? '<div class="loader"></div>'
    : "";
}

async function getUser(username) {
  if (!username) {
    alert("Por favor, digite um nome de usuário do GitHub.");
    return;
  }

  showLoader(true);

  try {
    const response = await fetch(`${baseURL}/users/${username}`);

    if (!response.ok) {
      if (response.status === 404) {
        profileResults.innerHTML = "<p>Usuário não encontrado.</p>";
      } else {
        profileResults.innerHTML =
          "<p>Ocorreu um erro ao buscar o usuário.</p>";
      }
      return;
    }

    const userData = await response.json();

    profileResults.innerHTML = `
        <div class="profile-card animated fadeIn">
            <img src="${userData.avatar_url}" alt="Avatar de ${
      userData.name || userData.login
    }" class="profile-avatar">
            <div class="profile-info">
                <h2>${userData.name || userData.login}</h2>
                <p>${userData.bio || "Não possui biografia cadastrada."}</p>
            </div>
        </div>
        `;
  } catch (error) {
    console.error("Erro na requisição:", error);
    profileResults.innerHTML =
      "<p>Ocorreu um erro na requisição. Verifique sua conexão.</p>";
  }
}

searchButton.addEventListener("click", () => {
  getUser(searchInput.value);
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    getUser(searchInput.value);
  }
});
