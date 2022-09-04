import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProductIdToOrdersProducts1662312917010
  implements MigrationInterface
{
  private readonly TABLE_NAME: string = 'orders_products';
  private readonly COLUMN_NAME: string = 'product_id';
  private readonly CONSTRAINT_NAME: string = 'OrdersProductsProduct';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.TABLE_NAME,
      new TableColumn({
        name: this.COLUMN_NAME,
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      this.TABLE_NAME,
      new TableForeignKey({
        name: this.CONSTRAINT_NAME,
        columnNames: [this.COLUMN_NAME],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.TABLE_NAME, this.CONSTRAINT_NAME);

    await queryRunner.dropColumn(this.TABLE_NAME, this.COLUMN_NAME);
  }
}
