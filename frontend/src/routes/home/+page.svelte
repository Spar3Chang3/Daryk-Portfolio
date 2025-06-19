<script lang="js">
    import { onMount } from 'svelte';
    import { DataLinks, SiteLinks } from '$lib/index.js';

    const PORTRAIT_WIDTH = 220;
    const PORTRAIT_HEIGHT = 170;
    const TOTAL_FRAMES = 21;

    let portraitCanvas = $state();
    let staticDataTop = $state();
    let staticDataBottom = $state();
    let dynamicData = $state([]);
    let dynamicDataStart = $state();
    let dynamicDataEnd = $state();
    let dynamicFrameHeight = $state();

    let dynamicDataFrames = $state([]);
    let dynamicDataParsed = $state();

    let handleMouseMoveCallback = $state((e) => e.preventDefault());

    function convertRGBtoRGBA(flatRGBArray) {
        const rgbaArray = [];
        for (let i = 0; i < flatRGBArray.length; i += 3) {
            rgbaArray.push(flatRGBArray[i]);     // R
            rgbaArray.push(flatRGBArray[i + 1]); // G
            rgbaArray.push(flatRGBArray[i + 2]); // B
            rgbaArray.push(255);                 // A
        }
        return rgbaArray;
    }

    onMount(async () => {
        document.getElementById('header').style.display = 'none';
        document.getElementById('footer').style.display = 'none';

        const ctx = portraitCanvas.getContext('2d');
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

                ctx.putImageData(top, 0, 0);
                ctx.putImageData(bottom, 0, dynamicDataEnd+1);
                (dynamicDataEnd - dynamicDataStart + 1)
                dynamicFrameHeight = (dynamicDataEnd - dynamicDataStart + 1);

                dynamicDataFrames = dynamicData.map((frameData) => {
                    const frameBlock = convertRGBtoRGBA(frameData);
                    const frame = ctx.createImageData(PORTRAIT_WIDTH, dynamicFrameHeight);
                    frame.data.set(frameBlock);
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
            const normalized = e.clientY / window.innerHeight;
            const frame = Math.floor(normalized * (TOTAL_FRAMES - 1));
            drawMouth(frame);
        }

        const handleMouseMoveTmp = (e) => {
            e.preventDefault();
            const rect = portraitCanvas.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const offsetX = e.clientX - centerX;
            const offsetY = e.clientY - centerY;

            // Invert the multipliers to rotate towards the mouse
            let rotateX = (offsetY / rect.height) * 20;   // top-bottom tilt
            let rotateY = (offsetX / rect.width) * -20;  // left-right tilt

            // This clamping can be adjusted if you want a different range of motion
            rotateX = Math.max(Math.min(rotateX, 30), -30);
            rotateY = Math.max(Math.min(rotateY, 30), -30);

            // Ensure the transform string is correctly formatted
            portraitCanvas.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        initPortrait.src = DataLinks.portraitInit;
        initPortrait.onload = async () => {
            ctx.drawImage(initPortrait, 0, 0);

            // await dynamicDataParsed.then(res => {
            //     handleMouseMoveCallback = handleMouseMove;
            //     drawMouth(0);
            // }).catch(err => {
            //     console.error(err.message);
            // });

            handleMouseMoveCallback = handleMouseMoveTmp;
        }
    });
</script>

<style lang="css">
    .home {
        justify-content: center;
    }

    .focal-screen-one {
        display: flex;
        flex-direction: column;

        height: 100%;
        width: 100%;

        justify-content: center;
        align-items: center;
        gap: 1rem;

        overflow: hidden;
    }

    .portrait {
        height: 170px;
        width: 220px;

        perspective: 800px;
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

        height: 3rem;
        width: 8rem;
        padding: 0.5rem;

        text-align: center;
        text-decoration: none;
        color: var(--hyperlink);
        background-color: var(--background-secondary);
        border: 0.1rem solid var(--hyperlink);
        border-radius: 1rem;
    }
</style>

<section class="home page">
    <div class="focal-screen-one" aria-roledescription="Track mouse for visual effect on portrait" onmousemove={handleMouseMoveCallback} role="complementary">
        <canvas class="portrait" aria-label="Portrait of Daryk Baker, website developer" bind:this={portraitCanvas} height={PORTRAIT_HEIGHT} width={PORTRAIT_WIDTH}></canvas>
        <div class="heading-content">
            <h1 class="portfolio-name">Daryk Baker</h1>
            <h2 class="portfolio-heading">A next generation JavaScript developer</h2>
            <span class="portfolio-subtext">Inclusive to all, dynamic with detail, and passionate about</span>
        </div>
        <div class="navigation">
            <a class="nav-link" href={SiteLinks.about}>About Me</a>
            <a class="nav-link" href={SiteLinks.projects}>Projects</a>
            <a class="nav-link" href={SiteLinks.contact}>Contact Me</a>
            <a class="nav-link" href={SiteLinks.resume}>View Resume</a>
        </div>
    </div>
</section>