document.addEventListener('DOMContentLoaded', function(){

    document.getElementById('github-form').addEventListener('submit', findUser);
    
    function findUser(event){
        event.preventDefault(); 
        let name = event.target.search.value
        getName(name); 
    }

    function getName(name){
        fetch(`https://api.github.com/search/users?q=${name}`)
        .then(resp => resp.json())
        .then(json => {
            json.items.forEach(user => {
                htmlForUserMatches(user)
            })
        })
    }

    function htmlForUserMatches(user){
        let userList = document.getElementById('user-list')
        let newUserDiv = document.createElement('div')
        let userName = document.createElement('p')
        let userId = document.createElement('p')
        let userLink = document.createElement('a')

        userName.textContent = user.login;
        userId.textContent = user.id;
        userLink.textContent = user.html_url;

        userList.appendChild(newUserDiv);
        newUserDiv.appendChild(userName);
        newUserDiv.appendChild(userId);
        newUserDiv.appendChild(userLink);

        userName.addEventListener('click', event => getRepos(event, user.login))

        return newUserDiv;
    }

    function getRepos(event, userLogin){
        fetch(`https://api.github.com/users/${userLogin}/repos`)
        .then(resp => resp.json())
        .then(json => {
            document.getElementById('repos-list').innerHTML = ""
            json.forEach(repo => {
                displayRepos(repo)
            })
        })
    }

    function displayRepos(repo){
        // hidePreviousDiv();

        let repoUL = document.getElementById('repos-list')
        let newRepoDiv = document.createElement('div')
        let newRepoName = document.createElement('li')

        newRepoName.textContent = repo.name;

        repoUL.appendChild(newRepoDiv);
        newRepoDiv.appendChild(newRepoName); 

        return newRepoDiv
    }

    // function hidePreviousDiv(id){

    // }

    //BONUS

    function addToggle(){
        let mainDiv = document.getElementById('main')

        let newForm = document.createElement('form');
        let searchBar = document.createElement('input');
        let submitSearch = document.createElement('input')

        newForm.id = 'searchRepoList'
        searchBar.type = 'text';
        searchBar.name = 'searchRepo'
        searchBar.placeholder = 'Search by repo'

        submitSearch.type = 'submit';

        newForm.appendChild(searchBar);
        newForm.appendChild(submitSearch); 
        mainDiv.appendChild(newForm);
    }

    addToggle();

    document.getElementById('searchRepoList').addEventListener('submit', event => findRepos(event))

    function findRepos(event){
        let searchValue = event.target.searchRepo.value;
        event.preventDefault();
        fetch(`https://developer.github.com/v3/search/#${searchValue}`, {
            headers: {
                // 'Content-type': 'application/vnd.github.mercy-preview+json', 
                Accept: 'application/vnd.github.mercy-preview+json'
            },
        })
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
        })
        .catch(console.log)
    }

})