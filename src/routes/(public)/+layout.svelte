<script context="module" lang="ts">
	import '../../app.postcss'; // Needed in order to prevent FOUC
	import Navbar from './Navbar.svelte';
</script>

<script lang="ts">
</script>

<Navbar />

<slot />
