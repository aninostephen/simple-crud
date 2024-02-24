import { capitalizeFirstWord } from "../../../global/Utils";
import { MODULE_NAME } from "./application";

const header = [
    {
        id: 'pth1',
        name: 'ID'
    },
    {
        id: 'pth2',
        name: `${capitalizeFirstWord(MODULE_NAME)}}`
    },
    {
        id: 'pth6',
        name: 'Action'
    }
];

const tableForm = { header: header };

export default tableForm;