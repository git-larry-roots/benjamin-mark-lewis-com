const repositorySearch = document.getElementById('repository-search');
const repositoryCards = [...document.querySelectorAll('.repository-card')];
const repositorySections = [...document.querySelectorAll('.repository-directory')];
const repositoryFilters = [...document.querySelectorAll('[data-repository-filter]')];
const repositoryResults = document.getElementById('repository-results');
const repositoryNoResults = document.getElementById('repository-no-results');
let activeRepositoryFilter = 'all';

function updateRepositoryResults() {
  const query = repositorySearch.value.trim().toLowerCase();
  let visibleCount = 0;
  for (const card of repositoryCards) {
    const type = card.classList.contains('repository-card--fork') ? 'fork' : 'original';
    const matchesType = activeRepositoryFilter === 'all' || activeRepositoryFilter === type;
    card.hidden = !matchesType || !card.textContent.toLowerCase().includes(query);
    if (!card.hidden) visibleCount += 1;
  }
  for (const section of repositorySections) {
    section.hidden = !section.querySelector('.repository-card:not([hidden])');
  }
  repositoryResults.textContent = `${visibleCount} ${visibleCount === 1 ? 'repository' : 'repositories'}`;
  repositoryNoResults.hidden = visibleCount !== 0;
}

repositorySearch.addEventListener('input', updateRepositoryResults);
for (const button of repositoryFilters) {
  button.addEventListener('click', () => {
    activeRepositoryFilter = button.dataset.repositoryFilter;
    for (const filter of repositoryFilters) {
      filter.setAttribute('aria-pressed', String(filter === button));
    }
    updateRepositoryResults();
  });
}
updateRepositoryResults();
