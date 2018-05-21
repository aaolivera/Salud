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
    public class PacienteController : Controller
    {
        public PacienteController(IRepositorio repositorio)
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
            return Json(Repositorio.Listar<Paciente>(x => (filtro == "" || filtro == null || x.Nombre.Contains(filtro))), JsonRequestBehavior.AllowGet);
        }
                
        public int Crear(Paciente paciente)
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