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
            return Json(Repositorio.Listar<Profecional>(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarEmpresas()
        {
            return Json(Repositorio.Listar<Empresa>(), JsonRequestBehavior.AllowGet);
        }
    }
}