<script lang="ts">
	import { page } from '$app/state';

	import Contents from '@/components/Contents.svelte';
</script>

<Contents isAmp={page.data.isAmp} />
