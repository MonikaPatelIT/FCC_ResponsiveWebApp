(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 80
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#nav-bar",
        offset: 80
    });
})(jQuery); // End of use strict

//Navigate to product list
$("#checkout").click(function () {
    $("html,body").animate(
        { scrollTop: $("#Product").offset().top - 80 },
        "slow"
    );
});

$(".navbar-brand").click(function () {
    $("html,body").animate({ scrollTop: $("#header").offset().top - 80 }, "slow");
});
/* slide toggle cart details */
$(".cart").on("click", function (e) {
    $("#cart-items").slideToggle(); // onn basckaet click show
    e.stopPropagation();
});

//Slide cart-items up when click out side cart-items div
$(document).click(function () {
    $('#cart-items').slideUp();
});

/*Add to cart effect Reference from https://codepen.io/elmahdim/pen/tEeDn */

$(".add-to-cart").on("click", function () {
    var cart = $(".shopping-cart");

    var imgtodrag = $(this)
        .closest(".item")
        .find("img")
        .eq(0);

    if (imgtodrag) {
        var imgclone = imgtodrag
            .clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                opacity: "0.7",
                position: "absolute",
                height: "150px",
                width: "150px",
                "z-index": "1033"
            })
            .appendTo($("body"))
            .animate(
            {
                top: cart.offset().top,
                left: cart.offset().left,
                width: 50,
                height: 50
            },
            1000,
            "easeInOutExpo",
              function() {

          //number of items in basket

          $("#items-basket")

            .text($("#list-item").children().length)

            .css("display", "table");

          $("#emptyCart").css("display", "none");

        }
            );
             imgclone.animate(
            {
                width: 0,
                height: 0
            },
            function () {
                $(this).detach();
            }
        );
    }

    //add items to basket
    $("#cart-items").slideUp();
    $(this).each(function () {
        var name = $(this)
            .parents(".item")
            .find(".product-name")
            .text();
        var price =
            "<span class='eachPrice'>" +
            $(this)
                .parents(".item")
                .find(".product-price")
                .text() +
            "</span>";

        var remove = "<span class='remove'> <i class='fas fa-times-circle'></i> </span>";
        $("#list-item").append(
            "<li>" +
            name +
            "&#09; - &#09;" +
            price +
            "&#09; - &#09;" +
            remove +
            "</li>"
        );
        //number of items in basket
       /* $("#items-basket")
            .text($("#list-item").children().length)
            .css("display", "table");
        $("#emptyCart").css("display", "none");*/
    });
    /* Calculate total price for cart items list*/
    var totalPrice = 0;
    $(".eachPrice").each(function () {
        var pricePerItem = parseFloat(
            $(this)
                .text()
                .replace("$", "")
        );
        totalPrice += pricePerItem;
    });

    $("#total-price").text("$" + totalPrice);

    //remove item from basket
    $(".remove").on("click", function (e) {
        $(this)
            .parent()
            .remove();
        // Re -Calculate total of the exisitng items
        var totalPrice = 0;
        $(".eachPrice").each(function () {
            var pricePerItem = parseFloat(
                $(this)
                    .text()
                    .replace("$", "")
            );
            totalPrice += pricePerItem;
        });

        $("#total-price").text("$" + totalPrice);

        //Change text for emapty cart 

        var totalItem = $("#list-item").children().length;
        if (totalItem > 0) {
            $("#items-basket")
                .text(totalItem)
                .css("display", "table");
        } else {
            $("#items-basket").css("display", "none");
            $("#emptyCart").css("display", "block");
        }
      
      e.stopPropagation();
    });
});