using GoiQuaTet.Web.Models;
using GoiQuaTet.Web.Models.Library;
using GoiQuaTet.Web.Models.ViewModels;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace GoiQuaTet.Web.Controllers
{
    public class ComboController : ApiController
    {
        private SGCComboGiaTienEntities db = new MyDBContext();
        [HttpGet]
        public AcknowledgementInherit<ComboesComboTypesViewModel> GetComboesAndComboTypes(int index = 1, int PageSize = 15)
        {
            var ack = new AcknowledgementInherit<ComboesComboTypesViewModel>();
            ack.isSuccess = true;

            ack.Data = new ComboesComboTypesViewModel();
            AcknowledgementInherit<List<ComboType>> ackComboTypes = GetComboTypes();

            ack.Data.ComboTypes = ackComboTypes.Data;
            ack.isSuccess = ackComboTypes.isSuccess;

            AcknowledgementInherit<ComboesViewModel> ackComboes = GetComboes(ack.Data.ComboTypes[0].Id,index, PageSize );
            ack.Data.Comboes = ackComboes.Data;

            ack.isSuccess = ackComboes.isSuccess;

            return ack;
        }
        [HttpGet]
        public AcknowledgementInherit<List<ComboType>> GetComboTypes()
        {
            var ack = new AcknowledgementInherit<List<ComboType>>();
            ack.Data = db.ComboTypes.ToList();
            if (ack.Data.Count() > 0) ack.isSuccess = true;
            else ack.isSuccess = false;
            return ack;
        }
        [HttpGet]
        public AcknowledgementInherit<ComboesViewModel> GetComboes(int typeProduct = 1, int index = 1, int PageSize = 15, string stringSearch = "")
        {
            var ack = new AcknowledgementInherit<ComboesViewModel>();
            ack.isSuccess = true;
            ack.Data = new ComboesViewModel();
            ack.Data.comboInformList = new List<ComboInform>();

            var eventCombo = db.EventComboTypes.Where(p => p.ComboTypeId == typeProduct).AsQueryable();

            var comboGroup = db.ComboGroups.Join(eventCombo, g => g.Id, e => e.Id, (g, e) => g).AsQueryable();

            var comboes = db.Comboes.Join(comboGroup, p => p.ComboGroupId, g => g.Id, (p, g) => p)
                                                    .Where(p => p.IsDisabled == false).AsQueryable();
            if (stringSearch != "")
            {
                var condition = $"Name.Contains(\"{stringSearch}\")";
                var query = comboes;
                comboes = System.Linq.Dynamic.DynamicQueryable.Where(query, condition);
            }
            var pagingData = new PagingData()
            {
                PageIndex = index,
                PageSize = PageSize,
                ItemTotal = comboes.Count()
            };
            ack.Data.PageIndex = index;
            ack.Data.MaxPage = pagingData.PageTotal;

            

            var comboList = comboes.OrderBy(p => p.Id)
                                     .Skip(pagingData.GetSkipNumber())
                                     .Take(PageSize).ToList();
            
            foreach (var c in comboList)
            {
                // tên của storeGroup/ id của store và name của store
                //danh sách id storegroup của combo
                var comboStoreGroupList = db.ComboStoreGroups.Where(p => p.ComboId == c.Id).AsQueryable();
                //danh sách name của storeGroup của combo
                var nameStoreGroupList = db.StoreGroups.Join(comboStoreGroupList, s => s.Id, p => p.StoreGroupId, (s, p) => s.Name).ToList();
                //danh sách id Store của storeGroup
                var storeGroupDetails = db.StoreGroupDetails.Join(comboStoreGroupList, s => s.StoreGroupId, cs => cs.StoreGroupId, (s, cs) => s).AsQueryable();
                //danh sách store
                var storeList = db.Stores.Join(storeGroupDetails, s => s.Id, g => g.StoretId, (s, g) => s).AsQueryable();
                var comboInform = new ComboInform()
                {
                    combo = c,
                    storeGroupList = nameStoreGroupList,
                    storeList = storeList.ToList()
                };
                ack.Data.comboInformList.Add(comboInform);
            }
           
            //ack.Data.comboList = comboes.OrderBy(p => p.Id)
            //                         .Skip(pagingData.GetSkipNumber())
            //                         .Take(PageSize).ToList();            


            //if (ack.Data.comboList.Count() <= 0) ack.isSuccess = false;
            return ack;
        }
        [HttpGet]
        public AcknowledgementInherit<Combo> GetCombo(int id)
        {
            var ack = new AcknowledgementInherit<Combo>();
            ack.isSuccess = true;
            ack.Data = db.Comboes.Find(id);
            if (ack.Data == null) ack.isSuccess = false;
            return ack;
        }
    }
}
