export class Paper {
    name;
    length_cm;
    width_cm;
    length_inch;
    width_inch;
    cost;
    costPerUnitArea_cm;
    costPerUnitArea_inch;

    constructor(name, length, width, cost) {
        const conversionValue = 0.3937007874;
        this.name = name;
        this.length_cm = length;
        this.width_cm = width;
        this.length_inch = length * conversionValue;
        this.width_inch = width * conversionValue;
        this.cost = cost;
        this.costPerUnitArea_cm = cost / (length * width);
        this.costPerUnitArea_inch = cost / ((conversionValue**2) * (length * width));
    }
    // by default all lengths are saved in cm
}