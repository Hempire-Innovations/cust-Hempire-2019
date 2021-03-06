/* setviewport v1.00, by Joe Komenda (Komejo). Copyright 2013, MIT Licence.

  This script looks for a cookie, using the function readCookie().
  If it does not find it (or it is expired), it calls a modal
  window (id = agemodal). If you correctly submit the form,
  it sets the cookie 'jqverify' with the appropriate expiry.

*/
jQuery(document).ready(function() {

    var agemodal = "#agemodal",
        submit   = "#formsubmit",
        content  = "#whole-page"; //This is the entire website

    // A handy little function to erase cookies,
    // useful when testing/debugging.
    //
    //eraseCookie('jqverify');

    if (!readCookie('jqverify')) {
        // $(document).load("ageGate.html");
        jQuery(agemodal).fadeIn();
    } else {
        jQuery(content).fadeIn();
    };

    jQuery(formsubmit).on('click', function(event){
        event.preventDefault ? event.preventDefault() : event.returnValue = false;

        var day, month, year, age, remember, inputDate, standardDate;

        // Set date value
        jQuery("#day").val() ? day = jQuery("#day").val() : day = 'notset';
        jQuery("#month").val() ? month = jQuery("#month").val() : month = 'notset';
        jQuery("#year").val() ? year = jQuery("#year").val() : year = 'notset';
        
        // Set minimum age value -- country || default
        jQuery("#location").val() ? age = jQuery("#location").val() : age = 18;
        
        jQuery("#remember").is(':checked') ? remember = 'checked' : remember = false;

        inputDate = new Date();
        inputDate.setFullYear(year, month-1, day);
        standardDate = new Date();
        standardDate.setFullYear(standardDate.getFullYear() - age);

        if (day == 'notset' || month == 'notset' || year == 'notset' ) {
            alert("Please enter your birthdate.");
            return false;
        } else if (age == 99 ) {
            alert("Sorry, you're not permitted to view this site.  Check your country's age laws");
            return false;
        } else if ((standardDate - inputDate) < 0) {
            alert("Sorry, you gotta be " + age + " to enter.");
            return false;
        } else {
            if (remember) {
                createCookie('jqverify', 1, 3650); // expire in 10 years
            } else {
                createCookie('jqverify', 1, 1); // expire in a day
            };
            jQuery(agemodal).fadeOut();
            jQuery(content).fadeIn();
            jQuery(agemodal).remove();
            jQuery("#agemodal-style").remove();
            return true;
        }
    });

    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";

        console.log(name+"="+value+expires+"; path=/")
    };

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };

    function eraseCookie(name) {
        createCookie(name,"",-1);
    };

});