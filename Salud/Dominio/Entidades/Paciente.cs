using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dominio.Entidades
{
    public class Paciente
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Direccion { get; set; }
        public string Dni { get; set; }
        public string Telefono { get; set; }
        public string Contacto { get; set; }
        public string ContactoTelefono { get; set; }        

        public ICollection<Prestacion> Prestaciones { get; set; }
    }
}
