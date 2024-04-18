<script>
  import { onMount } from "svelte";

  onMount(() => {
    // вот тут можно чекать localstorage etc.
  })
  const onClick = () => {
    console.log('hello')
  }
</script>
<button class="bg-purple-800 text-white p-4 rounded-md" on:click={onClick}>
  Login
</button>