<script lang="js">
    import { onMount } from 'svelte';
    import DOMPurify from 'dompurify';
    import { DataLinks, StdSvgs } from '$lib/index.js';
    import Loader from '$lib/components/layout/Loader.svelte';
    import '$lib/components/blog/blogstyle.css';

    const NOT_FOUND = '404';
    const ERROR_MESSAGE = `We couldn't get that article for you, it either does not, or no longer, exists...`;

    let articleHtml = $state();
    let articleJson = $state();
    let articleComments = $state();
    let articleCommentsCount = $state();

    let articleLoaded = $state(false);

    async function fetchArticleMeta(id) {
        return await fetch(`${DataLinks.blogMetaPath}${id}.json`);
    }

    async function fetchArticle(link) {
        return await fetch(`${DataLinks.blogArticlePath}${link}`);
    }

    function fetchQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || NOT_FOUND;
    }

    function sanitizeContent(content) {
        return DOMPurify.sanitize(content);
    }

    onMount(async () => {
        const articleId = fetchQuery();
        if (articleId === NOT_FOUND) {
            articleHtml = `${StdSvgs.warning}<h1>•</h1><h2> ${ERROR_MESSAGE}</h2>`;
        } else {
            try {
                articleJson = await fetchArticleMeta(articleId).then(data => data.json());

                if (!articleJson.articleLink) {
                    throw new Error(404);
                }

                const dirtyArticle = await fetchArticle(articleJson.articleLink).then(data => data.text());
                // This part is reasonably unnecessary, but it doesn't hurt by any means
                articleHtml = sanitizeContent(dirtyArticle);

                articleCommentsCount = articleJson.commentCount;
                articleComments = articleJson.comments;
                // TODO: sanitize the comments too lmao, and like, build the comment components ( ͡ ° ͜ʖ ͡ °)

                articleLoaded = true;
            } catch (error) {
                articleHtml = `${StdSvgs} <h2></h2><h1>&nbsp;•&nbsp;</h1><h2>${ERROR_MESSAGE}</h2>`;
            }
        }
    });

</script>
<style lang="css">
    article {
        display: flex;
        flex-direction: column;

        align-items: center;
        background-color: rgba(30, 58, 100, 0.35);
        box-shadow: 0 0 1rem rgba(17, 24, 39, 0.4);
        padding: 2rem;
        border-radius: 1rem;
    }
</style>
<div class="article-container">

    {#if articleLoaded}
        <article>
            {@html articleHtml}
        </article>

        <hr/>

        <div class="comments">
            {#if articleCommentsCount > 0}
                {#each articleComments as comment}
                {/each}
            {:else}
                <p>Nothing to see here, be the first to comment!</p>
            {/if}
        </div>
    {:else}
        <article>
            <Loader />
        </article>
    {/if}
</div>