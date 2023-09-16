import gsap from 'gsap';

export const scrollAnimation = (position, target, onUpdate) => {
    const tl = gsap.timeline();

    // SOUND SECTION
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
    })
    .to('.jumbotron-section', {
        opacity: 0,
        scrollTrigger: {
            trigger: '.sound-section', // second section triggers animation
            start: "top bottom", //section, viewport
            end: "top top", //section, viewport
            scrub: 2, //true?
            immediateRender: false, //efficiency
        },
    })
    .to('.sound-section-content', {
        opacity: 1,
        scrollTrigger: {
            trigger: '.sound-section', // second section triggers animation
            start: "top bottom", //section, viewport
            end: "top top", //section, viewport
            scrub: 2, //true?
            immediateRender: false, //efficiency
        },
    });

    // DISPLAY SECTION
    tl.to(position, {
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
       onUpdate 
    });
    tl.to(target, {
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
    .to('.display-section', {
        opacity: 1,
        scrollTrigger: {
            trigger: '.display-section', // second section triggers animation
            start: "top bottom", //section, viewport
            end: "top top", //section, viewport
            scrub: 2, //true?
            immediateRender: false, //efficiency
        },
    });
}