import React from "react"
import {FormGroup} from "reactstrap"
import { Check } from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"

export const RegisterCheckbox = props => {
  return (

    <FormGroup className="form-label-group d-flex justify-content-between">
      <Checkbox
        key={props.id}
        onChange={props.handleCheckChieldElement}
        color="primary"
        icon={<Check className="vx-icon" size={16} />}
        label={props.value}
        checked={props.isChecked}
        value={props.value}
      />
      <div className="col-3">
        보기
      </div>
    </FormGroup>

  );
};

export default RegisterCheckbox;
