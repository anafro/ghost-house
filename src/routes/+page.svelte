<script lang="ts">
    import {onMount} from "svelte";
    import GhostHouse from "$lib/ghost-house";

    let canvas: HTMLCanvasElement;
    let game: GhostHouse | undefined = $state();

    onMount((): void => {
        game = new GhostHouse(canvas);
        game.run();
    });
</script>


<svelte:head>
    <title>{game?.name ?? 'Game is loading...'}</title>
</svelte:head>

<div id="page">
    <div id="terminal">
        <canvas bind:this={canvas}></canvas>
    </div>
</div>

<style lang="sass">
*, *::before, *::after
  box-sizing: border-box
  margin: 0
  padding: 0

:global(body)
  background: black
  height: 100vh
  margin: 0
  padding: 0
  contain: paint

*
  color: magenta

#page
  height: 100%
  display: grid
  place-items: center

#terminal
  all: unset
  color: #CCCCCC
  font-family: Consolas, sans-serif
  font-size: 2rem
  user-select: none
  white-space: pre-wrap
  overflow: hidden

</style>