## ajax
```js
let request = new Request("GET", "/auth/user/" + username);
let request = new Request("/auth/user/" + username); //same
```
```js
let request = new Request("DELETE", "/auth/user/" + username);
```
```js
let request = new Request("POST", "/auth/user/", {username: test, password: qwerty});
```
```js
request.send()
    .then(response => {
        const projects = response;
        this.setState({projects});
    })
   .catch(response => alert);
```