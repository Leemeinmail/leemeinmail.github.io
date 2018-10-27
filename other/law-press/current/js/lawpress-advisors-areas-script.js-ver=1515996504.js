jQuery(".advisors.home-concept-one").owlCarousel({
    nav: false,
    dots: true,
    //loop: false,
    rewind: true,
    autoplay: true,
    autoplayTimeout: 5000,
    margin: 28,
    responsive:{
        0:{ items:1 },
        321:{ items:1 },
        480:{ items:2 },
        768:{ items:2 },
        992:{ items:2 },
        1200:{ items:2 }
    }
});
jQuery(".advisors.home-concept-two").owlCarousel({
    nav: false,
    dots: true,
    //loop: false,
    rewind: true,
    autoplay: true,
    autoplayTimeout: 5000,
    margin: 28,
    responsive:{
        0:{ items:1 },
        321:{ items:1 },
        480:{ items:2 },
        768:{ items:2 },
        992:{ items:3 },
        1200:{ items:3 }
    }
});