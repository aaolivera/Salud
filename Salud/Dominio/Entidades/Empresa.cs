using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio.Entidades
{
    public class Empresa
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public ICollection<Zona> Zonas { get; set; }

        public decimal PrecioKinesiologia { get; set; }
        public decimal PrecioEnferemeria { get; set; }
        public decimal PrecioGuardia { get; set; }
        public decimal PrecioCuidador { get; set; }
    }
}
