using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoiQuaTet.Web.Models
{
    public class Acknowledgement
    {
        public Acknowledgement() { }
        public bool isSuccess { get; set; }
        public List<string> ErrorMessage { get; set; }
        public List<string> SuccessMessage { get; set; }

        public void AddMessage(string message) { }
        public void AddMessages(params string[] messages) { }
        public void AddMessages(IEnumerable<string> messages) { }
        public void AddSuccessMessages(params string[] messages) { }
        public void ExtractMessage(Exception ex) { }
        public Exception ToException() { return null; }


    }
}