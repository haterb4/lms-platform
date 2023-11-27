import log from "../../../config/Logger";

function isMatchingObjectType(obj: any, expectedType: { [key: string]: FieldValue }): boolean {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }
  
    for (const key in expectedType) {
      const expectedValueType = expectedType[key].value;
  
      if (!(key in obj)) {
        return false;
      }
  
      const actualValue = obj[key];
      const actualValueType = typeof actualValue;
  
      if (expectedValueType) {
        if (typeof expectedValueType === 'object') {
          if (!isMatchingObjectType(actualValue, expectedValueType)) {
            return false;
          }
        } else if (actualValueType !== expectedValueType || (expectedValueType === 'number' && isNaN(actualValue))) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  export default isMatchingObjectType;
  