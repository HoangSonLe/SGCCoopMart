using System.Web;
using System.Web.Optimization;

namespace GoiQuaTet.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/dist/CssAppRoot").Include(
                      "~/dist/src/Contents/css/AppRoot.css"));

            bundles.Add(new ScriptBundle("~/dist/ScriptAppCart").Include(
               "~/dist/Scripts/AppCart.js"));

            bundles.Add(new ScriptBundle("~/dist/ScriptAppRoot").Include(
                "~/dist/Scripts/AppRoot.js"));
           
        }
    }
}
