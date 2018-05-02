using Dominio.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dominio.Entidades
{
    public class Prestacion
    {
        [Key] 
        public int Id { get; set; }
        public Zona Zona { get; set; }
        public Profesional Profesional { get; set; }
        public Paciente Paciente { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fin { get; set; }
        public int Cantidad { get; set; }
        public ICollection<Visita> Visitas { get; set; }

        public EstadoPrestacion Estado { get; set; }
    }
}
