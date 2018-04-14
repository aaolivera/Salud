using Dominio.Entidades;
using System.Collections.Generic;
using System.Linq;

namespace Dominio.Helper
{
    public static class ConversorHelper
    {

        public static void Actualizar(this Empresa empresadb, Empresa empresa)
        {
            empresadb.Nombre = empresa.Nombre;
            empresadb.Direccion = empresa.Direccion;
            empresadb.Telefono = empresa.Telefono;
            empresadb.Cuit = empresa.Cuit;
            empresadb.PrecioKinesiologia = empresa.PrecioKinesiologia;
            empresadb.PrecioEnferemeria = empresa.PrecioEnferemeria;
            empresadb.PrecioGuardia = empresa.PrecioGuardia;
            empresadb.PrecioCuidador = empresa.PrecioCuidador;
            empresadb.Zonas = empresadb.Zonas?.Where(x => empresa.Zonas.Any(y => y.Nombre == x.Nombre)).ToList() ?? new List<Zona>(); ;
            foreach (var zona in empresa.Zonas)
            {
                if (!empresadb.Zonas.Any(y => y.Nombre == zona.Nombre))
                {
                    empresadb.Zonas.Add(zona);
                }
            }
        }

        public static void Actualizar(this Profesional empresadb, Profesional empresa)
        {
            empresadb.Nombre = empresa.Nombre;
            empresadb.Apellido = empresa.Apellido;
            empresadb.Direccion = empresa.Direccion;
            empresadb.Telefono = empresa.Telefono;
            empresadb.TelefonoAlternativo = empresa.TelefonoAlternativo;
            empresadb.Dni = empresa.Dni;
            empresadb.Cbu = empresa.Cbu;
            empresadb.Mail = empresa.Mail;
            empresadb.Matricula = empresa.Matricula;
            empresadb.PrecioKinesiologia = empresa.PrecioKinesiologia;
            empresadb.PrecioEnferemeria = empresa.PrecioEnferemeria;
            empresadb.PrecioGuardia = empresa.PrecioGuardia;
            empresadb.PrecioCuidador = empresa.PrecioCuidador;
        }

        public static void Actualizar(this Paciente empresadb, Paciente empresa)
        {
            empresadb.Nombre = empresa.Nombre;
            empresadb.Apellido = empresa.Apellido;
            empresadb.Direccion = empresa.Direccion;
            empresadb.Dni = empresa.Dni;
            empresadb.Telefono = empresa.Telefono;
            empresadb.Contacto = empresa.Contacto;
            empresadb.ContactoTelefono = empresa.ContactoTelefono;
        }

        public static void Actualizar(this Prestacion empresadb, Prestacion prestacion)
        {
            empresadb.Zona = prestacion.Zona;
            empresadb.Profesional = prestacion.Profesional;
            empresadb.Paciente = prestacion.Paciente;
            empresadb.Inicio = prestacion.Inicio;
            empresadb.Fin = prestacion.Fin;
            empresadb.Cantidad = prestacion.Cantidad;
            empresadb.Visitas = empresadb.Visitas?.Where(x => prestacion.Visitas.Any(y => y.Id == x.Id)).ToList() ?? new List<Visita>(); ;
            foreach (var visita in prestacion.Visitas)
            {
                if (!empresadb.Visitas.Any(y => y.Id == visita.Id))
                {
                    empresadb.Visitas.Add(visita);
                }
            }
        }
    }
}
