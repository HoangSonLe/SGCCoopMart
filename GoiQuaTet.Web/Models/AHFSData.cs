//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GoiQuaTet.Web.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AHFSData
    {
        public int Id { get; set; }
        public string Molecule { get; set; }
        public byte[] Alert { get; set; }
        public byte[] Warning { get; set; }
        public string Indication { get; set; }
        public byte[] Dose { get; set; }
        public bool HasDoseLimit { get; set; }
        public int AHFSID { get; set; }
        public string ATC { get; set; }
        public Nullable<bool> Done { get; set; }
        public Nullable<bool> IsVN { get; set; }
        public string RXCUI { get; set; }
    }
}
