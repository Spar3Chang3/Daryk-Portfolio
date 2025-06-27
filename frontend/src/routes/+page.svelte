<script lang="js">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { SiteLinks } from '$lib/index.js';

    onMount(() => {
        goto(SiteLinks.home);
    });
</script>