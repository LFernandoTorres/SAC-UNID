$(document).ready(function () {

    var obj = {};

    $("#btn-new").click(function () {
        obj = {
            accion: "insertEntrada"
        };
        $("#entrada-form")[0].reset();
        $("#btn-form").text("Registrar entrada");
    });

    $(".btn-edit").click(function () {
        let id = $(this).attr("data");
        obj = {
            accion: "getEntrada",
            entrada: id
        };
        $.post("/modulos/entradas/consultas.php",obj,function (respuesta) {
                $("#nombre").val(respuesta.nombre);
                $("#status").val(respuesta.st);
                obj = {
                    accion: "updateEntrada",
                    entrada: id
                };
            },"JSON"
        );
        $("#btn-form").text("Editar entrada");
    });

    $(".btn-delete").click(function () {
        let id = $(this).attr("data");
        obj = {
            accion: "deleteEntrada",
            entrada: id
        };
        swal({
            title: "¿Estás seguro?",
            text: "La entrada será eliminada",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                $.post("/modulos/entradas/consultas.php",obj,function (respuesta) {
                        if (respuesta.status == 1) {
                            swal("Éxito", "Entrada eliminada correctamente", "success").then((willDelete) => {
                                location.reload();
                            });
                        } else {
                            errorAlert();
                        }
                    },"JSON"
                );
            }
        });
    });

    $("#btn-form").click(function () {
        $("#entrada-form").find("input").map(function (i, e) {
                obj[$(this).prop("name")] = $(this).val();
            });
        $("#entrada-form").find("select").map(function (i, e) {
                obj[$(this).prop("name")] = $(this).val();
            });
        switch (obj.accion) {
            case "insertEntrada":
                $.post("/modulos/entradas/consultas.php", obj, function (respuesta) {
                        if (respuesta.status == 0) {
                            swal("¡ERROR!", "Campos vacios", "error");
                        } else if (respuesta.status == 1) {
                            swal("Éxito", "Entrada añadida correctamente", "success").then(() => {
                                location.reload();
                            });
                        } else {
                            errorAlert();
                        }
                    },"JSON"
                );
                break;
            case "updateEntrada":
                $.post("/modulos/entradas/consultas.php", obj, function (respuesta) {
                        if (respuesta.respuesta == 0) {
                            swal("¡ERROR!", "Campos vacios", "error");
                        } else if (respuesta.respuesta == 1) {
                            swal("Éxito", "Entrada editada correctamente", "success").then(() => {
                                location.reload();
                            });
                        } else {
                            errorAlert();
                        }
                    },"JSON"
                );
                break;

            default:
                break;
        }
    });
});