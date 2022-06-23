<script>
  import FinishWindow from "../components/finishWindow.svelte";
  import { baseURL } from "../store/globalStore";

  export let socket;

  let finishWindowActive = false;

  let actives = [];
  let finishActive;

  async function fetchActives() {
    const response = await fetch($baseURL + "/api/questions/active");
    const { data } = await response.json();
    actives = data;
  }

  fetchActives();


  function wake(socketID){
	socket.emit('wake', {socketID})
  }

  function finish(active){
    finishActive = active;
    let socketID = finishActive.IDsocket;
    finishWindowActive = true;
    socket.emit('popHelp', { socketID })
  }

</script>

<h1>Tutor page</h1>
<button on:click={fetchActives}>refresh🔃</button>
<table>
  <th class="name">Name</th>
  <th class="subject">subject</th>
  <th class="issue">Issue</th>
  <th class="button">Wake</th>
  <th class="button">Finish</th>
  {#each actives as active}
    <tr>
      <td>{active.name}</td>
      <td>{active.subject}</td>
      <td>{active.issue}</td>
      <td><button on:click="{() => wake(active.IDsocket)}"></button></td>
      <td><button on:click="{() => finish(active)}"></button></td>
    </tr>
  {/each}
</table>

{#if finishWindowActive}
  <FinishWindow {...finishActive} on:closeFinishWindow={() => {finishWindowActive = false; fetchActives()}} />
{/if}





<style>
  table {
    table-layout: fixed;
	width: 90%;
	margin: auto;
  }
  tr {
    border-bottom: 1px solid black;
  }
  th.button {
    width: 10%;
  }
  th.issue {
    width: 50%;
  }
  th.name, th.subject {
	width: 15%
  }
</style>
