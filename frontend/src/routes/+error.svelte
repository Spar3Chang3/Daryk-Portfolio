<script lang="js">
    import { page } from '$app/state';
    import { StdSvgs } from '$lib/index.js';
</script>

<style lang="css">
    .error {
        display: flex;
        flex-direction: column;
        flex: 1;

        height: 100%;
        width: 100%;

        justify-content: center;
        align-items: center;
        text-align: center;

        font-family: var(--font-special);
        color: var(--text-standard);
    }

    .error-content {
        display: flex;
        flex-direction: row;
        width: fit-content;

        font-size: 2rem;
        animation: glitch .5s infinite alternate;
    }

    .error-symbol {
        height: 16rem;
        width: 16rem;
        aspect-ratio: 1 / 1;
    }
</style>

<section class="error page">
    <div class="error-symbol">
        {@html StdSvgs.warning}
    </div>
    <div class="error-content">
        <h2>{page.status}</h2>
        <h1>&nbsp;•&nbsp;</h1>
        <h2>{page.error.message}</h2>
    </div>
</section>