<script lang="js">
    let { children } = $props();
</script>
<style lang="css">
    :global(.article-container) {
        display: flex;
        flex-direction: column;
        flex: 1;

        align-items: center;
        justify-content: center;
        padding: 0 2rem;
    }
</style>
<header>

</header>
<section class="blog-master page">
    {@render children()}
</section>