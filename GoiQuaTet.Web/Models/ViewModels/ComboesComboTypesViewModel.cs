using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoiQuaTet.Web.Models.ViewModels
{
    public class ComboesComboTypesViewModel
    {
        public ComboesViewModel Comboes { get; set; }
        public List<ComboType> ComboTypes { get; set; }
    }
}