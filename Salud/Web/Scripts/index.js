function Paciente(datos) {
    var self = this;
    self.Nombre = ko.observable(datos.Nombre);
    //self.Apellido = ko.observable(datos.Apellido);
    //self.Direccion = ko.observable(datos.Direccion);
    //self.Dni = ko.observable(datos.Dni);
    //self.Telefono = ko.observable(datos.Telefono);
    //self.Contacto = ko.observable(datos.Contacto);
    //self.ContactoTelefono = ko.observable(datos.ContactoTelefono);
    //self.Empresa = ko.observable(datos.Empresa);
    //self.Zona = ko.observable(datos.Zona);

    //self.Prestaciones = ko.observableArray(datos.Prestaciones);
}

function Prestacion(datos) {
    var self = this;
    self.Inicio = ko.observable(datos.Inicio);
    self.Fin = ko.observable(datos.Fin);
    self.CantidadKinesiologia = ko.observable(datos.CantidadKinesiologia);
    self.CantidadEnferemeria = ko.observable(datos.CantidadEnferemeria);
    self.CantidadGuardia = ko.observable(datos.CantidadGuardia);
    self.CantidadCuidador = ko.observable(datos.CantidadCuidador);

    self.ProfecionalKinesiologo = ko.observable(datos.ProfecionalKinesiologo);
    self.ProfecionalEnferemero = ko.observable(datos.ProfecionalEnferemero);
    self.ProfecionalGuardia = ko.observable(datos.ProfecionalGuardia);
    self.ProfecionalCuidador = ko.observable(datos.ProfecionalCuidador);
}

function Profecional(datos) {
    var self = this;
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
}

function Empresa(datos) {
    var self = this;
    self.Nombre = ko.observable(datos.Nombre);
    self.Direccion = ko.observable(datos.Direccion);
    self.Telefono = ko.observable(datos.Telefono);
    self.Zonas = ko.observableArray(datos.Zonas);

    self.PrecioKinesiologia = ko.observable(datos.PrecioKinesiologia);
    self.PrecioEnferemeria = ko.observable(datos.PrecioEnferemeria);
    self.PrecioGuardia = ko.observable(datos.PrecioGuardia);
    self.PrecioCuidador = ko.observable(datos.PrecioCuidador);
}

function Zona(datos) {
    var self = this;
    self.Nombre = ko.observable(datos.Nombre);
}



function viewModel() {
    var self = this;
    self.MostrarPacientes = ko.observable(false);

    self.Pacientes = ko.observableArray();


    self.listarPacientes = function() {
        $.getJSON(urllistarPacientes, function (data) {
            self.MostrarPacientes(true);
            data.forEach(function (entry) {
                console.log(entry);
            });
        });
    }

}

$(document).ready(function () {
    window.model = new viewModel();
    ko.applyBindings(window.model);
});