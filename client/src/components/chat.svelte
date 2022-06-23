<script>
  export let socket;

  /* timestamp(HH:MM) | socket.username: message */
  $: messages = [];
  let message = "";

  

  function sendMessage() {
    let date = new Date();
    let time = date.toLocaleTimeString('da-DK', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
    let username = socket.username;
    socket.emit("newMessage", { data: message, username: username, time: time });
    message = '';
  }

  socket.on("chatMessage", ({ message }) => {
    let newMessage = message.data;
    let username = message.username;
    let time = message.time
    messages = [...messages, { time, username, newMessage }];
  });
</script>

<div id="chatbox">
  <ul id="messages">
  {#each messages as message}
    <li>{message.time} | {message.username}: {message.newMessage}</li>
  {/each}
  </ul>

  <div id="form">
    <input id="input" autocomplete="off" bind:value={message} />
    <button on:click={sendMessage}>Send</button>
  </div>
</div>

<style>
  #chatbox {
    height: 200px;
    display: grid;
    grid-template-rows: auto 3rem;
  }

  #messages {
    padding: 15px;
    text-align: left;
    grid-row-start: 1;
    grid-row-end: 2;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  #form {
    grid-row-start: 2;
    background: rgba(0, 0, 0, 0.15);
    padding: 0.25rem;
    display: flex;
    height: 3rem;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
  }
  #input {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
    border-radius: 2rem;
    margin: 0.25rem;
  }
  #input:focus {
    outline: none;
  }
  #form > button {
    background: #333;
    border: none;
    padding: 0 1rem;
    margin: 0.25rem;
    border-radius: 3px;
    outline: none;
    color: #fff;
  }
</style>
