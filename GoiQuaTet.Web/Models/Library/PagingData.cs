using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GoiQuaTet.Web.Models.Library
{
    public class PagingData
    {
        public int PageTotal
        {
            get
            {
                int pageTotal = 0;
                if(ItemTotal >= 0 && PageSize.HasValue && PageSize.Value > 0)
                {
                    pageTotal = (int)(ItemTotal / PageSize) + (ItemTotal % PageSize > 0 ? 1 : 0);
                }
                return pageTotal;
            }
        }
        public int PageIndex { get; set; }
        public int? PageSize { get; set; }
        public int ItemTotal { get; set; }
        public int GetSkipNumber()
        {
            if(PageSize.HasValue == false)
            {
                return 0;
            };
            if (PageIndex <= 0 || PageTotal <= 0) return 0; //Validate
            if (PageTotal < PageIndex) return (PageTotal - 1) * PageSize.Value; // Sẽ lấy page cuối
            return (PageIndex - 1) * PageSize.Value;
        }
    }
}