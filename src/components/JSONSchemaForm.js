import React, { useRef } from "react";
import axios from "axios";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import "./JSONSchemaForm.css";

const schema = {
  title: "お問い合わせフォーム",
  type: "object",
  required: ["name", "email", "phone", "gender", "inquiryType"],
  properties: {
    name: {
      type: "string",
      title: "氏名"
    },
    email: {
      type: "string",
      title: "メールアドレス",
      format: "email"
    },
    phone: {
      type: "string",
      title: "電話番号",
      pattern: "^\\d{2,4}-\\d{2,4}-\\d{4}$"
    },
    gender: {
      type: "string",
      title: "性別",
      enum: ["男性", "女性", "その他"]
    },
    inquiryType: {
      type: "string",
      title: "お問い合わせの種類",
      enum: ["一般", "技術サポート", "営業"],
      default: "一般"
    },
    inquiry: {
      type: "string",
      title: "お問い合わせ内容"
    }
  }
};

const uiSchema = {
  name: {
    "ui:widget": "TextWidget",
    "ui:placeholder": "例：山田 花子",
    "ui:options": {
      label: false
    }
  },
  email: {
    "ui:widget": "TextWidget",
    "ui:placeholder": "例：contact@example.com",
    "ui:options": {
      label: false
    }
  },
  phone: {
    "ui:widget": "TextWidget",
    "ui:placeholder": "例：03-0000-0000",
    "ui:options": {
      label: false
    }
  },
  gender: {
    "ui:widget": "RadioWidget",
    "ui:options": {
      label: false
    }
  },
  inquiry: {
    "ui:widget": "TextAreaWidget",
    "ui:placeholder": "お問い合わせ内容を入力してください",
    "ui:options": {
      label: false
    }
  },
  inquiryType: {
    "ui:widget": "SelectWidget",
    "ui:options": {
      label: false
    }
  }
};

const TextWidget = (props) => {
  const { value, onChange, placeholder, required, label } = props;
  return (
    <div>
      <label className="custom-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <br />
      <input
        type="text"
        className="custom-text-widget"
        value={value || ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
};

const TextAreaWidget = (props) => {
  const { value, onChange, placeholder, required, label } = props;
  return (
    <div>
      <label className="custom-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <br />
      <textarea
        className="custom-textarea-widget"
        value={value || ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
};

const SelectWidget = (props) => {
  const { value, onChange, options, required, label } = props;
  return (
    <div>
      <label className="custom-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <br />
      <select
        className="custom-select-widget"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      >
        {options.enumOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const RadioWidget = (props) => {
  const { value, onChange, options, required, label } = props;
  return (
    <div>
      <label className="custom-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <br />
      <div className="custom-radio-widget">
        {options.enumOptions.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={option.value}
              name="gender"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              required={required}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const widgets = {
  TextWidget: TextWidget,
  TextAreaWidget: TextAreaWidget,
  SelectWidget: SelectWidget,
  RadioWidget: RadioWidget
};

const handleSubmit = ({ formData }, formRef) => {
  console.log('Submitted formData:', formData);
  axios.post('http://localhost:3001/api/data', formData)
    .then(response => {
      console.log('Data submitted successfully:', response.data);
      alert('Data submitted successfully!');
      formRef.current.reset();
    })
    .catch(error => {
      console.error('Failed to submit data:', error);
      alert('Failed to submit data.');
    });
};

const JSONSchemaForm = () => {
  const formRef = useRef(null);

  return (
    <div className="form-container">
      <Form
        ref={formRef}
        schema={schema}
        uiSchema={uiSchema}
        widgets={widgets}
        onSubmit={(formData) => handleSubmit(formData, formRef)}
        validator={validator}
        templates={{
          ButtonTemplates: {
            SubmitButton: () => (
              <button type="submit" className="custom-submit-button">
                送信
              </button>
            )
          },
          ErrorListTemplate: () => null
        }}
      />
    </div>
  );
};

export default JSONSchemaForm;