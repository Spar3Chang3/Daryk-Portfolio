<script lang="js">
    import { onMount } from 'svelte';
    import { StdSvgs, ExternalLinks } from '$lib/index.js';

    let starSvg = $state();

    onMount(() => {
        starSvg;
    })

</script>
<style lang="css">
    .project-list {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;

        height: 100%;
        width: 100%;
        box-sizing: border-box;

        align-items: center;

        list-style: none;
        gap: 1rem;
        padding: 0 2rem;
    }

    .project {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;

        list-style: none;

        background-color: var(--background-alpha);
        box-shadow: 0 0 1rem var(--shadow-color);
        padding: 2rem;
        border-radius: 1rem;
    }

    .project-name {
        padding: 0.5rem;
        background-color: var(--color-primary);
        color: var(--text-compliment);
        border-radius: 0.5rem;
    }

    .project-name small {
        background-color: var(--color-code);
        padding: 0 0.25rem;
        font-family: var(--font-special);
        color: var(--text-muted);
        font-size: 1rem;
    }

    .project-name a {
        background-color: var(--color-code);
        padding: 0 0.25rem;
        font-family: var(--font-special);
        color: var(--hyperlink);
        font-size: 1rem;
    }

    a {
        color: var(--hyperlink);
    }

    @media only screen and (max-width: 768px) {
        .project-list {
            padding: 0 1rem 1rem 1rem;
        }

        .project {
            padding: 1rem;
        }

        .project-name {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }
    }

</style>
<section class="projects page">
    <div class="heading-container" aria-label="heading">
        <h1 class="page-heading">Projects</h1>
    </div>

    <ul class="project-list" aria-label="List of projects Daryk Baker has worked on">
        <li class="project">
            <h2 class="project-name">Silhouette [<small>silhouette.band</small>]</h2>
            <p>This project was my first ever website to be commissioned for. Built in React, it serves as a milestone for my first major developer accomplishment.</p>
            <p>Unfortunately, Silhouette the band has been broken up since 2023, and the website is no longer active. For viewing, all sourcecode is available on <a href="https://github.com/Spar3Chang3/Silhouette-Website" target="_blank">GitHub</a></p>
        </li>

        <li class="project">
            <h2 class="project-name">Unthynck [<small>unthynck.band</small>]</h2>
            <p>This project is my latest website offering for the local Springfield band known as Unthynck. With a wacky name comes a wacky website, yet still with a modicum of professionalism.</p>
            <p>I am particularly proud of Unthynck.band because it features almost entirely server-fed data. This allows me to create a dashboard login for the members, where they can edit multiple data points through a convenient UI.</p>
            <p>Until recently I had actively maintained this website. However, the band has not been the same since May of 2025. Members have left and I have been asked to remove the website. Regardless, sourcecode can still be viewed on <a href="https://github.com/Spar3Chang3/Unthynck" target="_blank">GitHub</a></p>
        </li>

        <li class="project">
            <h2 class="project-name" title="In Production!!!"> {@html StdSvgs.star} Orion Lab [<a href="{ExternalLinks.orionLab}" target="_blank">uisorionlabs.web.app</a>]</h2>
            <p>This project is my current volunteer work for the Orion Lab at University of Illinois Springfield. I have developed it in tandem with Edward Anderson, a student with a passion for raw HTML. It took some convincing for him to work with the frontend framework I chose, which was once again Svelte. I find this framework to be incredibly easy to work with while staying efficient.</p>
            <p>The backend was my first foray into using Go with creation of my own in-house encryption procedure, which implements the <a href="https://en.wikipedia.org/wiki/Bcrypt" target="_blank">BCrypt standard</a>.</p>
            <p>Moreover, this website was my first real implementation of the ARIA standard, incorporating labels and roles wherever possible. Besides this current portfolio, Orion Lab is the most accessible website I have made to date. It accounts for people who prefer reduced motion, dark mode, and even higher contrast.</p>
            <p>The website is currently domain-less and will likely continue to be that way until UIS purchases the domain. However, as always the sourcecode is available on <a href="https://github.com/Spar3Chang3/Orion-Labs" target="_blank">GitHub</a>.</p>
        </li>

        <li class="project">
            <h2 class="project-name" title="In Production!!!"> {@html StdSvgs.star} Acid Fog [<a href="{ExternalLinks.acidFog}" target="_blank">acidfog.com</a>]</h2>
            <p>This project is the child of Edward Anderson, the same person who dearly helped with the development of Orion Lab. This website was almost entirely developed by him, which made me debate even including it in my projects list.</p>
            <p>But with further consideration, I would like to say that I brought control to his chaos. Edward is a brilliant mind who implements a <strong>true</strong> style, with the only caveat being his lack of file organization and up-to-date HTML best practice.</p>
            <p>This is the point where I stepped in to assist, with clearer JavaScript and smoother animations. The key pages I developed include the #Articles, #Trivia, and #Events, populating them with JSON-data which allowed for easy dynamic distribution. Additionally, the navigation bar was updated as a JavaScript component for object-oriented goals such as reuse across his entire website.</p>
            <p>I highly encourage you to check out his website via the link in the banner, or view his sourcecode on <a href="https://github.com/MadMan247/afsite/" target="_blank">GitHub</a></p>
        </li>
    </ul>
</section>