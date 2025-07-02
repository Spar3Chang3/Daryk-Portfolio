<script lang="js">
    import { onMount } from 'svelte';
    import { startAllListeners, GetWorldTime } from '$lib/index.js';
    import { initStats, updateStats } from '$lib/stats.js';
    import NavBar from '$lib/components/layout/NavBar.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';

    onMount(() => {
        startAllListeners();
        initStats().catch(err => {
            console.log(err);
        });

        window.addEventListener('beforeunload', async () => {
            const leaveTime = GetWorldTime();
            await leaveTime.then(() => {
               updateStats(leaveTime);
            });
        });
    });

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
        --color-neutral: #E3E6F0;       /* Gray 200 */
        --color-neutral-dark: #374151;  /* Gray 700 */
        --color-warning: #F59E0B;       /* Amber 500 */
        --color-error: #EF4444;         /* Red 500 */
        --color-success: #22C55E;       /* Green 500 */
        --color-emphasis: #111827;
        --color-code: rgba(17, 24, 39, 0.6);

        /* Backgrounds and text */
        --background-standard: #F9FAFB;     /* Gray 50 */
        --background-secondary: #FFFFFF;
        --text-standard: #111827;           /* Gray 900 */
        --text-muted: #6B7280;              /* Gray 500 */
        --text-compliment: #F6FAFF;
        --text-inverse: #FFFFFF;
        --dot-bg: var(--color-neutral);
        --background-alpha: rgba(200, 220, 255, 0.5);
        --shadow-color: rgba(30, 58, 100, 0.1);
        --shadow-color-emphasis: rgba(30, 58, 100, 0.4);

        /* Components */
        --banner-standard: var(--color-primary);
        --banner-accent: var(--color-secondary);
        --banner-accent-selected: rgba(59, 130, 246, 0.6);
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
            --color-emphasis: #E5E7EB;
            --hyperlink: #34D399; /* Emerald 400 */
            --dot-bg: var(--color-neutral-dark);
            --background-alpha: rgba(30, 58, 100, 0.35);
            --shadow-color: rgba(17, 24, 39, 0.4);
            --shadow-color-emphasis: rgba(17, 24, 39, 0.6);
        }
    }

    main {
        flex: 1;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        background-color: transparent;
        overflow-x: hidden;
        color: var(--text-standard);
        line-height: var(--line-height-standard);
    }

    main p {
        font-size: var(--standard-text-size);
    }

    :global(html, body) {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        font-family: var(--font-standard);
        background-color: var(--background-standard);
        background-image: radial-gradient(var(--dot-bg) 0.25rem, transparent 0);
        background-size: 3rem 3rem; /* Spacing of the dots */
        background-position: center;
        color: var(--text-standard);
    }

    :global {
        .page {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 100%;
            min-height: 100%;
            align-items: center;
            backdrop-filter: blur(2px);
        }

        .heading-container {
            display: flex;
            box-sizing: border-box; /* !Required to calc the padding without literally adding calc() */
            width: 100%;
            padding: 0 2rem;
        }

        .page-heading {
            flex: 1;
            background: var(--background-secondary);
            padding: 1rem;
            font-family: var(--font-special);
            border-radius: 0.5rem;
            box-shadow: 0 0 1rem var(--shadow-color);
        }

        @media only screen and (max-width: 768px) {
            .page {
                padding-bottom: 4rem;
            }

            .heading-container {
                padding: 0 1rem;
            }
        }
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
