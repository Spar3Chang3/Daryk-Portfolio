<script lang="js">
    import { onMount } from 'svelte';
    import { onNavigate } from '$app/navigation';
    import { DataLinks, SiteLinks, PrefersReducedMotion } from '$lib/index.js';

    const PORTRAIT_WIDTH = 220;
    const PORTRAIT_HEIGHT = 170;
    const TOTAL_FRAMES = 21;

    let prefersReducedMotion = $state();

    let portraitCanvas = $state();
    let portraitStatic = $state();
    let canvasContainer = $state();
    let staticDataTop = $state();
    let staticDataBottom = $state();
    let dynamicData = $state([]);
    let dynamicDataStart = $state();
    let dynamicDataEnd = $state();
    let dynamicFrameHeight = $state();

    let dynamicDataFrames = $state([]);
    let dynamicDataParsed = $state();

    let handleMouseMoveCallback = $state((e) => e.preventDefault());
    let portraitRect = $state({rect: 0, centerX: 0, centerY: 0}); // Need to set these outside cursor so that it can't invert based on cursor whenever it's INSIDE the portrait - didn't work lmao

    onMount(async () => {
        document.getElementById('header').style.display = 'none';
        document.getElementById('footer').style.display = 'none';

        // Never know if the user gets headaches easily or just really hates animations :3
        PrefersReducedMotion.subscribe((data) => {
            prefersReducedMotion = data;
        });

        const ctx = portraitCanvas.getContext('2d');
        const stx = portraitStatic.getContext('2d');
        const initPortrait = new Image();

        dynamicDataParsed = new Promise((resolve, reject) => {
            fetch(DataLinks.portraitMap).then(data => data.json()).then(json => {
                staticDataTop = new Uint8ClampedArray(json.staticDataTop);
                staticDataBottom = new Uint8ClampedArray(json.staticDataBottom);
                dynamicData = json.dynamicData.map(frameArr => new Uint8ClampedArray(frameArr));
                dynamicDataStart = json.dynamicDataStart;
                dynamicDataEnd = json.dynamicDataEnd;
            }).then(() => {
                const top = ctx.createImageData(PORTRAIT_WIDTH, dynamicDataStart-1);
                top.data.set(staticDataTop);
                const bottom = ctx.createImageData(PORTRAIT_WIDTH, (PORTRAIT_HEIGHT - dynamicDataEnd + 1));
                bottom.data.set(staticDataBottom)

                stx.putImageData(top, 0, 0);
                stx.putImageData(bottom, 0, dynamicDataEnd+1);
                (dynamicDataEnd - dynamicDataStart + 1)
                dynamicFrameHeight = (dynamicDataEnd - dynamicDataStart);

                dynamicDataFrames = dynamicData.map((frameData) => {
                    const frame = ctx.createImageData(PORTRAIT_WIDTH, dynamicFrameHeight);
                    frame.data.set(frameData);
                    return frame;
                });
            }).then(() => {
                resolve();
            }).catch((err) => reject(err));
        });

        const drawMouth = (index) => {
            if (!dynamicDataFrames[index]) return;

            ctx.clearRect(0, dynamicDataStart, PORTRAIT_WIDTH, dynamicFrameHeight);
            ctx.putImageData(dynamicDataFrames[index], 0, dynamicDataStart);
        }

        const handleMouseMove = (e) => {
            e.preventDefault();

            // Normalize cursor for half the screen and draw inverse of frames
            // Because it starts smiling to not smiling, so gotta do the opposite
            const normalized = e.clientY / (window.innerHeight * 0.5);
            const frame = Math.floor(normalized * (TOTAL_FRAMES - 1)); // -1 for forgoing initial
            drawMouth(TOTAL_FRAMES - frame);

            const offsetX = e.clientX - portraitRect.centerX;
            const offsetY = e.clientY - portraitRect.centerY;

            // TODO: implement a way to return the image rotation to 0 if the cursor enters its bounding box

            // Invert the multipliers to rotate towards the mouse
            let rotateX = (offsetY / portraitRect.rect.height) * 20;   // top-bottom tilt
            let rotateY = (offsetX / portraitRect.rect.width) * -20;  // left-right tilt

            // This clamping can be adjusted if you want a different range of motion
            rotateX = Math.max(Math.min(rotateX, 30), -30);
            rotateY = Math.max(Math.min(rotateY, 30), -30);

            canvasContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        initPortrait.src = DataLinks.portraitInit;
        initPortrait.onload = async () => {
            ctx.drawImage(initPortrait, 0, 0);

            await dynamicDataParsed.then(res => {
                handleMouseMoveCallback = handleMouseMove;
                drawMouth(0);
            }).catch(err => {
                console.error(err.message);
            });

            // Get initial bounds for where to offset center from rect
            const rect = portraitCanvas.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Apply those LOL what else would I have it for like are you crazy? I'm surprised you're still reading my comments. They're only going to get worse the more pages you visit.
            portraitRect = { rect, centerX, centerY };

        }

    });

    onNavigate(() => {
        document.getElementById('header').style.display = 'flex';
        document.getElementById('footer').style.display = 'flex';
    });
</script>

<style lang="css">
    .home {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }

    .focal-screen-one {
        display: flex;
        flex-direction: column;

        height: 100%;
        width: 100%;

        justify-content: center;
        align-items: center;

        overflow: hidden;
    }

    .content-container {
        display: flex;
        flex-direction: column;

        height: fit-content;
        width: fit-content;

        justify-content: center;
        align-items: center;
        gap: 1rem;

        backdrop-filter: blur(2px);
        background-color: rgba(30, 58, 100, 0.35);
        box-shadow: 0 0 1rem rgba(17, 24, 39, 0.4);
        border-radius: 1rem;
        padding: 2rem;
    }

    .portrait-container {
        position: relative;
        height: 170px;
        width: 220px;

        perspective: 800px;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .portrait {
        position: absolute;
        height: 170px;
        width: 220px;
    }

    .portfolio-name {
        font-family: var(--font-special);
    }

    .navigation {
        display: flex;
        flex-direction: row;

        height: 100%;
        width: 100%;
        flex: 0;

        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 4rem;
    }

    .navigation .nav-link {
        display: grid;
        place-items: center;

        height: 2.5rem;
        width: 8rem;
        padding: 0.5rem;

        text-align: center;
        text-decoration: none;
        color: whitesmoke;
        background-color: var(--banner-accent);
        border-radius: 0.5rem;
        border: 0.1rem solid transparent;
    }

    .navigation.animable .nav-link {
        transition: all 0.25s ease;
    }

    .navigation.animable:hover .nav-link {
        opacity: 0.4;
        filter: grayscale(50%);
    }

    .navigation.animable:hover .nav-link:hover {
        opacity: 1;
        filter: none;
        transform: scale(1.05);
        border: 0.1rem solid var(--color-emphasis);
    }
</style>

<section class="home">
    <div class="focal-screen-one" aria-roledescription="Track mouse for visual effect on portrait" onmousemove={handleMouseMoveCallback} role="complementary">
        <div class="content-container">
            <div class="portrait-container" bind:this={canvasContainer}>
                <canvas class="portrait" aria-label="Portrait of Daryk Baker, website developer" bind:this={portraitCanvas} height={PORTRAIT_HEIGHT} width={PORTRAIT_WIDTH}></canvas>
                <canvas class="portriat" aria-hidden="true" bind:this={portraitStatic} height={PORTRAIT_HEIGHT} width={PORTRAIT_WIDTH}></canvas>
            </div>
            <div class="heading-content">
                <h1 class="portfolio-name">Daryk Baker</h1>
                <h2 class="portfolio-heading">A next generation JavaScript developer</h2>
                <span class="portfolio-subtext">Inclusive to all, dynamic with detail, and passionate about <strong>creating what's next.</strong></span>
            </div>
            <div class="navigation {prefersReducedMotion ? '' : 'animable'}">
                <a class="nav-link" href={SiteLinks.about}>About Me</a>
                <a class="nav-link" href={SiteLinks.projects}>Projects</a>
                <a class="nav-link" href={SiteLinks.contact}>Contact Me</a>
                <a class="nav-link" href={SiteLinks.resume}>View Resume</a>
            </div>
        </div>
    </div>
</section>