using Dominio.Entidades;
using Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public JsonResult ListarPacientes()
        {
            return Json(Repositorio.Listar<Paciente>(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarProfesionales()
        {
            return Json(Repositorio.Listar<Profesional>(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarEmpresas()
        {
            return Json(Repositorio.Listar<Empresa>(), JsonRequestBehavior.AllowGet);
        }

        public void CrearPaciente(Paciente paciente)
        {
            if (!Repositorio.Existe<Paciente>(x => x.Dni == paciente.Dni))
            {
                Repositorio.Agregar<Paciente>(paciente);
                Repositorio.GuardarCambios();
            }
            throw new Exception("Ya existe un paciente con los datos ingresados");            
        }

        public void CrearProfesional(Profesional profecional)
        {
            if (!Repositorio.Existe<Profesional>(x => x.Dni == profecional.Dni || x.Cbu == x.Cbu))
            {
                Repositorio.Agregar<Profesional>(profecional);
                Repositorio.GuardarCambios();
            }
            throw new Exception("Ya existe un Profesional con los datos ingresados");
        }

        public void CrearEmpresa(Empresa empresa)
        {
            if (!Repositorio.Existe<Empresa>(x => x.Cuit == empresa.Cuit || x.Nombre == empresa.Nombre))
            {
                Repositorio.Agregar<Empresa>(empresa);
                Repositorio.GuardarCambios();
            }
            throw new Exception("Ya existe una empresa con los datos ingresados");
        }
    }
}