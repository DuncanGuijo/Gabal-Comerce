(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Adaptar zigzag de fotos
    if ($(window).width() <= 768) {
        $('.zig-zag-desktop').hide();
        $('.zig-zag-mvl').show();
    } else {
        $('.zig-zag-desktop').show();
        $('.zig-zag-mvl').hide();
    }

    $(window).resize(function() {
        if ($(window).width() <= 768) {
            $('.zig-zag-desktop').hide();
            $('.zig-zag-mvl').show();
        } else {
            $('.zig-zag-desktop').show();
            $('.zig-zag-mvl').hide();
        }
    });
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    //Submit email
    $('#correo').submit(function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
        // Mostrar un SweetAlert de confirmación
        Swal.fire({
            title: '¿Estás seguro de que quieres enviar el correo?',
            text: 'Una vez enviado, no se puede deshacer esta acción.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, enviar correo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Serializa los datos del formulario
                var formData = $(this).serialize();
    
                // Realiza una solicitud AJAX para enviar los datos al servidor
                $.ajax({
                    type: 'POST',
                    url: 'correo.php', // Ruta al archivo PHP que manejará el envío
                    data: formData,
                    success: function(response) {
                        if (response == 'ok') {
                            // Si la solicitud es exitosa, mostrar un SweetAlert de éxito
                            Swal.fire({
                                icon: 'success',
                                title: '¡Enviado!',
                                text: 'Tu formulario ha sido enviado correctamente.'
                            });
                        } else {
                            // Si hay un error en la respuesta del servidor, mostrar un SweetAlert de error
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Hubo un problema al enviar tu formulario. Por favor, inténtalo de nuevo más tarde.'
                            });
                        }
                    }
                });
            }
        });
    });
})(jQuery);
