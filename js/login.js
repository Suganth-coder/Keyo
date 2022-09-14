var mouse = {
    X: 0,
    Y: 0,
    CX: 0,
    CY: 0
},
    block = {
        X: mouse.X,
        Y: mouse.Y,
        CX: mouse.CX,
        CY: mouse.CY
    };
images = [
    'https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?cs=srgb&dl=night-space-dark-176851.jpg&fm=jpg',
    'https://images.pexels.com/photos/14676/pexels-photo-14676.png?cs=srgb&dl=sky-night-dark-14676.jpg&fm=jpg'
];

$('.block').on('mousemove', function (e) {
    mouse.X = (e.pageX - $(this).offset().left) - $('.block').width() / 2;
    mouse.Y = (e.pageY - $(this).offset().top) - $('.block').height() / 2;
})

$('.block').on('mouseleave', function (e) {
    mouse.X = mouse.CX;
    mouse.Y = mouse.CY;
})

setInterval(function () {

    block.CY += (mouse.Y - block.CY) / 12;
    block.CX += (mouse.X - block.CX) / 12;

    $('.block .circle2').css('bg', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)')
    $('.block').css({
        transform: 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'
    })

}, 20);

$('.card .item').each(function (i) {

    if (i == 0) {

        $(this).addClass('active');
        $(this).next().addClass('next');
        $(this).prev().addClass('prev');
    }

    $(this).attr('id', 'slide-' + i);

    $(this).prepend(
        $('<div>', { class: 'blur', style: 'background-image: url(' + images[i] + ');' }),
        $('<div>', { class: 'bg', style: 'background-image: url(' + images[i] + ');' })
    )

    $(this).find('.block').css('background-image', 'url(' + images[i] + ')')

    $('.nav .pin').append(
        $('<li>', { class: i == 0 ? 'active' : '', id: i }).on('click', function () {
            var cSlide = $('.card #slide-' + $(this).attr('id'));

            $('.nav .pin li').removeClass('active');
            $(this).addClass('active');

            $('.card .item').removeClass('active prev next');
            cSlide.addClass('active');
            cSlide.next().addClass('next');
            cSlide.prev().addClass('prev');
        })
    )
})

$(".bg").css("background-color", "yellow");