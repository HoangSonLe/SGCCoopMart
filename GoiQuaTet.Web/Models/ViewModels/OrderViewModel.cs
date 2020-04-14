using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoiQuaTet.Web.Models.ViewModels
{
    public class OrderViewModel
    {
        public Person customerInform { get; set; }
        public Person receiverInform { get; set; }
        public List<List<ComboOrder>> cartGroup { get; set; }
        public string totalPrice { get; set; }

    }
    public class Person {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public bool isReceiver { get; set; }
        public string KHTT { get; set; }
    }
    public class ComboOrder
    {
        public ComboInform comboInform { get; set; } //comboInform
        public int quantity { get; set; }
        public int storeId { get; set; }
        public DateTime dateDelivery { get; set; }
        public string note { get; set; }


    }
    public class BillViewModel
    {
        public Order order { get; set; }
        public Store store { get; set; }
        public List<ComboOrderView> comboOrderList { get; set; }
    }
    public class ComboOrderView
    {
        public OrderCombo orderCombo { get; set; }
        public string comboName { get; set; }
    }
}