using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace AuctionStore.Infrastructure.Migrations
{
    public static class MigrationsExtensions
    {
        public static void RunSqlScript(this MigrationBuilder migrationBuilder, string script)
        {
            var assembly = AppDomain.CurrentDomain.Load("AuctionStore.Infrastructure");
            var resourceNames = assembly.GetManifestResourceNames();
            var resourceName = resourceNames.FirstOrDefault(x => x.EndsWith($"{script}.sql"));
            using var stream = assembly.GetManifestResourceStream(resourceName);
            using var reader = new StreamReader(stream);
            var sqlResult = reader.ReadToEnd();
            migrationBuilder.Sql(sqlResult);
        }
    }
}
