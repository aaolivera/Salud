function Paciente(datos) {
    var self = this;
    if (datos !== undefined) {
        self.Id = ko.observable(datos.Id);
        self.Nombre = ko.observable(datos.Nombre);
        self.Apellido = ko.observable(datos.Apellido);
        self.Direccion = ko.observable(datos.Direccion);
        self.Dni = ko.observable(datos.Dni);
        self.Telefono = ko.observable(datos.Telefono);
        self.Contacto = ko.observable(datos.Contacto);
        self.ContactoTelefono = ko.observable(datos.ContactoTelefono);
    } else {
        self.Id = ko.observable(0);
        self.Nombre = ko.observable('');
        self.Apellido = ko.observable('');
        self.Direccion = ko.observable('');
        self.Dni = ko.observable('');
        self.Telefono = ko.observable('');
        self.Contacto = ko.observable('');
        self.ContactoTelefono = ko.observable('');
    }

    self.Guardar = function (callback) {
        Guardar(callback, urlCrearPaciente, self);
    }

    self.Borrar = function (callback) {
        Borrar(callback, urlEliminarPaciente);
    }
}

function Prestacion(datos) {
    var self = this;
    if (datos !== undefined) {
        self.Id = ko.observable(datos.Id);
        self.Zona = ko.observable(datos.Zona);
        self.Profesional = ko.observable(datos.Profesional);
        self.Inicio = ko.observable(datos.Inicio);
        self.Fin = ko.observable(datos.Fin);
        self.Cantidad = ko.observable(datos.Cantidad);
        //
        self.Visitas = ko.observableArray();
        if (datos.Visitas != null) {
            datos.Visitas.forEach(function (entry) {
                self.Visitas.push(new Visita(entry, self));
            });
        }
        //
    } else {
        self.Id = ko.observable(0);
        self.Zona = ko.observable();
        self.Profesional = ko.observable();
        self.Inicio = ko.observable('');
        self.Fin = ko.observable('');
        self.Cantidad = ko.observable(0);

        self.Visitas = ko.observableArray([]);
    }

    self.Guardar = function (callback) {
        Guardar(callback, urlCrearPrestacion, self);
    }

    self.Borrar = function (callback) {
        Borrar(callback, urlEliminarPrestacion);
    }
}

function Visita(datos, prestacion) {
    var self = this;
    self.Id = ko.observable(datos.Id);
    self.Mes = ko.observable(datos.Mes);
    self.Estado = ko.observable(datos.Estado);
    self.ProfesionalEfectivo = ko.observable(datos.ProfesionalEfectivo);

    self.Borrar = function () {
        prestacion.Visitas.remove(self)
    }
}

function Profesional(datos) {
    var self = this;
    if (datos !== undefined) {
        self.Id = ko.observable(datos.Id);
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
        self.Id = ko.observable(0);
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
        Guardar(callback, urlCrearProfesional, self);
    }

    self.Borrar = function (callback) {
        Borrar(callback, urlEliminarProfesional);
    }
}

function Empresa(datos) {
    var self = this;
    if (datos !== undefined) {
        self.Id = ko.observable(datos.Id);
        self.Nombre = ko.observable(datos.Nombre);
        self.Direccion = ko.observable(datos.Direccion);
        self.Telefono = ko.observable(datos.Telefono);
        self.Cuit = ko.observable(datos.Cuit);
        //
        self.Zonas = ko.observableArray();
        if (datos.Zonas != null) {
             datos.Zonas.forEach(function (entry) {
                self.Zonas.push(new Zona(entry,self));
             }); 
        }  
        //
        self.PrecioKinesiologia = ko.observable(datos.PrecioKinesiologia);
        self.PrecioEnferemeria = ko.observable(datos.PrecioEnferemeria);
        self.PrecioGuardia = ko.observable(datos.PrecioGuardia);
        self.PrecioCuidador = ko.observable(datos.PrecioCuidador);
    } else {
        self.Id = ko.observable(0);
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

    self.ZonaNueva = ko.observable('');
    self.AgregarZona = function () {
        var match = ko.utils.arrayFirst(self.Zonas(), function (item) {
            return self.ZonaNueva === item.name;
        });

        if (self.ZonaNueva() != '' && !match) {
            self.Zonas.push(new Zona({ Id: 0, Nombre: self.ZonaNueva() }, self));
            self.ZonaNueva('')
        }        
    }

    self.Guardar = function (callback) {
        Guardar(callback, urlCrearEmpresa, self);        
    }

    self.Borrar = function (callback) {
        Borrar(callback, urlEliminarEmpresa);
    }
}

function Zona(datos, empresa) {
    var self = this;
    self.Id = ko.observable(datos.Id);
    self.Nombre = ko.observable(datos.Nombre);

    self.Borrar = function () {
        empresa.Zonas.remove(self)
    }
}

function GenericListViewModel(viewModel, urlListar, entidad) {
    var self = this;
    self.Lista = ko.observableArray([]);
    self.Cargando = ko.observable(true);
    self.Visible = ko.observable(false);
    self.Filtro = ko.observable('');
    self.Listar = function () {
        mostrar();
        if (self.Cargando()) {
            $.getJSON(urlListar, { filtro: self.Filtro()}, function (data) {
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

    self.Modificando = ko.observable(null);
    self.MostrarCrear = function () {
        ocultar();
        self.Modificando(new entidad());
    }
    self.MostrarEditar = function (editando) {
        ocultar();
        self.Modificando(editando);
    }
    self.Crear = function () {
        if (validarCampos()) {
            self.Modificando().Guardar(
                function (id) {
                    self.Modificando().Id(id);
                    self.Lista.push(self.Modificando());
                    self.Modificando(null);
                    mostrar();
                }
            );
        }
    }
    self.Modificar = function () {
        if (validarCampos()) {
            self.Modificando().Guardar(
                function () {
                    self.Modificando(null);
                    mostrar();
                }
            );
        }
    }
    self.Borrar = function (eliminando) {
        eliminando.Borrar(function () {
            self.Lista.remove(eliminando)
        })
    }
    self.Cancelar = function () {
        self.Modificando(null);
        mostrar();
    }

    function mostrar() {
        ocultar();
        self.Visible(true);
    }
    function ocultar() {
        viewModel.Models.forEach(function (entry) {
            entry.Visible(false);
            entry.Modificando(null);
        });
    }
}

function viewModel() {
    var self = this;
    self.Models = [
        new GenericListViewModel(self, urllistarPacientes, Paciente),
        new GenericListViewModel(self, urllistarProfesionales, Profesional),
        new GenericListViewModel(self, urllistarEmpresas, Empresa),
        new GenericListViewModel(self, urllistarPrestaciones, Prestacion)
    ]; 
    self.Models[0].Recargar();
    self.Models[1].Recargar();
    self.Models[2].Recargar();
    self.Models[3].Recargar();
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
    $('#alertContainer').html(`<div class="alert alert-danger alert-dismissible fade show" id="alertError" role="alert">
        <strong>Error: </strong> <span id="mensajeError">` + string + `</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`);
}

function Guardar(callback, url, entidad) {
    $.ajax({
        type: "POST",
        url: url,
        data: ko.toJSON(entidad),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
            MensajeError(responseTitle.innerHTML);
        }
    });
}

function Borrar(callback, url) {
    $.post(url, { Id: self.Id }, callback).fail(function (xhr, textStatus, errorThrown) {
        MensajeError(xhr.responseText);
    });
}