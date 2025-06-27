<script lang="js">
    import { onMount } from 'svelte';
    import { DataLinks } from '$lib/index.js';

    let parsedBlocks = $state([]);

    async function fetchAndParseText() {

        await fetch(DataLinks.aboutMe).then((res) => {
            return res.text();
        }).then((data) => {
            const blocks = data.split(/\n\s*\n/).filter(block => block);

            parsedBlocks = blocks.map(block => {
               const trimmedBlock = block.trim();

               if (trimmedBlock.startsWith('| ')) {
                   return { type: 'h2', content: trimmedBlock.substring(2) } // 2 gets rid of the initial '| '
               }
               if (trimmedBlock.startsWith('> ')) {
                   return { type: 'blockquote', content: trimmedBlock.substring(2) }; // 2 gets rid of the initial '> '
               }
               return { type: 'p', content: trimmedBlock }
            });
        });
    }


    onMount(async () => {
        await fetchAndParseText();
    });
</script>
<style lang="css">
    .parsed-text {
        display: flex;
        flex-direction: column;

        justify-content: center;
        padding: 0 4rem;
    }

    .parsed-text h2 {
        padding: 0.5rem;
        background-color: var(--color-primary);
        color: var(--text-standard);
        border-radius: 0.5rem;
    }

    .parsed-text blockquote {
        border-left: 0.25rem solid var(--color-secondary);
        padding-left: 1rem;
        font-size: 1.5rem;
        font-style: italic;
    }

    .parsed-text p {
        font-size: 1.2rem;
    }
</style>
<section class="about page">
    <div class="heading-container" aria-label="heading">
        <h1 class="page-heading">About Me</h1>
    </div>

    <div class="parsed-text">
        {#each parsedBlocks as block}
            {#if block.type === 'h2'}
                <h2>{block.content}</h2>
            {:else if block.type === 'blockquote'}
                <blockquote>{block.content}</blockquote>
            {:else}
                <p>{block.content}</p>
            {/if}
        {/each}
    </div>
</section>