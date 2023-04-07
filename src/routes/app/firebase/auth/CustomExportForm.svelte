<script context="module" lang="ts">
	import Collapse from '$components/Collapse.svelte';
</script>

<script lang="ts">
</script>

<form>
	<Collapse lazyload>
		<div slot="title">Title</div>

		<!-- TODO -->

		<div>Content</div>
	</Collapse>
</form>
