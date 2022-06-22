<script>
  let inputSearch = "";

  function lmgtfy() {
    window.open("https://www.google.com/search?q=" + inputSearch).focus();
  }
</script>

<div>
  <p>Got nothing to do while waiting?</p>
  <input type="text" bind:value={inputSearch} placeholder="type here" />
  <button on:click={lmgtfy}>Help yourself</button>
</div>

<style>
  div {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  input {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
    border-radius: 0.2rem;
    margin: 0.25rem;
    width: 80%;
  }

  input[type="text"]::placeholder {
    text-align: center;
  }

  button {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
    border-radius: 0.2rem;
    margin: 0.25rem;
    width: 80%;
  }

  @media (min-width: 640px) {
    div {
      max-width: none;
    }
  }
</style>
