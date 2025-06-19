<script lang="js">
    import { onMount } from 'svelte';
    import { DataLinks } from '$lib/index.js';

    let parsedBlocks = $state([]);

    async function fetchAndParseText() {

        await fetch(DataLinks.aboutMe).then((res) => {
            return res.text();
        }).then((data) => {
            const blocks = data.split(/\n\s*\n/).filter(block => block);
            let isFirstBlock = true;

            parsedBlocks = blocks.map(block => {
               const trimmedBlock = block.trim();

               if (isFirstBlock) {
                   isFirstBlock = false;
                   return { type: 'h1', content: trimmedBlock };
               }
               if (trimmedBlock.startsWith('> ')) {
                   return { type: 'blockquote', content: trimmedBlock.substring(2) }; //2 gets rid of the initial '> '
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
        padding: 0 2rem;
    }

    .parsed-text h1 {
        background: var(--background-secondary);
        padding: 1rem;
        font-family: var(--font-special);
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
    <div class="parsed-text">
        {#each parsedBlocks as block}
            {#if block.type === 'h1'}
                <h1>{block.content}</h1>
            {:else if block.type === 'blockquote'}
                <blockquote>{block.content}</blockquote>
            {:else}
                <p>{block.content}</p>
            {/if}
        {/each}
    </div>
</section>