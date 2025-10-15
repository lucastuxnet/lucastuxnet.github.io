const username = 'lucastuxnet';
const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
const reposListContainer = document.getElementById('repos-list');

async function fetchRepos() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        const repos = await response.json();
        reposListContainer.innerHTML = '';
        repos.forEach(repo => {

            if (repo.name === `${username}.github.io`) {
                return;
            }

            const repoCard = document.createElement('a');
            repoCard.href = repo.html_url;
            repoCard.target = '_blank';
            repoCard.classList.add('repo-card');

            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Sem descrição.'}</p>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>${repo.language ? `● ${repo.language}` : ''}</span>
                </div>
            `;

            reposListContainer.appendChild(repoCard);
        });

    } catch (error) {
        console.error('Falha ao buscar repositórios:', error);
        reposListContainer.innerHTML = '<p>Não foi possível carregar os repositórios. Tente novamente mais tarde.</p>';
    }
}
fetchRepos();