$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
       let username = e.target.value;

    //    make ajax request to GitHub
    $.ajax({     // it takes object
        url:`https://api.github.com/users/${username}`,
        data:{
            client_id:'f5a77507d5b8d33d42ff',
            client_secret:'307d25d00efebbe0e3053ee49fe8e575c8bd8021',
        }
    }).done(function(user){

        $.ajax({     // it takes object
        url:`https://api.github.com/users/${username}/repos`,
        data:{
            client_id:'f5a77507d5b8d33d42ff',
            client_secret:'307d25d00efebbe0e3053ee49fe8e575c8bd8021',
            sort: 'created: asc',
            per_page:5
        }
    }).done(function(repos){
        $.each(repos, function(index, repo){
            $('#repos').append(`
            <div class="card">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                </div>
              </div>
            </div>
          `);       
        });
    });
        
        // console.log(user);
        $('#profile').html(`
        <div class="card card-border-primary mb-3" style='max-width: 100rem;'>
            <div class="card-header">
                <h3>${user.name}</h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}">
                        <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-secondary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Followers: ${user.followers}</span>
                        <span class="badge badge-info">Following: ${user.following}</span>
                        <br><br>

                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                            <li class="list-group-item">Email: ${user.email}</li>
                        </ul>
                    </div>
                </div>    
            </div>
        </div>
        <h3 class='page-header'>Latest Repos</h3>
        <div id='repos'></div>
        `);
    });
    });
});