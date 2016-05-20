# API Documentation
Every communication ist in the form:
```javascript
{
    event: String,
    payload: {}
}
```
### Login
##### Client
```javascript
{
    event: "login",
    payload: {
        name: ""
    }
}
```
##### Server
```javascript
{
    event: "login",
    payload: {
        playerId: "",
        error: null | ""
    }
}
```
### MainMenu
##### Client
```javascript
{
    event: "createGame",
    payload: {
        playerId: ""
    }
}
```
```javascript
{
    event: "joinGame",
    payload: {
        gameId: "",
        playerId: ""
    }
}
```
##### Server
```javascript
{
    event: "createGame",
    payload: {
        gameId: "",
        error: null | ""
    }
}
```
```javascript
{
    event: "joinGame",
    payload: {
        error: null | ""
    }
}
```
### Lobby
##### Client
```javascript
{
    event: "startRound",
    payload: {
        playerId: ""
    }
}
```
```javascript
{
    event: "action",
    payload: {
        playerId: "",
        type: "buttonPressed"
    }
}
```
##### Server
```javascript
{
    event: "playerList",
    payload: {
        task: "You have to press someday...",
        lives: 3
    }
}
```
```javascript
{
    event: "updateGameState",
    payload: {
        color: "#FFFFFF",
        buttonText: "blue"
    }
}
```
```javascript
{
    event: "validTurn",
    payload: {}
}
```
```javascript
{
    event: "invalidTurn",
    payload: {
        lives: 2
    }
}
```
```javascript
{
    event: "endRound",
    payload: {
        loser: "Name"
    }
}
```