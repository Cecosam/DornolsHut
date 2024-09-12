using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDLootGenerator.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedFieldToArmorTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "additionalInfo",
                table: "Armors",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "additionalInfo",
                table: "Armors");
        }
    }
}
