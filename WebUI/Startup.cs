using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;

namespace WebUI
{
    /// <summary>
    /// Contains the entry point and startup logic for the application.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// The main entry point to the program.
        /// </summary>
        /// <param name="arguments">Command-line arguments.</param>
        public static void Main(string[] arguments)
        {
            WebHost.CreateDefaultBuilder(arguments)
                .UseStartup<Startup>()
                .Build()
                .Run();
        }

        /// <summary>
        /// Creates a new <see cref="Startup"/> instance.
        /// </summary>
        public Startup()
        {
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services">A collection of service descriptors.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1)
                ;
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="applicationBuilder">Mechanisms to configure the application's request pipeline.</param>
        /// <param name="hostingEnvironment">Information about the web hosting environment.</param>
        public void Configure(IApplicationBuilder applicationBuilder, IHostingEnvironment hostingEnvironment)
        {
            if (hostingEnvironment.IsDevelopment())
            {
                applicationBuilder
                    .UseDeveloperExceptionPage()
                    .UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                    {
                        HotModuleReplacement = true,
                        ReactHotModuleReplacement = true
                    });
            }
            else
            {
                applicationBuilder.UseExceptionHandler("/Home/Error");
            }

            applicationBuilder
                .UseStaticFiles()
                .UseMvc(configureRoutes =>
                {
                    configureRoutes
                        .MapRoute("default", "{controller=Home}/{action=Index}/{id?}")
                        .MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
                });
        }
    }
}
