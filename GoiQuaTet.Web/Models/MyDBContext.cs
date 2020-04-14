using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoiQuaTet.Web.Models
{
    public class MyDBContext : SGCComboGiaTienEntities
    {
        public MyDBContext() : base()
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
            this.Configuration.ValidateOnSaveEnabled = false;
        }
    }
}