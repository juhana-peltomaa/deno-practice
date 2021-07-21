### Quick project for practicing Javascript and deno in a three-tier application (client, server, database). 

Focus on use of views, controllers, services, database to implement a basic web application. More details about project requirements [here](https://wsd.cs.aalto.fi/10-course-project-i/1-project-handout/).

Application deployed at: https://projects-issues.herokuapp.com/

## Instructions for running locally:
1. Download repo files
2. Reconfigure database information locally in the _database.js_ file to match your own database. Original application uses [ElephantSQL](https://www.elephantsql.com/) - information can be filled starting from row 4 of _database.js_. 
3. Add following database schema:

``` 
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE project_issues (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  description TEXT NOT NULL
); 
```

 4. In terminal move to the same root directory as app.js and give command:
     ```deno run --allow-net --allow-read --unstable app.js```


:heavy_exclamation_mark: When application is ran locally and deleting projects, the template will load a message indicating the success of deletion. This is not show when application is ran in Heroku.
 - Projects with existing issues will not be deleted until all issues in project are resolved

:heavy_exclamation_mark: Application has no take on security or validations of entries, just used to practice basics 

