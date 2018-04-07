function Paciente(datos) {
    var self = this;
    self.Nombre = ko.observable(datos.Nombre);
    self.Apellido = ko.observable(datos.Apellido);
    self.Direccion = ko.observable(datos.Direccion);
    self.Dni = ko.observable(datos.Dni);
    self.Telefono = ko.observable(datos.Telefono);
    self.Contacto = ko.observable(datos.Contacto);
    self.ContactoTelefono = ko.observable(datos.ContactoTelefono);
    self.Empresa = ko.observable(datos.Empresa);
    self.Zona = ko.observable(datos.Zona);

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



function PacientesViewModel(viewModel) {
    var self = this;
    self.Pacientes = ko.observableArray([]);
    self.CargandoPacientes = ko.observable(true);
    self.Visible = ko.observable(false);
    self.ListarPacientes = function () {
        mostrar();
        if (self.CargandoPacientes()) {           
            $.getJSON(urllistarPacientes, function (data) {
                temp = [];
                data.forEach(function (entry) {
                    temp.push(new Paciente(entry));
                });
                self.Pacientes(temp);
                self.CargandoPacientes(false);
            });
        }
    }
    self.RecargarPacientes = function () {
        self.CargandoPacientes(true);
        self.ListarPacientes();
    }
    
    function mostrar() {
        self.Visible(true);
        viewModel.ProfesionalesViewModel.Visible(false);
        viewModel.EmpresasViewModel.Visible(false);
    }
}

function ProfesionalesViewModel(viewModel) {
    var self = this;
    self.Profesionales = ko.observableArray([]);
    self.CargandoProfesionales = ko.observable(true);
    self.Visible = ko.observable(false);
    self.ListarProfesionales = function () {
        mostrar();
        if (self.CargandoProfesionales()) {
            $.getJSON(urllistarProfesionales, function (data) {
                temp = [];
                data.forEach(function (entry) {
                    temp.push(new Profecional(entry));
                });
                self.Profesionales(temp);
                self.CargandoProfesionales(false);
            });
        }
    }
    self.RecargarProfesionales = function () {
        self.CargandoProfesionales(true);
        self.ListarProfesionales();
    }
    
    function mostrar() {
        self.Visible(true);
        viewModel.PacientesViewModel.Visible(false);
        viewModel.EmpresasViewModel.Visible(false);
    }
}

function EmpresasViewModel(viewModel) {
    var self = this;
    self.CargandoEmpresas = ko.observable(true);
    self.Visible = ko.observable(false);
    self.Empresas = ko.observableArray([]);
    self.ListarEmpresas = function () {
        mostrar();
        if (self.CargandoEmpresas()) {
            $.getJSON(urllistarEmpresas, function (data) {
                temp = [];
                data.forEach(function (entry) {
                    temp.push(new Empresa(entry));
                });
                self.Empresas(temp);
                self.CargandoEmpresas(false);
            });
        }
    }
    self.RecargarEmpresas = function () {
        self.CargandoEmpresas(true);
        self.ListarEmpresas();
    }
    
    function mostrar() {
        self.Visible(true);
        viewModel.ProfesionalesViewModel.Visible(false);
        viewModel.PacientesViewModel.Visible(false);
    }
}

function viewModel() {
    var self = this;
    self.PacientesViewModel = new PacientesViewModel(self);
    self.ProfesionalesViewModel = new ProfesionalesViewModel(self);
    self.EmpresasViewModel = new EmpresasViewModel(self);
    
}

$(document).ready(function () {
    window.model = new viewModel();
    ko.applyBindings(window.model);
});