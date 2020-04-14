using GoiQuaTet.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GoiQuaTet.Web.Controllers
{
    public class ComboGroupController : ApiController
    {
        private SGCComboGiaTienEntities db = new MyDBContext();

        [HttpGet]
        public AcknowledgementInherit<List<ComboGroup>> GetComboGroups()
        {
            var ack = new AcknowledgementInherit<List<ComboGroup>>();
            ack.Data = db.ComboGroups.ToList();
            if (ack.Data.Count() > 0) ack.isSuccess = true;
            else ack.isSuccess = false;
            return ack;
        }
    }
}
