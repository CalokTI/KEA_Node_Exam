<script>
  let inputSearch = "";

  function lmgtfy() {
    window.open("https://www.google.com/search?q=" + inputSearch).focus();
  }
</script>

<div>
  <p>Check resources or </p>
  <input type="text" bind:value={inputSearch} placeholder="type here" />
  <button on:click={lmgtfy}>Help yourself</button>
</div>

<style>
  div {
    text-align: center;
    padding: 0.5em;
    max-width: 240px;
    margin: 0 auto;
  }

  input {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
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
    margin: 0.25rem;
    padding-bottom: 0.15rem;
    width: 80%;
    color: white;
    font-weight: bold;
    background-color: rgb(35, 50, 73);
  }

  @media (min-width: 640px) {
    div {
      max-width: none;
    }
  }
</style>
