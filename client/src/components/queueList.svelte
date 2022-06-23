<script>
  export let socket;

  let queueList = [];
  socket.on("updateQueue", ({ queue }) => {
	queueList = queue;
  });
</script>

<div>
  <h3>Queue</h3>
  <h4>Join on the help page</h4>
  {#each queueList as queue,index}
    <li>{index+1}. {queue.name} - {queue.subject}</li>
  {/each}
  {#if queueList.length === 0}
  <p>💤</p>
  {/if}
</div>

<style>
  div {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h3,h4 {
    margin: 5px
  }
  h3 {
    color: rgb(35, 50, 73);
    background-color: white;
  }
  h4 {
    color: white;
    background-color: rgb(234, 80, 69);
    margin-top: 10px;
    padding: 2px;
  }

  @media (min-width: 640px) {
    div {
      max-width: none;
    }
  }
</style>
