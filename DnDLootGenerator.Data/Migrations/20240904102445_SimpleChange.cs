using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDLootGenerator.Data.Migrations
{
    /// <inheritdoc />
    public partial class SimpleChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "stats",
                table: "Creatures",
                newName: "Stats");

            migrationBuilder.RenameColumn(
                name: "skills",
                table: "Creatures",
                newName: "Skills");

            migrationBuilder.RenameColumn(
                name: "otherInfo",
                table: "Creatures",
                newName: "OtherInfo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Stats",
                table: "Creatures",
                newName: "stats");

            migrationBuilder.RenameColumn(
                name: "Skills",
                table: "Creatures",
                newName: "skills");

            migrationBuilder.RenameColumn(
                name: "OtherInfo",
                table: "Creatures",
                newName: "otherInfo");
        }
    }
}
