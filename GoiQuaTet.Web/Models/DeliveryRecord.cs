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
    
    public partial class DeliveryRecord
    {
        public int Id { get; set; }
        public string DriverInfo { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> CompletedDate { get; set; }
        public int Status { get; set; }
        public string CreatedBy { get; set; }
        public int StoreId { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
    }
}
