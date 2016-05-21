# API Documentation
Every communication ist in the form:
```javascript
{
    event: String,
    payload: {}
}
```
### MainMenu
##### Client
```javascript
{
    event: "createGame",
    payload: {
        playerName: ""
    }
}
```
```javascript
{
    event: "joinGame",
    payload: {
        gameId: "",
        playerName: ""
    }
}
```
##### Server
```javascript
{
    event: "createGame",
    payload: {
        gameId: "",
        playerId: "",
        error: null | ""
    }
}
```
```javascript
{
    event: "joinGame",
    payload: {
        playerId: "",
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
        players: [""]
    }
}
```
```javascript
{
    event: "startRound",
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
        buttonColor: "#FFFFFF",
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