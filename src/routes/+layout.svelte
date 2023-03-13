<script lang="ts">
	import type { Link } from '$lib/models/Link';

	import '../app.postcss';
	import Navbar from './Navbar.svelte';

	const links = [
		{
			pathname: '/firebase/auth',
			label: 'Authentication',
		},
		{
			pathname: '/firebase/firestore',
			label: 'Firestore',
		},
		{
			pathname: '/firebase/storage',
			label: 'Storage',
		},
		{
			pathname: '/firebase/functions',
			label: 'Functions',
		},
	] satisfies Link[];
</script>

<div class="flex min-h-screen flex-col">
	<Navbar links="{links}" />

	<div class="flex grow flex-col">
		<main class="mx-8 my-4 grow md:my-8 md:mx-24">
			<slot />
		</main>

		<footer class="footer footer-center bg-base-300 p-4 py-8 text-base-content">
			<div>
				<p>
					Copyright &copy; {new Date().getFullYear()} - All right reserved by Jeanne Mas
				</p>
			</div>
		</footer>
	</div>
</div>
