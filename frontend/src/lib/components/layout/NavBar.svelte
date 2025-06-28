<script lang="js">
    import { onMount } from 'svelte';
    import { onNavigate } from '$app/navigation';
    import { SiteLinks, DataLinks, MediaIsMobile, PrefersReducedMotion } from '$lib/index.js';

    let isMobile = $state();
    let prefersReducedMotion = $state();

    let showMobileNav = $state(false);

    function toggleMobileNav(e) {
        e.preventDefault();

        showMobileNav = !showMobileNav;
    }

    onMount(() => {
        MediaIsMobile.subscribe((data) => {
            isMobile = data;
        });

        PrefersReducedMotion.subscribe((data) => {
            prefersReducedMotion = data;
        });
    });

    onNavigate(() => {
        if (showMobileNav) {
            showMobileNav = false;
        }
    });
</script>
<style lang="css">
    .nav-bar {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;

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
        padding: 0;

        list-style: none;
    }

    .nav-link {
        height: 2.5rem;
        width: 8rem;
        background-color: var(--banner-accent);
        border-radius: 0.5rem;
        border: 0.1rem solid transparent;
    }

    .nav-link-mobile {
        height: 2.5rem;
        width: 16rem;
        background-color: var(--banner-accent);
        border-radius: 0.5rem;
        border: 0.1rem solid transparent;
    }

    .nav-links.animable .nav-link {
        transition: all 0.25s ease;
    }

    .nav-links.animable:hover .nav-link {
        opacity: 0.4;
        filter: grayscale(50%);
    }

    .nav-links.animable:hover .nav-link:hover {
        opacity: 1;
        filter: none;
        transform: scale(1.05);
        border: 0.1rem solid var(--color-emphasis);
    }

    .nav-link a, .nav-link-mobile a {
        display: grid;
        place-items: center;
        text-decoration: none;
        color: var(--text-standard);
        font-size: 1rem;
        height: 100%;
        width: 100%;
    }

    .toggle-nav-btn {
        height: 3rem;
        width: 3rem;
        aspect-ratio: 1 / 1;
        background-color: var(--banner-accent);
        color: whitesmoke;

        border: none;
        border-radius: 0.5rem;
        font-size: 1.75rem;
        cursor: pointer;

        display: none;
        margin: 0;
        box-shadow: 0 0 1rem rgba(17, 24, 39, 0.4);
    }

    .toggle-nav-btn.animable {
        transition: all 0.1s ease;
    }

    .toggle-nav-btn:active {
        transform: scale(0.9);
        box-shadow: 0 0 0.25rem rgba(17, 24, 39, 0.6);
    }

    .nav-links-mobile {
        position: absolute;
        display: none;
        grid-template-rows: 2fr 1fr 2fr 1fr 2fr 1fr 2fr;
        grid-template-columns: 1fr;
        box-sizing: border-box;

        width: 100%;
        max-height: 0;

        place-items: center;
        padding: 0;

        background-color: var(--banner-standard);
        list-style: none;

        visibility: hidden;
        bottom: 4rem;
        left: 0;
        margin: 0;

        overflow: hidden;
        backdrop-filter: blur(2px);
        border-radius: 0.5rem 0.5rem 0 0;
    }

    .nav-links-mobile.animable {
        transition: all 0.25s ease-in-out;
    }

    .nav-links-mobile.active, .nav-links.animable.active {
        visibility: visible;
        max-height: 24rem;
        backdrop-filter: blur(6px);
        padding: 1rem;
    }

    .link-spacer {
        display: grid;
        place-items: center;
        height: 0.5rem;
        padding: 0.25rem 0;
        margin: 0;
    }

    .link-spacer hr {
        width: 20rem;
        height: 0.1rem;
        background-color: var(--color-neutral);
        border: none;
        margin: 0;
        padding: 0;
        opacity: 0.1;
    }

    @media only screen and (max-width: 768px) {
        .nav-bar {
            position: fixed;
            height: 4rem;
            z-index: 1;
            bottom: 0;
            background-color: rgba(30, 58, 100, 0.8);
            backdrop-filter: blur(2px);
        }

        .nav-bar.animable {
            transition: backdrop-filter 0.25s ease;
        }

        .nav-bar.animable.active, .nav-bar.active {
            backdrop-filter: blur(6px);
        }

        .nav-links {
            display: none;
        }

        .spacer {
            max-height: 4rem;
        }

        .nav-links-mobile {
            display: grid;
            background-color: rgba(30, 58, 100, 0.8);
        }

        .toggle-nav-btn {
            display: block;
        }
    }

    @media (prefers-contrast: more) {
        .nav-bar {
            background-color: var(--banner-standard);
        }

        .nav-links-mobile {
            background-color: var(--banner-standard);
        }
    }

</style>
<nav class="nav-bar {prefersReducedMotion ? '' : 'animable'} {showMobileNav ? 'active' : ''}" aria-label="Website navigation">
    <div class="portrait-container">
        <a class="nav-link-home" href={SiteLinks.home}>
            <img src={DataLinks.portraitInit} alt="Portrait of Daryk Baker. Clicking returns to website homepage"/>
        </a>
    </div>
    <div class="spacer" aria-hidden="true"></div>
    <ul class="nav-links {prefersReducedMotion ? '' : 'animable'}" role="listbox" aria-hidden="{isMobile}">
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
    <button class="toggle-nav-btn {prefersReducedMotion ? '' : 'animable'}" aria-hidden="{!isMobile}" onclick={toggleMobileNav}>☰</button>
    <ul class="nav-links-mobile {prefersReducedMotion ? '' : 'animable'} {showMobileNav ? 'active' : ''}" role="listbox" aria-hidden="{!isMobile}">
        <li class="nav-link-mobile">
            <a href={SiteLinks.about}>About Me</a>
        </li>
        <li class="link-spacer">
            <hr/>
        </li>
        <li class="nav-link-mobile">
            <a href={SiteLinks.projects}>Projects</a>
        </li>
        <li class="link-spacer">
            <hr/>
        </li>
        <li class="nav-link-mobile">
            <a href={SiteLinks.contact}>Contact Me</a>
        </li>
        <li class="link-spacer">
            <hr/>
        </li>
        <li class="nav-link-mobile">
            <a href={SiteLinks.resume}>Resume</a>
        </li>
    </ul>
</nav>