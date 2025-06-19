<script lang="js">
    import { onMount } from 'svelte';
    import { SiteLinks, DataLinks, MediaIsMobile } from '$lib/index.js';

    let isMobile = $state();

    onMount(() => {
        MediaIsMobile.subscribe((data) => {
            isMobile = data;
        });
    });
</script>
<style lang="css">
    .nav-bar {
        display: flex;
        flex-direction: row;

        min-height: 4rem;
        max-height: 100%;
        width: 100%;

        align-items: center;
        gap: 1rem;
        padding: 0 1rem;

        background-color: var(--banner-standard);
    }

    .portrait-container {
        display: grid;
        place-items: center;
        max-height: 4rem;
        max-width: 4rem;
    }

    .spacer {
        display: flex;
        flex: 1;
    }

    .nav-link-home img {
        object-fit: contain;
        max-height: 4rem;
        max-width: 4rem;
        aspect-ratio: 1 / 1;
        border-radius: 0.5rem;
    }

    .nav-links {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr 2fr;
        grid-template-rows: 1fr;

        height: 3rem;

        justify-content: center;
        align-items: center;
        gap: 1rem;

        list-style: none;
    }

    .nav-link {
        height: 2.5rem;
        width: 8rem;
        background-color: var(--banner-accent);
        border-radius: 0.5rem;
    }

    .nav-link a {
        display: grid;
        place-items: center;
        padding: 0;
        text-decoration: none;
        color: var(--text-standard);
        font-size: 1.25rem;
        height: 100%;
        width: 100%;
    }

    .toggle-nav-btn {
        height: 3rem;
        width: 3rem;
        background-color: var(--banner-accent);
        visibility: hidden;
    }
</style>
<nav class="nav-bar" aria-label="Website navigation">
    <div class="portrait-container">
        <a class="nav-link-home" href={SiteLinks.home}>
            <img src={DataLinks.portraitInit} alt="Portrait of Daryk Baker. Clicking returns to website homepage"/>
        </a>
    </div>
    <div class="spacer" aria-hidden="true"></div>
    <ul class="nav-links" role="listbox">
        <li class="nav-link">
            <a href={SiteLinks.about}>About Me</a>
        </li>
        <li class="nav-link">
            <a href={SiteLinks.projects}>Projects</a>
        </li>
        <li class="nav-link">
            <a href={SiteLinks.contact}>Contact Me</a>
        </li>
        <li class="nav-link">
            <a href={SiteLinks.resume}>Resume</a>
        </li>
    </ul>
    <button class="toggle-nav-btn" aria-hidden="{!isMobile}">☰</button>
</nav>