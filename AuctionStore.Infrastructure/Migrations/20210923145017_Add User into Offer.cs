using Microsoft.EntityFrameworkCore.Migrations;

namespace AuctionStore.Infrastructure.Migrations
{
    public partial class AddUserintoOffer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AuctionOffer_UserId",
                table: "AuctionOffer",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionOffer_Users_UserId",
                table: "AuctionOffer",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionOffer_Users_UserId",
                table: "AuctionOffer");

            migrationBuilder.DropIndex(
                name: "IX_AuctionOffer_UserId",
                table: "AuctionOffer");
        }
    }
}
