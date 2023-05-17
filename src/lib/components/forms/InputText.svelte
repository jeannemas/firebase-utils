<script context="module" lang="ts">
	import type { FieldPath, UnwrapEffects } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import type { AnyZodObject, infer as ZodInfer } from 'zod';
</script>

<script lang="ts">
	type T = $$Generic<AnyZodObject>;

	export let field: keyof ZodInfer<T> | FieldPath<ZodInfer<T>>;
	export let form: SuperForm<UnwrapEffects<T>, unknown>;
	export let label: string;

	$: fieldname = String(field);

	const { constraints, errors, value } = formFieldProxy(form, field);
</script>

<div class="form-control w-full">
	<label class="label" for="{fieldname}">
		<span
			class="label-text after:content-['_*'] after:text-error"
			class:after:hidden="{!$constraints?.required}"
		>
			{label}
		</span>
	</label>

	<input
		class="input input-bordered"
		class:input-error="{$errors}"
		data-invalid="{$errors}"
		id="{fieldname}"
		name="{fieldname}"
		type="text"
		bind:value="{$value}"
		{...$constraints}
		{...$$restProps}
	/>

	{#if $errors}
		<label class="label" for="{fieldname}">
			<ul class="label-text-alt text-error">
				{#each $errors as error}
					<li>
						{error}
					</li>
				{/each}
			</ul>
		</label>
	{/if}
</div>
