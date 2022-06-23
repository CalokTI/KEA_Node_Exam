<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  /* Store */
  import { baseURL } from "../store/globalStore.js";

  import { notifications } from "../toastr/notifications";

  const dispatch = createEventDispatcher();

  export let _id;
  export let name;
  export let semester;
  export let issue;
  export let subject;
  export let active;
  export let solution;
  export let IDsocket;

  async function submit() {
    active = false;

    const response = await fetch($baseURL + "/api/questions/" + _id, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        semester,
        issue,
        subject,
        active,
        solution,
        IDsocket,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      notifications.success("Help request closed.", 5000);
      close();
    } else {
      notifications.warning(
        "⚠ Something went wrong with closing the help request. ⚠",
        5000
      );
    }
  }

  function close() {
    dispatch("closeFinishWindow");
  }
</script>

<div class="background" on:click={close} transition:fade />
<div class="finish-box" transition:fly={{ y: -500 }}>
  <h3>Finish</h3>
  <div>{name} - {semester}</div>
  <div>subject: {subject}</div>
  <div>Description: {issue}</div>
  <form on:submit|preventDefault={submit}>
    <textarea
      bind:value={solution}
      required
      type="text"
      placeholder="Solution"
    />
    <div id="buttons">
      <button type="submit">Finish and close</button>
      <button on:click={close}>Cancel</button>
    </div>
  </form>
</div>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .finish-box {
    padding: 15px;
    text-align: left;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 300px;
    width: 500px;
    color: white;
    background-color: rgb(35, 50, 73);
    z-index: 3;
    border: solid 2px rgb(234, 80, 69);
    border-radius: 5px;
  }
  .finish-box > h3 {
    margin: auto;
  }

  textarea {
    height: 4em;
  }

  form {
    position: absolute;
    bottom: 15px;
  }
</style>
