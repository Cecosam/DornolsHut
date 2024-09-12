using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDLootGenerator.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSourceShortColumnToCreaturesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SourceShort",
                table: "Creatures",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SourceShort",
                table: "Creatures");
        }
    }
}
