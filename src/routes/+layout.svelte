<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	import '@/scss/index.scss';
	import Nav from '@/components/Nav.svelte';
	import { BASE_URL, DESCRIPTION, PROJECT_NAME, TITLES } from '@/lib/constants';
	import { minifyInternal } from '@/lib/minify';
	import { hitYM } from '@/lib/ym';

	let { children } = $props();
	let id = $derived(
		page.params.id
			? `/${page.params.id}`
			: (page.route.id || '/').replace('/amp', '')
	);
	let title = $derived(TITLES[`${id}`] || '');
	let metaTitle = $derived(title ? `${PROJECT_NAME}. ${title}` : PROJECT_NAME);
	let description = $derived(
		title
			? `Современная бытовая сказка о деде Андрее и бабке Тане «${title}».`
			: DESCRIPTION
	);
	let content = $derived(page.params.id ? (page.data[id] as string) : '');
	let isAmp = $derived(Boolean(page.data.isAmp));

	afterNavigate(function ({ from }) {
		hitYM({ referer: from?.url.toString() || '' });
	});
</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{BASE_URL}{id}" />
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="{BASE_URL}{id}" />

	{#if !isAmp}
		<link rel="amphtml" href="{BASE_URL}/amp{id}" />
	{/if}
</svelte:head>

<main class="main">
	<section class="main__section">
		<h1>{title || PROJECT_NAME}</h1>
		{@html minifyInternal(content)}
		{@render children()}
	</section>

	<nav class="main__nav">
		{#if id === '/'}
			<a href="https://pineglade.github.io">
				© Интернет-издательство «Сосновая Поляна»
			</a>
		{:else}
			<Nav {isAmp} />
		{/if}
	</nav>
</main>
