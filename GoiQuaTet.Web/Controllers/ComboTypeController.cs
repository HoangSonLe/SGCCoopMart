using GoiQuaTet.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GoiQuaTet.Web.Controllers
{
    public class ComboTypeController : ApiController
    {
        private SGCComboGiaTienEntities db = new MyDBContext();
        
        [HttpGet]
        public AcknowledgementInherit<List<ComboType>> GetComboTypes()
        {
            var ack = new AcknowledgementInherit<List<ComboType>>();
            ack.Data = db.ComboTypes.ToList();
            if (ack.Data.Count() > 0) ack.isSuccess = true;
            else ack.isSuccess = false;
            return ack;
        }
    }
}
