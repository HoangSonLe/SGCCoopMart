using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoiQuaTet.Web.Models
{
    public class AcknowledgementInherit<T> : Acknowledgement
    {
        public AcknowledgementInherit() { }
        public T Data { get; set; }
    }
}