using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AuctionStore.Infrastructure.Migrations
{
    public partial class Connectauctionandsubcategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubCategoryId",
                table: "Auctions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_SubCategoryId",
                table: "Auctions",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Auctions_Subcategories_SubCategoryId",
                table: "Auctions",
                column: "SubCategoryId",
                principalTable: "Subcategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Auctions_Subcategories_SubCategoryId",
                table: "Auctions");

            migrationBuilder.DropIndex(
                name: "IX_Auctions_SubCategoryId",
                table: "Auctions");

            migrationBuilder.DropColumn(
                name: "SubCategoryId",
                table: "Auctions");
        }
    }
}
