using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AuctionStore.Infrastructure.Migrations
{
    public partial class Addsubcategoryidasnullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Auctions_Subcategories_SubCategoryId",
                table: "Auctions");

            migrationBuilder.AlterColumn<Guid>(
                name: "SubCategoryId",
                table: "Auctions",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Auctions_Subcategories_SubCategoryId",
                table: "Auctions",
                column: "SubCategoryId",
                principalTable: "Subcategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Auctions_Subcategories_SubCategoryId",
                table: "Auctions");

            migrationBuilder.AlterColumn<Guid>(
                name: "SubCategoryId",
                table: "Auctions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Auctions_Subcategories_SubCategoryId",
                table: "Auctions",
                column: "SubCategoryId",
                principalTable: "Subcategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
