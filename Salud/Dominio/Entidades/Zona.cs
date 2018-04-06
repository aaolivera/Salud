using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio.Entidades
{
    public class Zona
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
    }
}
