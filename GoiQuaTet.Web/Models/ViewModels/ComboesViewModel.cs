using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoiQuaTet.Web.Models.ViewModels
{
    public class ComboesViewModel
    {
        //public List<Combo> comboList { get; set; }
        public List<ComboInform> comboInformList { get; set; }

        public int MaxPage { get; set; }
        public int PageIndex { get; set; }
    }
    public class ComboInform
    {
        public Combo combo { get; set; }
        public List<Store> storeList { get; set; } 
        public List<string> storeGroupList { get; set; }
    }
}