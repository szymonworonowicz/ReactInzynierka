using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AuctionStore.Infrastructure.Migrations
{
    public partial class fixdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Newsletters",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTokens_UserID",
                table: "UserTokens",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserTemporaryPasswords_UserId",
                table: "UserTemporaryPasswords",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Newsletters_UserId",
                table: "Newsletters",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Newsletters_Users_UserId",
                table: "Newsletters",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTemporaryPasswords_Users_UserId",
                table: "UserTemporaryPasswords",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTokens_Users_UserID",
                table: "UserTokens",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Newsletters_Users_UserId",
                table: "Newsletters");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTemporaryPasswords_Users_UserId",
                table: "UserTemporaryPasswords");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTokens_Users_UserID",
                table: "UserTokens");

            migrationBuilder.DropIndex(
                name: "IX_UserTokens_UserID",
                table: "UserTokens");

            migrationBuilder.DropIndex(
                name: "IX_UserTemporaryPasswords_UserId",
                table: "UserTemporaryPasswords");

            migrationBuilder.DropIndex(
                name: "IX_Newsletters_UserId",
                table: "Newsletters");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Newsletters");
        }
    }
}
