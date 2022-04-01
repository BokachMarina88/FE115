import {create} from "./RenderData";

export default function Spinner() {
 let spinner = create('div', [{label: 'class', value: 'loader'}]);
 spinner.innerText = 'Loading...'

 return spinner;
}