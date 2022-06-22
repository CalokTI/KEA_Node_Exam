<script>
  import { baseURL } from "../store/globalStore";
  import { notifications } from "../toastr/notifications.js";

  export let socket;

  let name = "";
  let semester = "";
  let issue = "";
  let subject = "";
  let id = socket.id;

  let semesters = [1, 2, 3, 4, 5];
  let subjects = ["HTML", "CSS", "JS", "Database", "AWS/Azure", "Github"];

  async function submit() {
    //clear input -> redirect to resources
    //submit help request
    //update queue
    //toastr?

    const response = await fetch($baseURL + "/api/questions", {
      method: "POST",
      body: JSON.stringify({ name, semester, issue, subject }),
      headers: {
        "content-type": "application/json",
      },
    });    
    
    if (response.ok) {
      notifications.success("👏 Help request submitted", 5000);
      socket.emit('addHelp', {name, subject, id})
      
    } else {
      notifications.warning("⚠ Oh no! Something went wrong. ⚠", 5000);
    }
  }
</script>

<h1>Help!</h1>
<p>form til navn, semester og problem (emne?)</p>
<p>vis igangværende spørgsmål, mulighed for edit og slet</p>
<p>
  popup med accepted når tutoren vælge spørgsmålet, fjern mulighed for slet og
  edit
</p>

<p>update queue on submit</p>

<div id="inputform">
  <label
    >Name:
    <input type="text" bind:value={name} />
  </label>

  <label
    >semester:
    <select bind:value={semester}>
      {#each semesters as value}<option {value}>{value}</option>
      {/each}
    </select>
  </label>

  <label
    >issue:
    <input type="text" bind:value={issue} />
  </label>

  <label
    >subject:
    <select bind:value={subject}>
      {#each subjects as value}<option {value}>{value}</option>
      {/each}
    </select></label
  >
  <button on:click={submit}>send</button>
</div>

<style>
  #inputform {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
