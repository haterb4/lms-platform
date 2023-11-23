const OTPDigit = (min: number, max: number): number =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
   
export function generateCode(min: number = 1, max: number = 8): number {
    return Number.parseInt(`${OTPDigit(min, max)}${OTPDigit(min, max)}${OTPDigit(min, max)}${OTPDigit(min, max)}`);
}