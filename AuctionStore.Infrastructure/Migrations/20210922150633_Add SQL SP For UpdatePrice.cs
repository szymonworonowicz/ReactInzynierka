using Microsoft.EntityFrameworkCore.Migrations;

namespace AuctionStore.Infrastructure.Migrations
{
    public partial class AddSQLSPForUpdatePrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RunSqlScript("AddSQLSPForUpdatePrice");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
