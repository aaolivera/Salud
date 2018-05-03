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
    public class HomeController : Controller
    {
        public HomeController(IRepositorio repositorio)
        {
            Repositorio = repositorio;
        }

        public IRepositorio Repositorio { get; }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarPacientes(string filtro = null)
        {
            return Json(Repositorio.Listar<Paciente>(x => (filtro == "" || filtro == null || x.Nombre.Contains(filtro))), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarProfesionales(string filtro = null)
        {
            return Json(Repositorio.Listar<Profesional>(x => filtro == "" || filtro == null || x.Nombre.Contains(filtro)), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarEmpresas(string filtro = null)
        {
            return Json(Repositorio.Listar<Empresa>(new List<Expression<Func<Empresa, object>>> { x => x.Zonas }, x => filtro == "" || filtro == null || x.Nombre.Contains(filtro)), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarPrestaciones(string filtro = null)
        {

            var p = Repositorio.Listar<Prestacion>(new List<Expression<Func<Prestacion, object>>> { x => x.Zona, x => x.Paciente, x => x.Profesional, x => x.Visitas.Select(y => y.ProfesionalEfectivo) }, x => (filtro == "" || filtro == null || x.Paciente.Nombre.Contains(filtro)));
            return Json(p, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult ListarVisitas(string filtro = null)
        //{
        //    var p = Repositorio.Listar<Prestacion>(new List<Expression<Func<Prestacion, object>>> { x => x.Zona, x => x.Paciente, x => x.Profesional }, x => (filtro == "" || filtro == null || x.Paciente.Nombre.Contains(filtro)));
        //    return Json(p, JsonRequestBehavior.AllowGet);
        //}

        public int CrearPaciente(Paciente paciente)
        {
            if (!Repositorio.Existe<Paciente>(x => (x.Dni == paciente.Dni) && x.Id != paciente.Id))
            {
                if (paciente.Id == 0)
                {
                    paciente = Repositorio.Agregar<Paciente>(paciente);
                }
                else
                {
                    var empresadb = Repositorio.Obtener<Paciente>(paciente.Id);
                    empresadb.Actualizar(paciente);
                }
                Repositorio.GuardarCambios();
                return paciente.Id;
            }
            throw new Exception("Ya existe una paciente con los datos ingresados");            
        }

        public int CrearProfesional(Profesional profecional)
        {
            if (!Repositorio.Existe<Profesional>(x => (x.Dni == profecional.Dni || x.Cbu == profecional.Cbu) && x.Id != profecional.Id))
            {
                if (profecional.Id == 0)
                {
                    profecional = Repositorio.Agregar<Profesional>(profecional);
                }
                else
                {
                    var empresadb = Repositorio.Obtener<Profesional>(profecional.Id);
                    empresadb.Actualizar(profecional);
                }
                Repositorio.GuardarCambios();
                return profecional.Id;
            }
            throw new Exception("Ya existe un Profesional con los datos ingresados");
        }

        public JsonResult CrearEmpresa(Empresa empresa)
        {
            if (!Repositorio.Existe<Empresa>(x => (x.Cuit == empresa.Cuit || x.Nombre == empresa.Nombre) && x.Id != empresa.Id))
            {
                if(empresa.Id == 0)
                {
                    empresa = Repositorio.Agregar<Empresa>(empresa);
                }
                else
                {
                    var empresadb = Repositorio.Obtener<Empresa>(new List<Expression<Func<Empresa, object>>> { x => x.Zonas },x => x.Id == empresa.Id);
                    empresadb.Actualizar(empresa);
                    empresa = empresadb;
                }
                Repositorio.GuardarCambios();
                return Json(empresa, JsonRequestBehavior.AllowGet);
            }
            throw new Exception("Ya existe una empresa con los datos ingresados");
        }

        public JsonResult CrearPrestacion(Prestacion prestacion)
        {
            prestacion.Paciente = Repositorio.Obtener<Paciente>(prestacion.Paciente.Id);
            prestacion.Profesional = Repositorio.Obtener<Profesional>(prestacion.Profesional.Id);
            prestacion.Zona = Repositorio.Obtener<Zona>(prestacion.Zona.Id);

            if (prestacion.Id == 0)
            {
                prestacion = Repositorio.Agregar<Prestacion>(prestacion);
                ActualizarVisitas(prestacion);
            }
            else
            {
                var empresadb = Repositorio.Obtener<Prestacion>(new List<Expression<Func<Prestacion, object>>> { x => x.Zona, x => x.Profesional, x => x.Visitas.Select(y => y.ProfesionalEfectivo) }, x => x.Id == prestacion.Id);
                empresadb.Actualizar(prestacion);
                ActualizarVisitas(empresadb);
                prestacion = empresadb;
            }
            Repositorio.GuardarCambios();
            return Json(prestacion, JsonRequestBehavior.AllowGet);
        }

        public void EliminarEmpresa(int id)
        {
            try
            {
                Repositorio.Remover<Empresa>(id);
                Repositorio.GuardarCambios();
            }
            catch(Exception e)
            {
                throw new Exception("Error al borrar la entidad: " + e.Message);
            }
        }

        public void EliminarProfesional(int id)
        {
            try
            {
                Repositorio.Remover<Profesional>(id);
                Repositorio.GuardarCambios();
            }
            catch (Exception e)
            {
                throw new Exception("Error al borrar la entidad: " + e.Message);
            }
        }

        public void EliminarPacientes(int id)
        {
            try
            {
                Repositorio.Remover<Profesional>(id);
                Repositorio.GuardarCambios();
            }
            catch (Exception e)
            {
                throw new Exception("Error al borrar la entidad: " + e.Message);
            }
        }

        public void EliminarPrestacion(int id)
        {
            try
            {
                Repositorio.Remover<Prestacion>(id);
                Repositorio.GuardarCambios();
            }
            catch (Exception e)
            {
                throw new Exception("Error al borrar la entidad: " + e.Message);
            }
        }

        private void ActualizarVisitas(Prestacion p)
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
        }
    }
}