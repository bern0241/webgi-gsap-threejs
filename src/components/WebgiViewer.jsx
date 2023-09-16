import React, { useRef,
                useState,
                useCallback,
                forwardRef,
                useImperativeHandle,
                useEffect
     } from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    CanvasSnipperPlugin,
    addBasePlugins,
    mobileAndTabletCheck

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger);

const WebgiViewer = forwardRef((props, ref) => { // DONT NEED TO DO
    const canvasRef = useRef(null);
    const [viewerRef, setViewerRef] = useState(null);
    const [targetRef, setTargetRef] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [positionRef, setPositionRef] = useState(null);
    const canvasContainerRef = useRef(null);
    const [previewMode, setPreviewMode] = useState(false);

    useImperativeHandle(ref, () => ({
        triggerPreview() {
            setPreviewMode(true);
            canvasContainerRef.current.style.pointerEvents = "all";
            props.contentRef.current.style.opacity = "0";

            gsap.to(positionRef, {
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty();
                    cameraRef.positionTargetUpdated(true);
                }
            })
            gsap.to(targetRef, {
                x: 0.11,
                y: 0.0,
                z: 0.0,
                duration: 2
            })

            viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true });
        }
    }));

    const memoizedScrollAnimation = useCallback(
        (position, target, onUpdate) => {
            if (position && target && onUpdate) {
                scrollAnimation(position, target, onUpdate);
            }
        }, []
    )

    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        });

        setViewerRef(viewer);
    
        const manager = await viewer.addPlugin(AssetManagerPlugin)
    
        // // Add a popup(in HTML) with download progress when any asset is downloading.
        // await viewer.addPlugin(AssetManagerBasicPopupPlugin)

        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;

        setCameraRef(camera);
        setPositionRef(position);
        setTargetRef(target);
    
        // Add plugins individually.
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)
        // and many more...
    
        // or use this to add all main ones at once.
        // await addBasePlugins(viewer)
    
        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        await viewer.addPlugin(CanvasSnipperPlugin)
    
        // This must be called once after all plugins are added.
        viewer.renderer.refreshPipeline()
    
        // Import and add a GLB file.
        // await viewer.load("scene-black.glb")
        await manager.addFromPath("scene-black.glb");
        // Load an environment map if not set in the glb file
        // await viewer.setEnvironmentMap((await manager.importer!.importSinglePath<ITexture>("./assets/environment.hdr"))!);
        
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

        window.scrollTo(0,0);

        let needsUpdate = true;
        
        const onUpdate = () => {
            needsUpdate = true;
            viewer.setDirty();
        }

        viewer.addEventListener("preFrame", () => {
            if (needsUpdate) {
                camera.positionTargetUpdated(true);
                needsUpdate = false;
            }
        })

        memoizedScrollAnimation(position, target, onUpdate);
        // Add some UI for tweak and testing.
        // const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
        // Add plugins to the UI to see their settings.
        // uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)
    }, []);
    
    useEffect(() => {
        setupViewer();
    }, [])

    const handleExit = useCallback(() => {
        canvasContainerRef.current.style.pointerEvents = "none"; //CAN move camera
        props.contentRef.current.style.opacity = "1";
        viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
        setPreviewMode(false);
        gsap.to(positionRef, {
            x: 1.56,
            y: 5.0,
            z: 0.01,
            scrollTrigger: {
                trigger: '.display-section', // second section triggers animation
                start: "top bottom", //section, viewport
                end: "top top", //section, viewport
                scrub: 2, //true?
                immediateRender: false, //efficiency
            },
            onUpdate: () => {
                viewerRef.setDirty();
                cameraRef.positionTargetUpdated(true);
            }
        });
        gsap.to(targetRef, {
            x: -0.55,
            y: 0.32,
            z: 0.0,
            scrollTrigger: {
                trigger: '.display-section', // second section triggers animation
                start: "top bottom", //section, viewport
                end: "top top", //section, viewport
                scrub: 2, //true?
                immediateRender: false, //efficiency
            },
        })
    }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef]);

    return (
        <div ref={canvasContainerRef} id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef} />
            {
                previewMode && (
                    <button className="button" onClick={handleExit}>Exit</button>
                )
            }
        </div>
    );

})

export default WebgiViewer;