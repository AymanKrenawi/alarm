export class TableModel {
  public carId?: string;
  public licenseDate?: string;
  public testDate?: string;
  public riskMatDate?: string
  public weight?: string
  public category?: string
  public status?: string
  public note?: string
  public editFieldName?: string

  // constructor(tableModel: TableModel) {
  //   Object.assign(this, tableModel, {});
  // }
  constructor() {
    Object.assign(this, {}, {});
  }
}

