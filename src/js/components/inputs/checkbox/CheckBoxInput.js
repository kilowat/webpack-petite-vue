import template from './checkBoxInput.tpl.html';
import './style.scss';

export default (props)=>{
  return {
    label: props?.label,
    model:  props?.value,
    update(e) {
      props.update(e.target.checked);
    },
    $template: template,
  }
};