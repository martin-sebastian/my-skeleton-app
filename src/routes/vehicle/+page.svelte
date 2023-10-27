<script>
    import { onMount } from "svelte";
    import { apiData, drinkNames } from './store.js';
    
    onMount(async () => {
      fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon")
      .then(response => response.json())
      .then(data => {
            console.log(data);
        apiData.set(data);
      }).catch(error => {
        console.log(error);
        return [];
      });
    });
</script>
    
<main class="p-8">
    <h2 class="h2">Whiskey Drinks Menu</h2>
    <ul>
    {#each $drinkNames as drinkName}
        <li>{drinkName}</li>
    {/each}
    </ul>
</main>

<style>

</style>