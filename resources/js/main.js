$(document).ready(function () {
  //template alerta
  const alert = (text, state) => {
    return `<div class="alert alert-${state}" role="alert">${text}</div> `;
  };

  //template helper
  const helperText = (text) => {
    return `<small id='emailHelp' class='form-text text-helper'>${text}</small>`;
  };

  //manejo de inputs
  $(".form-control").bind("keypress", function (event) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    const parent = $(this).parent();
    if (!regex.test(key)) {
      event.preventDefault();
      if (!parent.find("#emailHelp").length) {
        setTimeout(function () {
          parent.append(helperText("Ingrese solo letras"));
        });

        setTimeout(function () {
          $("#emailHelp").remove();
        }, 4000);
      }
      return false;
    }

    var maxLength = 50;
    if (maxLength - $(this).val().length === 0) {
      if (!parent.find("#emailHelp").length) {
        setTimeout(function () {
          parent.append(helperText(`Solo se permiten ${maxLength} caracteres`));
        });

        setTimeout(function () {
          $("#emailHelp").remove();
        }, 4000);
      }
      return false;
    }
  });

  //limpiar campos
  $("#cleanFields").click(function () {
    $('input[type="text"]').val("");
  });

  //al cargar valida si existe la bd, si no la crea
  $.ajax({
    type: "POST",
    url: "http://localhost/millennium/controllers/getEnvironment.php",
    success: function (response) {
      if (response) {
        setTimeout(function () {
          $(".container").append(
            alert("Listo, ya puede guardar datos!", "success")
          );
        });
        setTimeout(function () {
          $(".alert").remove();
        }, 4000);
      }
    },
    error: function () {
      setTimeout(function () {
        $(".container").append(
          alert(
            "Error al cargar la pagina, refresque nuevamente por favor",
            "danger"
          )
        );
      });
      setTimeout(function () {
        $(".alert").remove();
      }, 4000);
    },
  });

  $(".form").submit(function (e) {
    e.preventDefault();
    var data = {};
    data.name = $(this).find('input[name="name"]').val();
    data.lastName = $(this).find('input[name="lastName"]').val();

    if (data.name === "" || data.lastName === "") {
      setTimeout(
        function () {
          $(".container").append(
            alert("Los campos con asterisco son obligatorios", "danger")
          );
        },
        setTimeout(function () {
          $(".alert").remove();
        }, 4000)
      );
      return;
    }

    $.ajax({
      type: "POST",
      data: data,
      url: "http://localhost/millennium/controllers/saveData.php",
      success: function (response) {
        if (response) {
          setTimeout(function () {
            $(".container").append(alert("Listo, datos guardados", "success"));
            $('input[type="text"]').val("");
          });
          setTimeout(function () {
            $(".alert").remove();
          }, 4000);
        }
      },
      error: function () {
        setTimeout(function () {
          $(".container").append(alert("Error al guardar los datos", "danger"));
          $('input[type="text"]').val("");
        });
        setTimeout(function () {
          $(".alert").remove();
        }, 4000);
      },
    });
  });
});
