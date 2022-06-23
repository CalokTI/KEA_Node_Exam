<script>
  import { baseURL } from "../store/globalStore";
  import { socketID } from "../store/userStore";
  import { notifications } from "../toastr/notifications.js";

  export let socket;

  let name = "";
  let semester = "";
  let issue = "";
  let subject = "";
  let IDsocket = $socketID;

  let semesters = [1, 2, 3, 4, 5];
  let subjects = ["Java", "Github", "HTML", "CSS", "Springboot", "Thymeleaf", "Database", "AWS/Azure", "JS", "ASP.net", "Node.js", "Machine Learning", "Python", "IT Drift", "React Native", "Other"];

  async function submit() {
    //clear input -> redirect to resources
    //submit help request
    //update queue
    //toastr?

    const response = await fetch($baseURL + "/api/questions", {
      method: "POST",
      body: JSON.stringify({ name, semester, issue, subject, IDsocket }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      notifications.success(
        "👏 Help request submitted. Keep the page up for notifications.",
        5000
      );
      socket.emit("addHelp", { name, subject, IDsocket });
    } else {
      notifications.warning("⚠ Oh no! Something went wrong. ⚠", 5000);
    }
  }
</script>

<h1>Help</h1>
<div id="help">
  <h4>Fill out the form for help</h4>

  <p>
    You will be added to the queue and a notification will appear in the bottom
    right.
  </p>

  <div id="inputform">
    <div>
      Name:
      <input type="text" bind:value={name} />
    </div>
    <div>
      semester:
      <select bind:value={semester}>
        {#each semesters as value}<option {value}>{value}</option>
        {/each}
      </select>
    </div>
    <div>
      issue:
      <textarea type="text" bind:value={issue} />
    </div>

    <div>
      subject:
      <select bind:value={subject}>
        {#each subjects as value}<option {value}>{value}</option>
        {/each}
      </select>
    </div>
    <button on:click={submit}>send</button>
  </div>
</div>

<style>
  #help {
    padding: 15px;
    text-align: left;
  }

  #inputform {
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  #inputform > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
  }
  button {
    width: 100px;
  }

  input,
  textarea,
  select {
    width: 250px;
  }
  textarea {
    height: 6em;
  }
</style>
