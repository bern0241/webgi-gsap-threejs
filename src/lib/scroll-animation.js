import gsap from 'gsap';

export const scrollAnimation = (position, target, onUpdate) => {
    const tl = gsap.timeline();

    tl.to(position, {
        x: -3.38,
        y: -10.74,
        z: -5.93,
        scrollTrigger: {
            trigger: '.sound-section', // second section triggers animation
            start: "top bottom", //section, viewport
            end: "top top", //section, viewport
            scrub: 2, //true?
            immediateRender: false, //efficiency
        },
       onUpdate 
    });

    tl.to(target, {
        x: 1.52,
        y: 0.77,
        z: -1.08,
        scrollTrigger: {
            trigger: '.sound-section', // second section triggers animation
            start: "top bottom", //section, viewport
            end: "top top", //section, viewport
            scrub: 2, //true?
            immediateRender: false, //efficiency
        },
    });
}