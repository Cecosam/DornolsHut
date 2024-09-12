using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDLootGenerator.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedRarityColumnInThePoisonsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rarity",
                table: "Poisons",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rarity",
                table: "Poisons");
        }
    }
}
