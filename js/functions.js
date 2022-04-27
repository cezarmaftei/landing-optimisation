$ = jQuery;

$(document).ready(function () {


    $('.product_carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000
    });

    $('.section_product_slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        dots: true,
        appendArrows: '.arrows_wr_one',
        appendDots: '.arrows_dots_one'
    });

    $('.section_product_slider_mirror').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        dots: true,
        appendArrows: '.arrows_wr_two',
        appendDots: '.arrows_dots_two'
    });

    $('.organisations_holder').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.faq_question').click(function (e) {
        if (!$(this).parents('.faq_row').hasClass('faq_active')) {
            $('.faq_row').removeClass('faq_active');
            $('.faq_answer').slideUp(500);
        }
        $(this).parents('.faq_row').toggleClass('faq_active');
        $(this).parents('.faq_row').find('.faq_answer').slideToggle(500);

        //jQuery('html, body').animate({scrollTop:$(this).parents('.faq_row').offset().top}, 400);
    });

    $('.pop').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //    Stop popup scrolling
    $('.pop').on('click', function (e) {
        e.stopPropagation();
    });


});
