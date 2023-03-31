import { Unit } from "@/data/unit";

/**
 * Converts temp to metric or imperial from kelvin.
 * @param temp 
 * @param unit 
 * @param fractionDigits 
 * @returns 
 */
function convertTemp(temperature: number, unit: Unit, fractionDigits = 1) {
    // Convert to Fahrenheit
    if (unit === Unit.IMPERIAL) {
        temperature = temperature * 9 / 5 - 459.67;
    }
    // Default is Celsius
    else {
        temperature = temperature - 272.15;
    }
    temperature = parseFloat(temperature.toLocaleString('en-US', { maximumFractionDigits: fractionDigits }));
    return temperature
}

/**
 * Converts m/s to mph.
 * @param speed 
 * @param unit 
 * @param fractionDigits 
 * @returns 
 */
function convertSpeed(speed, unit: Unit, fractionDigits = 1) {
    // Convert to mph
    if (unit === Unit.IMPERIAL) {
        speed = speed * 2.23694;
    }
    speed = parseFloat(speed.toLocaleString('en-US', { maximumFractionDigits: fractionDigits }));
    return speed
}

const UnitUtils = { 
    convertTemp, 
    convertSpeed 
};

export default UnitUtils;