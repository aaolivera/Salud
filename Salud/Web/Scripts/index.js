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
        self.Edad = ko.observable(datos.Edad);
    } else {
        self.Id = ko.observable(0);
        self.Nombre = ko.observable('');
        self.Apellido = ko.observable('');
        self.Direccion = ko.observable('');
        self.Dni = ko.observable('');
        self.Telefono = ko.observable('');
        self.Contacto = ko.observable('');
        self.ContactoTelefono = ko.observable('');
        self.Edad = ko.observable('');
    }

    self.Guardar = function (callback) {
        Guardar(callback, urlCrearPaciente, self);
    }

    self.Borrar = function (callback) {
        Borrar(callback, urlEliminarPaciente);
    }

    self.Actualizar = function (callback) {
        self.Id(callback);
    }
}

function Prestacion(datos) {
    var self = this;
    self.ModalPrestacion = new ModalPrestacion();
    
    if (datos !== undefined) {
        self.Id = ko.observable(datos.Id);
        self.Zona = ko.observable(ko.utils.arrayFirst(self.ModalPrestacion.Zonas(), function (item) { return datos.Zona.Id === item.Id; }));
        self.Profesional = ko.observable(ko.utils.arrayFirst(window.model.Models[1].Lista(), function (item) { return datos.Profesional.Id === item.Id; }));
        self.Paciente = ko.observable(ko.utils.arrayFirst(window.model.Models[0].Lista(), function (item) { return datos.Paciente.Id === item.Id; }));
        self.Inicio = ko.observable(moment(datos.Inicio).format("DD/MM/YYYY"));
        self.Fin = ko.observable(moment(datos.Fin).format("DD/MM/YYYY"));
        self.Cantidad = ko.observable(datos.Cantidad);
        self.Estado = ko.observable(datos.Estado);
        //
        self.Visitas = ko.observableArray();
        if (datos.Visitas !== null) {
            datos.Visitas.forEach(function (entry) {
                self.Visitas.push(new Visita(entry, self));
            });
        }
        //

        self.ModalPrestacion.SetTipoProfesional(self.Profesional());
        self.ModalPrestacion.PacienteEscrito(self.Paciente().Nombre);
    } else {
        self.Id = ko.observable(0);
        self.Zona = ko.observable();
        self.Profesional = ko.observable();
        self.Paciente = ko.observable();
        self.Inicio = ko.observable('');
        self.Fin = ko.observable('');
        self.Cantidad = ko.observable(0);
        self.Estado = ko.observable(0);
        self.Visitas = ko.observableArray([]);
    }
    
    self.Guardar = function (callback) {
        var entidadPlana = toJS2(self);
        entidadPlana.ModalPrestacion = null;
        Guardar(callback, urlCrearPrestacion, toJS2(entidadPlana));
    }

    self.Borrar = function (callback) {
        Borrar(callback, urlEliminarPrestacion);
    }

    self.Actualizar = function (callback) {
        self.Id(callback.Id);
        self.Visitas([]);
        if (callback.Visitas !== null) {
            callback.Visitas.forEach(function (entry) {
                self.Visitas.push(new Visita(entry, self));
            });
        }
    }
}

function Visita(datos, prestacion) {
    var self = this;
    self.Id = ko.observable(datos.Id);
    self.Fecha = ko.observable(moment(datos.Fecha).format("DD/MM/YYYY"));
    self.Estado = ko.observable(datos.Estado);
    self.ProfesionalEfectivo = ko.observable(ko.utils.arrayFirst(window.model.Models[1].Lista(), function (item) { return datos.ProfesionalEfectivo.Id === item.Id; }));

    self.Borrar = function () {
        prestacion.Visitas.remove(self)
    }
}

