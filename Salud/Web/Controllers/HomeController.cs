using Dominio.Entidades;
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
            return Json(Repositorio.Listar<Paciente>(x => filtro == "" || filtro == null || x.Nombre.Contains(filtro)), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarProfesionales(string filtro = null)
        {
            return Json(Repositorio.Listar<Profesional>(x => filtro == "" || filtro == null || x.Nombre.Contains(filtro)), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarEmpresas(string filtro = null)
        {
            return Json(Repositorio.Listar<Empresa>(x => filtro == "" || filtro == null || x.Nombre.Contains(filtro), x => x.Zonas), JsonRequestBehavior.AllowGet);
        }

        public int CrearPaciente(Paciente paciente)
        {
            if (!Repositorio.Existe<Paciente>(x => x.Dni == paciente.Dni))
            {
                Repositorio.Agregar<Paciente>(paciente);

                return Repositorio.GuardarCambios();
            }
            throw new Exception("Ya existe un paciente con los datos ingresados");            
        }

        public int CrearProfesional(Profesional profecional)
        {
            if (!Repositorio.Existe<Profesional>(x => x.Dni == profecional.Dni || x.Cbu == x.Cbu))
            {
                Repositorio.Agregar<Profesional>(profecional);

                return Repositorio.GuardarCambios();
            }
            throw new Exception("Ya existe un Profesional con los datos ingresados");
        }

        public int CrearEmpresa(Empresa empresa)
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
                }
                Repositorio.GuardarCambios();
                return empresa.Id;
            }
            throw new Exception("Ya existe una empresa con los datos ingresados");
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
    }
}