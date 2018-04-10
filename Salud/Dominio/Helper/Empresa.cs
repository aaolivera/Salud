using Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Dominio.Helper
{
    public static class EmpresaHelper
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
    }
}
