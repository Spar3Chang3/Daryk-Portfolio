<style lang="css">
    .load-container {
        display: grid;

        height: 100%;
        width: 100%;

        place-items: center;
    }

    .loader {
        width: 6rem;
        height: 6rem;
        stroke: #0073e6;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

</style>
<div class="load-container" role="status" aria-live="polite" aria-label="Loading content">
    <svg
            class="loader"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
    >
        <circle
                cx="25"
                cy="25"
                r="20"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="90 150"
        />
    </svg>
</div>
