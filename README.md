# Greddiit

## Running

### Build docker services

`$ sudo docker-compose build`

### Run docker services

`$ sudo docker-compose up`

Access on web browser via `localhost:8000`

---


## Login and Registration

Hosted on /login using react component `<Login />`

This page contains login and registration functionality using MUI templates.

Email is taken to be unique. Input validation has been implemented in both backend and frontend.

## Navbar

The navbar contains MUI icons to all specified links. In the `My Subgreddiits` page, the navbar also includes icons to the links to `join requests`, etc.

## Profile Page

Includes a form to allow editing the user details. Drop down lists of followers and following is also present.

## My Subgreddiits Page

There is a form to create a new subgreddiit. The list of already created subgreddit is also present with all the required details such as number of people, number of posts, name, description and comma-separated list of banned keywords.

We can delete and open subgreddits.

## Subgreddit Page (Moderator View)

We have separate pages for showing existing users (along with banned users), join requests and reports.

### Reports

A report can be

    1. Ignored in which case all other buttons are disabled

    2. The post's poster can be banned from the subgreddiit

    3. The post can be deleted in which case all reports for the post are also deleted.

Reports are deleted after 10 days.

## Sub Greddiits Page

We can search, fuzzy search, filter, and sort. Nested sort in which order of selection matters has also been implemented.

The subgreddiits are show below the search pane in which we can open a page, leave a page or join a page.

## Subgreddiit Page (User View)

The left part contains the subgreddiit's information and image. We can add posts (if we are users of the subgreddiit), upvote posts, downvote posts, follow users, save posts and report posts.

Nested comments have been implemented.

## Saved Posts

We can see all the saved posts and also unsave posts.

## Banned keywords

If a post contains some banned words (case insensitive), we alert the user and the text is replaced by asterisks.

## Misc

Input validaton has been done.

We don't allow users to access API calls through protected routes.

Buttons are disabled during API calls.

## Dockerization

We run in docker using `docker-compose`. Containers include `subgreddiit-nginx`, `subgreddiit-backend` and `subgreddiit-frontend`.
