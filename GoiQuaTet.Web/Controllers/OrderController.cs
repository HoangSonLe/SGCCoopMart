using GoiQuaTet.Web.Models;
using GoiQuaTet.Web.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GoiQuaTet.Web.Controllers
{
    public class OrderController : ApiController
    {
        private SGCComboGiaTienEntities db = new MyDBContext();
        //[HttpPost]
        //public AcknowledgementInherit<OrderViewModel> CreateOrder(OrderViewModel data)
        //{
        //    var ack = new AcknowledgementInherit<OrderViewModel>();

        //    ack.isSuccess = true;

        //    ack.Data = data;
        //    return ack;
        //}
        [HttpPost]
        public AcknowledgementInherit<List<BillViewModel>> CreateOrder(OrderViewModel data)
        {
            var dataReturn = new List<BillViewModel>();
            foreach (var p in data.cartGroup)
            {
                Order order = new Order()
                {
                    CustomerName = data.customerInform.Name,
                    CustomerPhone = data.customerInform.Phone,
                    CustomerEmail = data.customerInform.Email,
                    CustomerAddressId = 1,// gán đại
                    CardNumber = (data.customerInform.KHTT != null)? data.customerInform.KHTT.ToString(): "",
                    SendToCustomer = data.customerInform.isReceiver,

                    ReceiverName = (!data.customerInform.isReceiver) ? data.receiverInform.Name : data.customerInform.Name,
                    ReceiverPhone = (!data.customerInform.isReceiver) ? data.receiverInform.Phone : data.customerInform.Phone,
                    ReceiverEmail = (!data.customerInform.isReceiver) ? data.receiverInform.Email : data.customerInform.Email,
                    ReceiverAddressId = (!data.customerInform.isReceiver) ? 1 : 0,//gán đại nếu có giá trị thì gán thật

                    TotalPrice = p.Sum(o => o.comboInform.combo.TotalPrice * o.quantity),
                    PaidPrice = p.Sum(o => o.comboInform.combo.TotalPrice * o.quantity) / 2,
                    Status = 1,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    StoreId = p[0].storeId,
                    DeliveryTime = p[0].dateDelivery,
                    Charge = 0,//gán đại
                    StringId = "a",//gán đại
                    Distance = 10,// gán đại
                    EventId = 1,//gán đại
                    MinimumPaymentRequire = 0// gán đại
                };
                db.Orders.Add(order);
                db.SaveChanges();

                //tạo order để lấy orderId, order lúc này có tổng tiền bằng 0
                var comboOrderViewList = new List<ComboOrderView>();

                //biến tính tổng tiền để gán lại cho order
                //var tongTienMoiHD = 0;

                //vòng lặp tạo ordercombo
                foreach (var x in p)
                {
                    OrderCombo orderCombo = new OrderCombo()
                    {
                        OrderId = order.Id,
                        ComboId = x.comboInform.combo.Id,
                        Quantity = x.quantity,
                        UnitPrice = x.comboInform.combo.TotalPrice,
                        Note = x.note
                    };
                    db.OrderComboes.Add(orderCombo);
                    db.SaveChanges();
                    //dataReturn
                    //gán ordercombo để trả về client
                    var comboOrderView = new ComboOrderView()
                    {
                        orderCombo = orderCombo,
                        comboName = db.Comboes.Find(orderCombo.ComboId).Name
                    };
                    comboOrderViewList.Add(comboOrderView);

                    //tongTienMoiHD += x.quantity * x.comboInform.combo.TotalPrice;
                }

                ////gán lại totalPrice cho order
                //order.TotalPrice = tongTienMoiHD;
                //order.PaidPrice = tongTienMoiHD / 2;
                //db.SaveChanges();

                // gán bill để trả về client
                var d = new BillViewModel()
                {
                    order = order,
                    comboOrderList = comboOrderViewList,
                    store = db.Stores.Find(order.StoreId)
                };
                dataReturn.Add(d);
            }


            var ack = new AcknowledgementInherit<List<BillViewModel>>();

            ack.isSuccess = true;

            ack.Data = dataReturn;
            return ack;
        }
        [HttpGet]
        public AcknowledgementInherit<BillViewModel> SearchBill(int orderId = 0, string email = "")
        {
            var ack = new AcknowledgementInherit<BillViewModel>();
            ack.isSuccess = true;

            var condition = $"CustomerEmail.Contains(\"{email}\") && Id=={orderId}";

            var query = System.Linq.Dynamic.DynamicQueryable.Where(db.Orders.AsQueryable(), condition).SingleOrDefault();


            if (query != null)
            {
                var dataReturn = new BillViewModel();

                dataReturn.order = query;
                var store = db.Stores.SingleOrDefault(p => p.Id == query.StoreId);
                dataReturn.store = store;

                var comboOrderList = db.OrderComboes.Where(p => p.OrderId == orderId)
                                                    .Join(db.Comboes, 
                                                            o => o.ComboId, 
                                                            c => c.Id, 
                                                            (o, c) => new ComboOrderView() { comboName = c.Name, orderCombo = o })
                                                    .ToList();
                dataReturn.comboOrderList = comboOrderList;
                ack.Data = dataReturn;
            }
            else
            {
                ack.isSuccess = false;
            }
            return ack;
        }
    }
}
