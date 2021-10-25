export default class Paper {
    id;
    name;
    width;
    length;
    rollCost;
    description;
    area;
    paperCostPerUnitArea;

    constructor(id=id, name=name, width=width, length=length, rollCost=rollCost, description=description) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.length = length;
        this.rollCost = rollCost;
        this.description = description;
        this.area = width * length;
        this.paperCostPerUnitArea = rollCost / (width * length);
    }
}