function ModalPrestacion() {
    self = this;
    self.Zonas = ko.pureComputed(function () {
        var zonas = [];
        ko.utils.arrayForEach(window.model.Models[2].Lista(), function (entry) {
            ko.utils.arrayForEach(entry.Zonas, function (z) {
                z.EmpresaNombre = entry.Nombre;
            });
            zonas.push.apply(zonas, entry.Zonas);
        });
        return zonas;
    });

    self.TipoProfesionales = ko.observableArray(['Kinesiologia', 'Guardia', 'Enferemeria', 'Cuidador']);
    self.TipoProfesional = ko.observable();

    self.Profesionales = ko.computed(function () {
        if (!self.TipoProfesional()) {
            return [];
        } else {
            return ko.utils.arrayFilter(window.model.Models[1].Lista(), function (prod) {
                return self.TipoProfesional() === 'Kinesiologia' && prod.PrecioKinesiologia > 0 ||
                    self.TipoProfesional() === 'Guardia' && prod.PrecioGuardia > 0 ||
                    self.TipoProfesional() === 'Enferemeria' && prod.PrecioEnferemeria > 0 ||
                    self.TipoProfesional() === 'Cuidador' && prod.PrecioCuidador > 0
            });
        }
    });

    self.PacientesFiltrados = ko.observableArray([]);
    self.PacienteEscrito = ko.observable();
    self.Filtro = ko.computed(function () {
        var filtro = self.PacienteEscrito();
        var i = 0;
        var resultado = ko.utils.arrayFilter(window.model.Models[0].Lista(), function (prod) {
            if (i === 20) return false;
            var r = MatchP(prod.Nombre, filtro) || MatchP('(' + prod.Dni + ') ' + prod.Apellido + ', ' + prod.Nombre, filtro);
            if (r) { i++; }
            return r;
        });
        if (resultado.length === 1) {
            self.SeleccionarPaciente(resultado[0]);
            self.PacientesFiltrados(resultado);
        } else {
            self.PacientesFiltrados(resultado);
        }
    }).extend({ throttle: 250 });

    self.SeleccionarPaciente = function (paciente) {
        if (window.model.Models[3].Modificando() !== null) {
            window.model.Models[3].Modificando().Paciente(paciente);
        }
    }

    //mal, si el prof seleccionado tiene dos profesiones, al volver a entrar no se por cual lo traje
    self.SetTipoProfesional = function (prod) {
        if (prod.PrecioKinesiologia > 0) {
            self.TipoProfesional('Kinesiologia');
        }
        if (prod.PrecioGuardia > 0) {
            self.TipoProfesional('Guardia');
        }
        if (prod.PrecioEnferemeria > 0) {
            self.TipoProfesional('Enferemeria');
        }
        if (prod.PrecioCuidador > 0) {
            self.TipoProfesional('Cuidador');
        }
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
        self.Activo = ko.observable(datos.Activo);

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
        self.Activo = ko.observable(true);

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

    self.Actualizar = function (callback) {
        self.Id(callback);
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
        if (datos.Zonas !== null) {
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

        if (self.ZonaNueva() !== '' && !match) {
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

    self.Actualizar = function (callback) {
        self.Id(callback.Id);

        self.Zonas([]);
        if (callback.Zonas !== null) {
            callback.Zonas.forEach(function (entry) {
                self.Zonas.push(new Zona(entry, self));
            });
        }  
    }
}

function Zona(datos, empresa) {
    var self = this;
    self.Id = ko.observable(datos.Id);
    self.Nombre = ko.observable(datos.Nombre);
    self.EmpresaNombre = empresa.Nombre();

    self.Borrar = function () {
        empresa.Zonas.remove(self)
    }
}

function GenericListViewModel(viewModel, urlListar, entidad, fullObservable) {
    var self = this;
    var mostrable = 150;
    self.Lista = ko.observableArray([]);
    self.MostrarHasta = ko.observable(mostrable);
    self.ListaMostrable = ko.computed(function () {
        return self.Lista().slice(0, self.MostrarHasta());
    });

    self.Cargando = ko.observable(false);
    self.Visible = ko.observable(false);
    self.Filtro = ko.observable('');

    self.Recargar = function () {
        if (!self.Cargando()) {
            self.Cargando(true);
            $.getJSON(urlListar, function (data) {
                if (fullObservable === true) {
                    temp = [];
                    data.forEach(function (entry) {
                        temp.push(new entidad(entry));
                    });
                    self.Lista(temp);
                    self.MostrarHasta(mostrable);
                } else {
                    self.Lista(data);
                    self.MostrarHasta(mostrable);
                }
                self.Cargando(false);
            });
        }
    }

    self.Modificando = ko.observable(null);
    self.MostrarCrear = function () {
        ocultar();
        self.Modificando(new entidad());
    }
    self.MostrarEditar = function (editando) {
        ocultar();
        self.Modificando(new entidad(editando));
    }
    self.Crear = function () {
        if (validarCampos()) {
            self.Modificando().Guardar(
                function (callback) {
                    self.Modificando().Actualizar(callback);
                    var obj = toJS2(self.Modificando());
                    //aca pushear item sin observables
                    self.Lista.push(obj);
                    self.Modificando(null);
                    mostrar();
                }
            );
        }
    }
    self.Modificar = function () {
        if (validarCampos()) {
            self.Modificando().Guardar(
                function (callback) {
                    //aca actualiar item de self.Listas
                    self.Modificando().Actualizar(callback);
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
        self.Mostrar();
    }
    
    self.Mostrar = function () {
        ocultar();
        self.Visible(true);
    }
    function ocultar() {
        viewModel.Models.forEach(function (entry) {
            entry.Visible(false);
            entry.MostrarHasta(mostrable);
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
        new GenericListViewModel(self, urllistarPrestaciones, Prestacion),
        new GenericListViewModel(self, urllistarVisitas, Prestacion, true)
    ]; 
    self.Models[0].Recargar();
    self.Models[1].Recargar();
    self.Models[2].Recargar();
    self.Models[3].Recargar();
    //self.Models[4].Recargar();
}

$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    window.model = new viewModel();
    ko.applyBindings(window.model);
    $(window).scroll(function (data, event) {
        window.model.Models.forEach(function (entry) {
            if (entry.Visible()) {
                entry.MostrarHasta(entry.MostrarHasta() + 50);
            }
        });
    });
});

function validarCampos() {
    var retorno = $('#myForm')[0].checkValidity();
    $('#myForm')[0].classList.add('was-validated');
    return retorno;
}

function MensajeError(string) {
    $('#alertContainer').html('<div class="alert alert-danger alert-dismissible fade show" id="alertError" role="alert"><strong>Error: </strong> <span id="mensajeError">' + string + '</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
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

function MatchP(string, filtro) {

    return filtro !== undefined && string.toLowerCase().indexOf(filtro.toLowerCase()) >= 0;
}


/* Use this serializer function along with ko.toJS to produce clean JSON objects. */
function toJS2(model) {
    return JSON.parse(ko.toJSON(model, modelSerializer));
}

function modelSerializer(key, value) {
    if (isSerializable(value))
        return value;
    else
        return;
}

function isSerializable(object) {
    if (object == null) return true;
    if (typeof object == 'function') return false;
    if (object.mappedProperties != null) return false;

    return true;
}