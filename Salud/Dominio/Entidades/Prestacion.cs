using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio.Entidades
{
    public class Prestacion
    {
        [Key]
        public int Id { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fin { get; set; }
        public int CantidadKinesiologia { get; set; }
        public int CantidadEnferemeria { get; set; }
        public int CantidadGuardia { get; set; }
        public int CantidadCuidador { get; set; }

        public Profecional ProfecionalKinesiologo { get; set; }
        public Profecional ProfecionalEnferemero { get; set; }
        public Profecional ProfecionalGuardia { get; set; }
        public Profecional ProfecionalCuidador { get; set; }
    }
}
