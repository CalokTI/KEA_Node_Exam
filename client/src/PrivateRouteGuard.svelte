<!-- https://svelte.dev/repl/c81d8f3dff584065a82b2d3ea7cd4aee?version=3.48.0 -->
<script>
  import { Route } from "svelte-navigator";
  import { baseURL } from "./store/globalStore.js";
  import Codelab from "./pages/codelab.svelte";

  export let path;
  export let component;

  let isAuthorized = false;

  async function checkAuthorized() {
    const res = await fetch($baseURL + `/users/authorized`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    if (res.ok) isAuthorized = true;
    return isAuthorized;
  }

  let promise = checkAuthorized();
</script>

{#await promise then}
  {#if isAuthorized}
    <slot />
    <Route {path} {component} />
  {:else}
    <Route path={"/"} component={Codelab} />
  {/if}
{/await}
