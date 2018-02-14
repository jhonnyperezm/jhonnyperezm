$(function() {
	$("#experience").hide();
	$("#services").hide();
	$("#skills").hide();
	$("#contact").hide();

	$(".espera").hide();
	$(".error").hide();
	$(".success").hide();

	FastClick.attach(document.body);
	$('#timeline').verticalTimeline({
	    startLeft: false,
	    alternate: true,
	    animate: "fade",
	    arrows: true
	});

	$('.clientes').slick({
	  dots: true,
	  infinite: false,
	  speed: 300,
	  autoplay:true,
	  slidesToShow: 5,
	  slidesToScroll: 5,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	    // You can unslick at a given breakpoint now by adding:
	    // settings: "unslick"
	    // instead of a settings object
	  ]
	});

	$('#formContacto').bootstrapValidator({
		framework: 'bootstrap',
        feedbackIcons: {
            valid: 'fa fa-check',
            invalid: 'fa fa-close',
            validating: 'fa fa-spinner'
        },
        err: {
            container: 'tooltip'
        },
        fields: {
            nombre: {
            	row: '.control',
                message: 'Este campo no puede estar vacio',
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacio'
                    }
                }
            },
            email: {
                message: 'Este campo no puede estar vacio',
                validators: {
                    notEmpty: {
                        message: 'Este campo no puede estar vacio'
                    },
                    email: {
                        message: 'No es mail válido'
                    }
                }
            },
            comentarios: {
                message: 'Este campo no puede estar vacio',
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione una hora'
                    }
                }
            }
        }
    });

	$("#formContacto").on('success.form.bv', function(e) {
        e.preventDefault();
        var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');  
        var srt = $form.serialize();
        $.ajax({
			beforeSend:function(){
				$(".btnEnviar").hide();
				$(".espera").show();
			},
			url: "inc/mail.php",
			type: "POST",
			data:srt,
			dataType: 'json',
			success: function(response){
				if(response.Result == true){
					$(".btnEnviar").show();
					$(".espera").hide();
					$(".success").show();
					$("#formContacto").data('bootstrapValidator').resetForm();
					$("#nombre").val();
					$("#email").val();
					$("#comentarios").val();
					setTimeout(function(){ $(".success").hide("hide"); }, 3000);	
				}else{
					$(".btnEnviar").show();
					$(".espera").hide();
					$(".error").show();
				}
			},
			error: function(){
				$(".error").show();
				$(".btnEnviar").show();
				$(".espera").hide();
			}
		});
    });

	$(".experience").on('click', function(e){
		e.preventDefault();
		$("#about").slideUp();
		$("#services").slideUp();
		$("#skills").slideUp();
		$("#contact").fadeOut();
		$('#experience').animateCSS("fadeIn");
	});

	$(".about").on('click', function(e){
		e.preventDefault();
		$("#experience").slideUp();
		$("#services").slideUp();
		$("#skills").slideUp();
		$("#contact").fadeOut();
		$('#about').animateCSS("flipInY");
	});

	$(".servicios").on('click', function(e){
		e.preventDefault();
		$("#experience").slideUp();
		$("#skills").slideUp();
		$("#contact").fadeOut();
		$("#about").fadeOut();
		$('#services').animateCSS("zoomIn");
	});

	$(".skills").on('click', function(e){
		e.preventDefault();
		$("#experience").slideUp();
		$("#services").slideUp();
		$("#contact").fadeOut();
		$("#about").fadeOut();
		$('#skills').animateCSS("fadeInRight");
		jQuery('.skillbar').each(function(){
			jQuery(this).find('.skillbar-bar').animate({
				width:jQuery(this).attr('data-percent')
			},3000);
		});
	});

	$(".contact").on('click', function(e){
		e.preventDefault();
		$("#experience").slideUp();
		$("#skills").slideUp();
		$("#services").fadeOut();
		$("#about").fadeOut();
		$('#contact').animateCSS("tada");
	});

	$(".about").click();

});
