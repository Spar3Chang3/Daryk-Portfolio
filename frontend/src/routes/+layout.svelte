<script lang="js">
    import NavBar from '$lib/components/layout/NavBar.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';
    import { onMount } from 'svelte';

    let { children } = $props();
</script>

<style lang="css">

    @font-face {
        font-family: 'JetBrains Mono';
        src: url('/fonts/JetBrainsMono-Regular.woff2') format("woff");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    :root {
        /* Semantic base colors */
        --color-primary: #1E3A8A;       /* Indigo 800 */
        --color-secondary: #3B82F6;     /* Blue 500 */
        --color-accent: #10B981;        /* Emerald 500 */
        --color-neutral: #E5E7EB;       /* Gray 200 */
        --color-neutral-dark: #374151;  /* Gray 700 */
        --color-warning: #F59E0B;       /* Amber 500 */
        --color-error: #EF4444;         /* Red 500 */
        --color-success: #22C55E;       /* Green 500 */

        /* Backgrounds and text */
        --background-standard: #F9FAFB;     /* Gray 50 */
        --background-secondary: #FFFFFF;
        --text-standard: #111827;           /* Gray 900 */
        --text-muted: #6B7280;              /* Gray 500 */
        --text-inverse: #FFFFFF;

        /* Components */
        --banner-standard: var(--color-primary);
        --banner-accent: var(--color-secondary);
        --hyperlink: var(--color-accent);

        /* Fonts */
        --line-height-standard: 1.75rem;
        --font-standard: "Adwaita Sans", sans-serif;
        --font-special: "JetBrains Mono", monospace;

        --banner-text-size: 2.5rem;
        --standard-text-size: 1.2rem;

        background-color: var(--background-secondary);
        overflow-x: hidden;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background-standard: #1F2937;     /* Gray 800 */
            --background-secondary: #111827;    /* Gray 900 */
            --text-standard: #F9FAFB;
            --text-muted: #9CA3AF;
            --hyperlink: #34D399;               /* Emerald 400 */
        }
    }

    :global(html, body) {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        font-family: var(--font-standard);
        background-color: var(--background-secondary);
        color: var(--text-standard);
    }

    :global(.page) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
    }

    main {
        flex: 1;
        min-height: 100%;
        width: 100%;
        background-color: var(--background-standard);
        overflow-x: hidden;
        color: var(--text-standard);
        line-height: var(--line-height-standard);
    }

    main p {
        font-size: var(--standard-text-size);
    }
</style>

<header id="header">
    <NavBar />
</header>
<main>
    {#if children}
        {@render children()}
    {:else}
        <p>502</p>
    {/if}
</main>
<footer id="footer">
    <Footer />
</footer>
