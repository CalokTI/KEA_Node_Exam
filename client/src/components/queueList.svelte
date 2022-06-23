<script>
  export let socket;

  let queueList = [];
  socket.on("updateQueue", ({ queue }) => {
	queueList = queue;
  });
</script>

<div>
  <p>Queue Component</p>
  <p>socket.io</p>
  {#each queueList as queue,index}
    <li>{index+1}. {queue.name} - {queue.subject}</li>
  {/each}
</div>

<style>
  div {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    div {
      max-width: none;
    }
  }
</style>
