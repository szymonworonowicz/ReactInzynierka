using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AuctionStore.Infrastructure.Migrations
{
    public partial class AddAuctionIdintoMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AuctionId",
                table: "Messages",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuctionId",
                table: "Messages");
        }
    }
}
