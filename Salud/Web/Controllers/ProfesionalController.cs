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
    public class ProfesionalController : Controller
    {
        public ProfesionalController(IRepositorio repositorio)
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
            return Json(Repositorio.Listar<Profesional>(x => filtro == "" || filtro == null || x.Nombre.Contains(filtro)), JsonRequestBehavior.AllowGet);
        }

        public int Crear(Profesional profecional)
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

        public void Eliminar(int id)
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
    }
}