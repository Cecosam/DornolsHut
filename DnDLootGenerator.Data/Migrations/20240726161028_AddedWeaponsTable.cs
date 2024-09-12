using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDLootGenerator.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedWeaponsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Weapons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<float>(type: "real", nullable: false),
                    Rarity = table.Column<int>(type: "int", nullable: false),
                    WeaponGroup = table.Column<int>(type: "int", nullable: false),
                    Slot = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Damage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DamageType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLight = table.Column<bool>(type: "bit", nullable: false),
                    IsHeavy = table.Column<bool>(type: "bit", nullable: false),
                    IsReach = table.Column<bool>(type: "bit", nullable: false),
                    IsFinesse = table.Column<bool>(type: "bit", nullable: false),
                    IsLoading = table.Column<bool>(type: "bit", nullable: false),
                    IsRanged = table.Column<bool>(type: "bit", nullable: false),
                    Range = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsVersatile = table.Column<bool>(type: "bit", nullable: false),
                    VersatileDamage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdditionalInfo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Weapons", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Weapons");
        }
    }
}
