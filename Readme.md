# API Reference

## Send event Via HTTP

### Broadcasting

```https
    POST https://vam-socket.onrender.com/new-event
```

| Param | Type     | Description                | Example |
| :-------- | :------- | :------------------------- | :-------  |
| `BODY` | `JSON` | **Required**. Your request body. |  {"message": "Hello World", "event": "new-message"}

Body is required to broadcast all of your client. Definitely, it is **JSON**.

### Client setup

```js
    var ws = new WebSocket("wss://vam-socket.onrender.com");

    ws.onopen = function() {
      ws.send({
        "message": "A new user connected.", 
        "event": "user-connected"}); // sample hello message
      alert("Message is sent.");
    };

    ws.onmessage = function (evt) { 
      var received_msg = evt.data;
      alert("Message is received.");
    };

    ws.onclose = function() {               
    alert("Connection is closed."); 
    };
```

### Listener

```js
    ws.onmessage = function (evt) { 
      var received_msg = evt.data;
      console.log(received_msg);
      /*  output
         {
            "event": "YOUR EVENT NAME",
            "message": "YOUR MESSAGE BODY"
          }
      /*
    };
```

```json
  {
    "event": "YOUR EVENT NAME",
    "message": "YOUR MESSAGE BODY"
  }
```
