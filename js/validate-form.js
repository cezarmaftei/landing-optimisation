$ = jQuery;
$(document).ready(function () {

    $("#form144").validate({
        rules: {
            location: {
                dif: 'event_location'
            }

        },
        errorPlacement: function (label, element) {
            label.insertAfter(element)
            //console.log(element.attr('name') +' '+element);
        },
        success: function (label) {
            label.addClass("valid");
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).parent().addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).parent().removeClass(errorClass).addClass(validClass);
        },
        onfocusout: function (element) {
            $(element).valid();
        },
        onkeyup: function (element) {
            $(element).valid();
        }
    });

    $("#form144 input").change(function () {
        $(this).valid();
    });



    $.validator.addClassRules('checkbox', {
        checkfield: true,
    });


    $.validator.addMethod('checkfield', function (value, element) {
        if ($('.checkbox').is(':checked')) {
            $('#title9').css('color', '#8b8b8b');
            return true;
        } else {
            $('#title9').css('color', 'red');
        }
    }, 'checked');

});
