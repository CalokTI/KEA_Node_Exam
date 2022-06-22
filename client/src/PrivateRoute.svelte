<!-- https://svelte.dev/repl/c81d8f3dff584065a82b2d3ea7cd4aee?version=3.48.0 -->

<script>
    import { Route } from "svelte-navigator";
    import PrivateRouteGuard from "./PrivateRouteGuard.svelte";
  
    export let path;
    export let component;
  </script>
  
  <Route {path} let:params let:location let:navigate>
    <PrivateRouteGuard component={component}>
      <slot {params} {location} {navigate} />
    </PrivateRouteGuard>
  </Route>
  