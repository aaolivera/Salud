using Dominio.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio.Entidades
{
    public class Visita
    {
        [Key]
        public int Id { get; set; }
        public DateTime? Fecha { get; set; }
        public EstadoVisita Estado { get; set; }
        public Profesional ProfesionalEfectivo { get; set; }
    }
}
