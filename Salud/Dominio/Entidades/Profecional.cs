using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio.Entidades
{
    public class Profecional
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Direccion { get; set; }
        public string Dni { get; set; }
        public string Telefono { get; set; }
        public string TelefonoAlternativo { get; set; }
        public string Mail { get; set; }
        public string Matricula { get; set; }
        public string Cbu { get; set; }

        public decimal PrecioKinesiologia { get; set; }
        public decimal PrecioEnferemeria { get; set; }
        public decimal PrecioGuardia { get; set; }
        public decimal PrecioCuidador { get; set; }
    }
}
