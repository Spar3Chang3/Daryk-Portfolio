<script lang="js">
    import { onMount } from 'svelte';

    import { SiteLinks } from '$lib/index.js';
    import '$lib/components/layout/NavBar.css';

    const navItems = [
        {
            name: 'Home',
            href: SiteLinks.home
        },
        {
            name: 'About Me',
            href: SiteLinks.about
        },
        {
            name: 'Projects',
            href: SiteLinks.projects
        },
        {
            name: 'Contact Me',
            href: SiteLinks.contact
        },
        {
            name: 'Resume',
            href: SiteLinks.resume
        }
    ];

    onMount(() => {

    });
</script>
