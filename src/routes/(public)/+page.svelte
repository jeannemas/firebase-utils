<script context="module" lang="ts">
	import Logo from '$components/Logo.svelte';
</script>

<script lang="ts">
</script>

<div class="hero min-h-[32rem]">
	<div class="hero-content text-center">
		<div class="">
			<h1 class="text-5xl font-bold">
				<Logo />
			</h1>

			<p class="py-5">
				Firebase Utils is a powerful tool that provides additional functionalities to the Firebase
				Console web application. It helps to streamline and optimize your workflow by filling in the
				gaps in the Firebase Console.
			</p>

			<div class="flex flex-col justify-center items-center gap-4">
				<a class="btn-primary btn" href="/app"> Go to app </a>

				<a class="btn-secondary btn" href="/docs"> Read the documentation </a>
			</div>
		</div>
	</div>
</div>

<section class="flex flex-col gap-4 text-justify m-4">
	<p>
		With Firebase Utils, you can perform tasks such as bulk deletion of documents, managing indexes,
		and exporting data. It also allows you to explore your database with a more intuitive UI and
		provides additional data visualization options.
	</p>

	<p>
		One of the main advantages of Firebase Utils is that it simplifies complex tasks that would
		typically require coding or command-line interfaces. This means that you can save time and focus
		on other important aspects of your project.
	</p>

	<p>
		Additionally, Firebase Utils provides an easy-to-use interface that makes it accessible for both
		technical and non-technical users. Whether you're a developer, marketer, or product manager,
		Firebase Utils can help you leverage the full potential of Firebase.
	</p>
</section>

<footer class="sticky top-full footer footer-center bg-base-300 p-8 text-base-content">
	<div>
		<p>
			Copyright &copy; 2023 - {new Date().getFullYear()}
			| All right reserved by

			<a href="https://jeannemas.me/?reference=firebase-utils" rel="noreferrer" target="_blank">
				Jeanne Mas
			</a>
		</p>
	</div>
</footer>
