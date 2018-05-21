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
    public class EmpresaController : Controller
    {
        public EmpresaController(IRepositorio repositorio)
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
            return Json(Repositorio.Listar<Empresa>(new List<Expression<Func<Empresa, object>>> { x => x.Zonas }, x => filtro == "" || filtro == null || x.Nombre.Contains(filtro)), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Crear(Empresa empresa)
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

        public void Eliminar(int id)
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