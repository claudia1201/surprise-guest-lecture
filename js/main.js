var endpoint = 'https://api.github.com/orgs/tiy-atlanta/repos';
var template = _.template($('#repo').text());
var $ul = $('.repos');
var repoData;

function renderRepos(data) {
  $ul.empty();
  data.forEach(function(repo){
    if (repo.stargazers_count) {
      repo.stargazers_class = 'has_stargazers';
    }
    else {
      repo.stargazers_class = 'no_stargazers';
    }
    $ul.append(template(repo));
  });
}

function sortAlphabetically() {
  var sorted = _.sortBy(repoData, function(repo) {
    return repo.name.toLowerCase();
  });
  renderRepos(sorted);
}

function sortStargazers() {
  var sorted = _.sortBy(repoData, function(repo) {
    return 0 - repo.stargazers_count;
  });
  renderRepos(sorted);
}

$.getJSON(endpoint).done(function(data){
  repoData = data;
  console.log('B repoData is ', new Date().getMilliseconds(), repoData);
  sortStargazers();

  $('.sort-alpha').on('click', function(event) {
    event.preventDefault();
    sortAlphabetically();
  });
  $('.sort-stars').on('click', function(event) {
    event.preventDefault();
    sortStargazers();
  });
});

console.log('A repoData is ', new Date().getMilliseconds(), repoData);
