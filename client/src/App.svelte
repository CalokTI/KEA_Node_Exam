<script>
  import { Router, Link, Route } from "svelte-navigator";
  import PrivateRoute from "./PrivateRoute.svelte";

  /* Store */
  import { baseURL } from "./store/globalStore.js";
  import { isLoggedIn } from "./store/userStore.js";

  /* Pages */
  import Codelab from "./pages/codelab.svelte";
  import Schedule from "./pages/schedule.svelte";
  import Help from "./pages/help.svelte";
  import Resources from "./pages/resources.svelte";
  import Tutor from "./pages/tutor.svelte";

  /* Components */
  import CurrentTutor from "./components/currentTutor.svelte";
  import Lmgtfy from "./components/lmgtfy.svelte";
  import QueueList from "./components/queueList.svelte";
  import Chat from "./components/chat.svelte";
  import Login from "./components/login.svelte";

  /* Toastr */
  import { notifications } from "./toastr/notifications";
  import Toastr from "./toastr/Toastr.svelte";

  /* Socket.IO */
  import io from "socket.io-client";
  let socket = io("http://localhost:3000");

  socket.on("nextHelp", () => {
    notifications.info("🙋‍♂️ Help is on it's way", 10000);
  });

  let isLogin = false;
  function loginTrue(){
    isLogin = true;
  }
  function loginFalse(){
    isLogin = false;
  }

  function logout() {
    console.log("attempting logout");
    fetch($baseURL + "/users/logout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        notifications.success("👏 Logout", 5000);
        $isLoggedIn = false;
      } else {
        notifications.warning("⚠ Something went wrong ⚠", 5000);
      }
    });
  }

</script>

<Router>
  <main>
    <nav>
      <div>kea logo</div>
      <div>
        <Link to="/">Code Lab</Link>
      </div>
      <div>
        <Link to="/schedule">Schedule</Link>
      </div>
      <div>
        <Link to="/help">Help</Link>
      </div>
      <div>
        <Link to="/resources">Resources</Link>
      </div>
      {#if $isLoggedIn}
      <div>
        <Link to="tutor">Tutor</Link>
      </div>
        <button on:click={logout}>🆓</button>
      {:else}
        <button on:click={loginTrue}>🔑</button>
      {/if}
      
    </nav>
    <div id="lmgtfy">
      <Lmgtfy />
    </div>
    <div id="current-tutor">
      <CurrentTutor />
    </div>
    <div id="page">
      <Route path="/">
        <Codelab />
      </Route>
      <Route path="/schedule">
        <Schedule />
      </Route>
      <Route path="/help">
        <Help {socket} />
      </Route>
      <Route path="/ressources">
        <Resources />
      </Route>
      <PrivateRoute path="/tutor">
        <Tutor />
      </PrivateRoute>
    </div>
    <div id="queuelist">
      <QueueList {socket} />
    </div>
    <div id="chat">
      <Chat {socket} />
    </div>
  </main>
</Router>
{#if isLogin}
        <Login on:closeLogin={loginFalse} />
    {/if}
<Toastr />

<!-- <style global> -->
<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 15% 60% 15% auto;
    grid-template-rows: 50px 10% 50% 20%;
  }

  nav {
    grid-column-start: 2;
    grid-column-end: 5;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    color: white;
    background-color: rgb(35, 50, 73);
  }

  nav > *:last-child {
    margin-left: auto;
  }

  #current-tutor {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
    min-height: 300px;
    background-color: yellow;
  }

  #lmgtfy {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    background-color: green;
  }

  #page {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
    width: 100%;
    background-color: pink;
  }

  #queuelist {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 4;
    background-color: gold;
  }

  #chat {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 4;
    grid-row-end: 5;
    background-color: purple;
  }
</style>
