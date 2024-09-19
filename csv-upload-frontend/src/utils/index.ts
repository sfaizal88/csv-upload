/**
*
* Utils
* @author - Faizal
* @date   - 19th September 2024
*
***/

// FORMAT TABLE TITLE
export const formatTableTitle = (val: string) => {
    val = val.replace(/"/g, '');
    return val;
}