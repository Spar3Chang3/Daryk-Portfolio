<script lang="js">
    import { onMount } from 'svelte';
    import { ExternalLinks } from '$lib/index.js';

    let organizationInput = $state();
    let emailInput = $state();
    let messageInput = $state();

    function handleSubmit(e) {
        e.preventDefault();
    }

</script>
<style lang="css">
    .contact-content {
        display: flex;
        flex-direction: column;
        flex: 1;

        width: 100%;

        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        padding: 0 2rem;
        gap: 1rem;
    }

    .contact-message {
        display: flex;
        flex-direction: column;

        width: 100%;

        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        padding: 2rem;

        background-color: rgba(30, 58, 100, 0.35);
        box-shadow: 0 0 1rem rgba(17, 24, 39, 0.4);
        border-radius: 1rem;
    }

    .contact-message p {
        font-size: 1.75rem;
        line-height: 2.5rem;
    }

    .contact-message a {
        color: var(--hyperlink);
    }

    .message-entry {
        display: flex;
        flex-direction: column;

        width: 100%;

        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        padding: 2rem;
        background-color: rgba(30, 58, 100, 0.35);
        box-shadow: 0 0 1rem rgba(17, 24, 39, 0.4);
        border-radius: 1rem;
        gap: 1rem;
    }

    .message-entry h2 {
        width: 30rem;
        padding: 0.5rem;
        background-color: var(--color-primary);
        color: var(--text-standard);
        border-radius: 0.5rem;
    }

    label {
        width: 30rem;
        text-align: left;
        font-size: 1rem;
        margin-bottom: -1rem; /* dumb but works */
        font-family: var(--font-special);
    }

    input[type=text], input[type=email] {
        width: 30rem;
        height: 1.5rem;
        padding: 0.5rem;
        background-color: var(--background-secondary);
        border: 0.1rem solid var(--color-neutral-dark);
        border-radius: 0.5rem;
        color: white;
        font-size: 1.2rem;
    }

    textarea {
        width: 30rem;
        min-height: 12rem;
        padding: 0.5rem;
        background-color: var(--background-secondary);
        border: 0.1rem solid var(--color-neutral-dark);
        border-radius: 0.5rem;
        color: white;
        font-size: 1.2rem;
    }

    input:focus, input:active, textarea:focus, textarea:active {
        border: 0.1rem solid var(--color-secondary);
    }

    @media only screen and (max-width: 768px) {
        .contact-content {
            padding: 0 1rem;
            margin-bottom: 2rem;
        }

        .contact-message {
            padding: 1rem;
        }

        .contact-message p {
            font-size: 1rem;
            line-height: var(--line-height-standard);
        }

        .message-entry {
            padding: 1rem;
        }

        .message-entry h2 {
            width: 100%;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        label {
            width: 100%;
        }

        input[type=text], input[type=email], textarea {
            width: 100%;
            font-size: 1rem;
        }
    }

</style>
<section class="contact page">
    <div class="heading-container">
        <h1 class="page-heading">Contact Me</h1>
    </div>
    <div class="contact-content">
        <div class="contact-message">
            <p>The best way to contact me directly is through <a href="{ExternalLinks.email}">email</a>, however, you may leave a contact message below with your email and I will later respond with my professional email within 2 business days.</p>
        </div>
        <form class="message-entry" onsubmit={handleSubmit}>
            <h2>Message Me</h2>

            <label for="oranization-entry">Organization</label>
            <input type="text" id="organization-entry" aria-labelledby="organization-entry" placeholder="Your Company INC" bind:value={organizationInput} />

            <label for="email-entry">Email</label>
            <input type="email" id="email-entry" aria-labelledby="email-entry" placeholder="example@gmail.com" bind:value={emailInput} />

            <label for="message-entry">Message</label>
            <textarea id="message-entry" aria-labelledby="message-entry" placeholder="Hello! I'm interested in speaking to you about a job offer..." bind:value={messageInput}></textarea>
        </form>
    </div>
</section>