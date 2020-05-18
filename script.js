const getTextButton = document.querySelector("#getText");
const getJsonButton = document.querySelector("#getJson");
const getApiDataButton = document.querySelector("#getApiData");
const addPostForm = document.querySelector("#addPost");
const output = document.querySelector(".output");

function getText() {
    fetch("sample.txt")
    .then(res => res.text())
    .then(data => {
        output.textContent = data;
    })
    .catch(err => console.log(err))
}

function getJson() {
    fetch("users.json")
    .then(res => res.json())
    .then(data => {
        let html = "<h2>Users</h2>";
        data.forEach(user => {
            html += `
                <ul>
                    <li>ID: ${user.id}</li>
                    <li>Name: ${user.name}</li>
                    <li>Email: ${user.email}</li>
                </ul>`;
        output.innerHTML = html;
        })
    })
    .catch(err => console.log(err))
}

function getApiData() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        let html = "<h2>Posts</h2>";
        data.forEach(post => {
            html += `
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <p class="muted">Post ID ${post.id} by User ID ${post.userId}</li>
                </div>`;
        output.innerHTML = html;
        })
    })
    .catch(err => console.log(err))
}

function addPost(e) {
    e.preventDefault();
    const title = addPostForm.title.value;
    const body = addPostForm.body.value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ title: title, body: body })
    })
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(data => {
        console.log(data)
        let html = `
            <h2>API Success Response</h2>
            <pre>${JSON.stringify(data)}</pre>`;
        output.innerHTML = html;
    })
    .catch(err => console.log(err))
}

getTextButton.addEventListener("click", getText);
getJsonButton.addEventListener("click", getJson);
getApiDataButton.addEventListener("click", getApiData);
addPostForm.addEventListener("submit", addPost);