$(function () {
  var code;
  $("#omileni").hide();

  $(document).on("click", "#navlist li", function () {
    $("#omileni").show();
    $("#navlist li").removeClass("current");
    $(this).addClass("current");
    $("#stores").html("");
    console.log($(this).attr("id"));
    code = $(this).attr("id");

    $.ajax({
      url: "https://" + code + ".herokuapp.com/store_data",
      dataType: "json",
      success: function (data) {
        console.log(data);
        $.each(data.objects.stores, function (i, store) {
          $("#stores").append(
            "<li>" +
              "Name: " +
              store.storeName +
              "<br>" +
              " Region: " +
              store.region +
              "<p>" +
              "Rabotno vreme: " +
              store.openHours +
              "<br>" +
              "Adresa: " +
              store.address +
              "<br>" +
              "Opis: " +
              store.description +
              "</p>" +
              "</li>"
          );
        });
        $("li p").addClass("none");
      },
    });
  });
  $(document).on("click", "#stores li", function () {
    $(this).find("p").toggleClass("none");
  });
  $(document).on("click", "#omileni li", function () {
    $(this).find("p").toggleClass("none");
  });

  $("#stores, #omileni")
    .sortable({
      connectWith: ".connect",
      items: "li:not(.ui-state-disabled)",
    })
    .disableSelection();
});
