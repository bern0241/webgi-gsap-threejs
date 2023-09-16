import gsap from 'gsap';

export const scrollAnimation = (position, target, isMobile, onUpdate) => {
    const tl = gsap.timeline();

    // SOUND SECTION
    tl.to(position, {
        x: !isMobile ? -3.38 : -7.0, //First values are DESKTOP
        y: !isMobile ? -10.74 : -12.2,
        z: !isMobile ? -5.93 : -6.0,
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
        x: !isMobile ? 1.52 : 0.7,
        y: !isMobile ? 0.77 : 1.9,
        z: !isMobile ? -1.08 : 0.7,
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
        x:!isMobile ? 1.56 : 9.36,
        y: !isMobile ? 5.0 : 10.95,
        z: !isMobile ? 0.01 : 0.09,
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
        x: !isMobile ? -0.55 : -1.62,
        y: !isMobile ? 0.32 : 0.02,
        z: !isMobile ? 0.0 : -0.06,
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