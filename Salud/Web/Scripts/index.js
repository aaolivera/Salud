function Paciente(datos) {
    var self = this;
    if (datos !== undefined) {
        self.Nombre = ko.observable(datos.Nombre);
        self.Apellido = ko.observable(datos.Apellido);
        self.Direccion = ko.observable(datos.Direccion);
        self.Dni = ko.observable(datos.Dni);
        self.Telefono = ko.observable(datos.Telefono);
        self.Contacto = ko.observable(datos.Contacto);
        self.ContactoTelefono = ko.observable(datos.ContactoTelefono);
        
        //
        self.Empresa = ko.observable(datos.Empresa);
        self.Zona = ko.observable(datos.Zona);
        self.Prestaciones = ko.observableArray(datos.Prestaciones);
        //
    } else {
        self.Nombre = ko.observable('');
        self.Apellido = ko.observable('');
        self.Direccion = ko.observable('');
        self.Dni = ko.observable('');
        self.Telefono = ko.observable('');
        self.Contacto = ko.observable('');
        self.ContactoTelefono = ko.observable('');

        self.Empresa = ko.observable('');
        self.Zona = ko.observable('');        
        self.Prestaciones = ko.observableArray([]);
    }
    self.Guardar = function (callback) {
        $.ajax({
            type: "POST",
            url: urlCrearPaciente,
            data: ko.toJSON(self),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                MensajeError(responseTitle.innerHTML);
            }
        });
    }
}

function Prestacion(datos) {
    var self = this;
    self.Inicio = ko.observable(datos.Inicio);
    self.Fin = ko.observable(datos.Fin);
    self.CantidadKinesiologia = ko.observable(datos.CantidadKinesiologia);
    self.CantidadEnferemeria = ko.observable(datos.CantidadEnferemeria);
    self.CantidadGuardia = ko.observable(datos.CantidadGuardia);
    self.CantidadCuidador = ko.observable(datos.CantidadCuidador);

    self.ProfesionalKinesiologo = ko.observable(datos.ProfesionalKinesiologo);
    self.ProfesionalEnferemero = ko.observable(datos.ProfesionalEnferemero);
    self.ProfesionalGuardia = ko.observable(datos.ProfesionalGuardia);
    self.ProfesionalCuidador = ko.observable(datos.ProfesionalCuidador);
}

function Profesional(datos) {
    var self = this;
    if (datos !== undefined) {
        self.Nombre = ko.observable(datos.Nombre);
        self.Apellido = ko.observable(datos.Apellido);
        self.Direccion = ko.observable(datos.Direccion);
        self.Dni = ko.observable(datos.Dni);
        self.Telefono = ko.observable(datos.Telefono);
        self.TelefonoAlternativo = ko.observable(datos.TelefonoAlternativo);
        self.Mail = ko.observable(datos.Mail);
        self.Matricula = ko.observable(datos.Matricula);
        self.Cbu = ko.observable(datos.Cbu);

        self.PrecioKinesiologia = ko.observable(datos.PrecioKinesiologia);
        self.PrecioEnferemeria = ko.observable(datos.PrecioEnferemeria);
        self.PrecioGuardia = ko.observable(datos.PrecioGuardia);
        self.PrecioCuidador = ko.observable(datos.PrecioCuidador);
    } else {
        self.Nombre = ko.observable('');
        self.Apellido = ko.observable('');
        self.Direccion = ko.observable('');
        self.Dni = ko.observable('');
        self.Telefono = ko.observable('');
        self.TelefonoAlternativo = ko.observable('');
        self.Mail = ko.observable('');
        self.Matricula = ko.observable('');
        self.Cbu = ko.observable('');

        self.PrecioKinesiologia = ko.observable(0);
        self.PrecioEnferemeria = ko.observable(0);
        self.PrecioGuardia = ko.observable(0);
        self.PrecioCuidador = ko.observable(0);
    }
    self.Guardar = function (callback) {
        $.ajax({
            type: "POST",
            url: urlCrearProfesional,
            data: ko.toJSON(self),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                MensajeError(responseTitle.innerHTML);
            }
        });
    }
}

function Empresa(datos) {
    var self = this;
    if (datos !== undefined) {
        self.Nombre = ko.observable(datos.Nombre);
        self.Direccion = ko.observable(datos.Direccion);
        self.Telefono = ko.observable(datos.Telefono);
        self.Cuit = ko.observable(datos.Cuit);
        //
        self.Zonas = ko.observableArray(datos.Zonas);
        //
        self.PrecioKinesiologia = ko.observable(datos.PrecioKinesiologia);
        self.PrecioEnferemeria = ko.observable(datos.PrecioEnferemeria);
        self.PrecioGuardia = ko.observable(datos.PrecioGuardia);
        self.PrecioCuidador = ko.observable(datos.PrecioCuidador);
    } else {
        self.Nombre = ko.observable('');
        self.Direccion = ko.observable('');
        self.Telefono = ko.observable('');
        self.Cuit = ko.observable('');

        self.Zonas = ko.observableArray([]);

        self.PrecioKinesiologia = ko.observable(0);
        self.PrecioEnferemeria = ko.observable(0);
        self.PrecioGuardia = ko.observable(0);
        self.PrecioCuidador = ko.observable(0);
    }
    self.Guardar = function (callback) {
        $.ajax({
            type: "POST",
            url: urlCrearEmpresa,
            data: ko.toJSON(self),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                MensajeError(responseTitle.innerHTML);
            }
        });
    }
}

function Zona(datos) {
    var self = this;
    self.Nombre = ko.observable(datos.Nombre);
}

function GenericListViewModel(viewModel, urlListar, entidad) {
    var self = this;
    self.Lista = ko.observableArray([]);
    self.Cargando = ko.observable(true);
    self.Visible = ko.observable(false);
    self.Listar = function () {
        mostrar();
        if (self.Cargando()) {
            $.getJSON(urlListar, function (data) {
                temp = [];
                data.forEach(function (entry) {
                    temp.push(new entidad(entry));
                });
                self.Lista(temp);
                self.Cargando(false);
            });
        }
    }
    self.Recargar = function () {
        self.Cargando(true);
        self.Listar();
    }

    self.Nueva = ko.observable(null);
    self.MostrarCrear = function () {
        ocultar();
        self.Nueva(new entidad());
    }
    self.Crear = function () {
        if (validarCampos()) {
            self.Nueva().Guardar(
                function () {
                    self.Lista.push(self.Nueva());
                    self.Nueva(null);
                    mostrar();
                }
            );
        }
    }
    self.Cancelar = function () {
        self.Nueva(null);
        mostrar();
    }

    function mostrar() {
        ocultar();
        self.Visible(true);
    }
    function ocultar() {
        viewModel.Models.forEach(function (entry) {
            entry.Visible(false);
            entry.Nueva(null);
        });
    }
}

function viewModel() {
    var self = this;
    self.Models = [
        new GenericListViewModel(self, urllistarPacientes, Paciente),
        new GenericListViewModel(self, urllistarProfesionales, Profesional),
        new GenericListViewModel(self, urllistarEmpresas, Empresa)
    ];

}

$(document).ready(function () {
    window.model = new viewModel();
    ko.applyBindings(window.model);
});

function validarCampos() {
    var retorno = $('#myForm')[0].checkValidity();
    $('#myForm')[0].classList.add('was-validated');
    return retorno;
}

function MensajeError(string) {
    $('#mensajeError').html(string);
    $('#alertError').addClass('show');
}