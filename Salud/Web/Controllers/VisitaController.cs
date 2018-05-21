using Dominio.Entidades;
using Dominio.Enum;
using Dominio.Helper;
using Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class VisitaController : Controller
    {
        public VisitaController(IRepositorio repositorio)
        {
            Repositorio = repositorio;
        }

        public IRepositorio Repositorio { get; }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Listar(string filtro = null)
        {

            var p = Repositorio.Listar<Prestacion>(
                new List<Expression<Func<Prestacion, object>>> { x => x.Zona, x => x.Paciente, x => x.Profesional, x => x.Visitas.Select(y => y.ProfesionalEfectivo) }, 
                x => (filtro == "" || filtro == null || x.Paciente.Nombre.Contains(filtro)));
            return Json(p, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Crear(Prestacion prestacion)
        {
            prestacion.Paciente = Repositorio.Obtener<Paciente>(prestacion.Paciente.Id);
            prestacion.Profesional = Repositorio.Obtener<Profesional>(prestacion.Profesional.Id);
            prestacion.Zona = Repositorio.Obtener<Zona>(prestacion.Zona.Id);
            var empresadb = Repositorio.Obtener<Prestacion>(new List<Expression<Func<Prestacion, object>>> { x => x.Zona, x => x.Profesional, x => x.Visitas.Select(y => y.ProfesionalEfectivo) }, x => x.Id == prestacion.Id);
            empresadb.Actualizar(prestacion);
            ActualizarVisitas(empresadb, prestacion);
            prestacion = empresadb;
            Repositorio.GuardarCambios();
            return Json(prestacion, JsonRequestBehavior.AllowGet);
        }

        private void ActualizarVisitas(Prestacion p, Prestacion pDto = null)
        {
            if(p.Visitas == null)
            {
                p.Visitas = new List<Visita>();
            }
            if (p.Cantidad > p.Visitas.Count)
            {
                var c = (p.Cantidad - p.Visitas.Count);
                for (var i = 0; i < c; i++)
                {
                    p.Visitas.Add(new Visita { Estado = EstadoVisita.Pendiente, Fecha = null, ProfesionalEfectivo = p.Profesional });
                }
            }
            else if (p.Cantidad < p.Visitas.Count)
            {
                var c = (p.Visitas.Count - p.Cantidad);
                for (var i = 0; i < c; i++)
                {
                    var elemento = p.Visitas.Last();
                    p.Visitas.Remove(elemento);
                    Repositorio.Remover<Visita>(elemento);
                }
            }
            if(pDto != null)
            {
                foreach(var v in p.Visitas)
                {
                    var vDto = pDto.Visitas.FirstOrDefault(x => x.Id == v.Id);
                    if(vDto != null)
                    {
                        v.ProfesionalEfectivo = Repositorio.Obtener<Profesional>(vDto.ProfesionalEfectivo.Id);
                        v.Estado = vDto.Estado;
                        v.Fecha = vDto.Fecha;
                    }
                    
                }
            }            
        }
    }
}