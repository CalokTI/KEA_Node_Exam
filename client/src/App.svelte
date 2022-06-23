<script>
  import { Router, Link, Route } from "svelte-navigator";
  import PrivateRoute from "./PrivateRoute.svelte";

  /* Store */
  import { baseURL, runOnce } from "./store/globalStore.js";
  import { socketID, isLoggedIn } from "./store/userStore.js";

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
  socket.on("connect", () => {
    $socketID = socket.id;
  });

  socket.on("username", (username) => {
    socket.username = username;
  });

  socket.on("nextHelp", () => {
    notifications.info("🙋‍♂️ Help is on it's way", 10000);
  });

  /* Images */
  let logoKEA = "logo-main-black-single.png";

  let isLogin = false;
  function loginTrue() {
    isLogin = true;
  }
  function loginFalse() {
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
  if ($runOnce) {
    notifications.info(
      "This page uses cookies for necessary functions, by continuing you agree to cookies being store on your pc.",
      20000
    );
    $runOnce = false;
  }
</script>

<Router>
  <main>
    <div id="logo"><img src={logoKEA} alt="KEA logo" /></div>
    <nav>
      <div class="link-wrapper push-right">
        <Link class="link" to="/">Code Lab</Link>
      </div>
      <div class="link-wrapper">
        <Link class="link" to="/schedule">Schedule</Link>
      </div>
      <div class="link-wrapper">
        <Link class="link" to="/help">Help</Link>
      </div>
      <div class="link-wrapper">
        <Link class="link" to="/resources">Resources</Link>
      </div>
      {#if $isLoggedIn}
        <div class="link-wrapper">
          <Link class="link" to="/tutor">Tutor</Link>
        </div>
        <div class="log" on:click={logout}>🆓</div>
      {:else}
        <div class="log" on:click={loginTrue}>🔑</div>
      {/if}
    </nav>
    <div id="lmgtfy">
      <Lmgtfy />
    </div>
    <div id="current-tutor">
      <CurrentTutor />
    </div>
    <div id="page">
      <PrivateRoute path="/tutor">
        <Tutor {socket} />
      </PrivateRoute>

      <Route path="/resources">
       <Resources />
      </Route>

      <Route path="/schedule">
        <Schedule />
      </Route>

      <Route path="/help">
        <Help {socket} />
      </Route>

      <Route path="/">
        <Codelab />
      </Route>
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
    grid-template-columns: auto 15% 20px 50% 20px 15% auto;
    grid-template-rows: 65px 20px 50% 10% 20px 20%;
  }

  #logo {
    grid-column-start: 2;
    grid-column-end: 3;
    background-color: rgb(234, 80, 69);
    display: flex;
    align-content: center;
    justify-content: center;
  }
  #logo > img {
    width: 60%;
    height: 60%;
    align-self: center;
  }

  nav {
    grid-column-start: 3;
    grid-column-end: 7;
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

  .link-wrapper {
    height: 100%;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-content: center;
    justify-content: center;
    
  }
  .push-right {
    margin-left: 30px;
  }

  :global(a, a:visited) {
    color: white;
    text-decoration: none;
    align-self: center;
  }

  .log {
    background-color: rgb(234, 80, 69);
    height: 100%;
    width: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #current-tutor {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 5;
    min-height: 300px;
    background-color: rgb(237, 162, 156);
  }

  #lmgtfy {
    grid-column-start: 6;
    grid-column-end: 7;
    grid-row-start: 4;
    grid-row-end: 5;
    background-color: rgb(74, 125, 85);
    color:rgb(237, 237, 237);
  }

  #page {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
    width: 100%;
    background-color: white;
  }

  #queuelist {
    grid-column-start: 6;
    grid-column-end: 7;
    grid-row-start: 3;
    grid-row-end: 4;
    min-height: 300px;
    background-color: rgb(74, 125, 85);
    color:rgb(237, 237, 237);
  }

  #chat {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 6;
    grid-row-end: 7;
    min-height: 200px;
    max-height: 200px;
    background-color: white;
  }
</style>
