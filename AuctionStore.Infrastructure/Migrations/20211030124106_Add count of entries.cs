using Microsoft.EntityFrameworkCore.Migrations;

namespace AuctionStore.Infrastructure.Migrations
{
    public partial class Addcountofentries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountOfEntries",
                table: "Auctions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountOfEntries",
                table: "Auctions");
        }
    }
}
