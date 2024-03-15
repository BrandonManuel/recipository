import { useState } from 'react';

import { Button, FloatingLabel, Form } from 'react-bootstrap';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './Step.css';

function Step({ step, recipeID, stepNum }) {
  const [isEditable, setIsEditable] = useState(false);
  const [stepText, setStepText] = useState(step.text);

  function saveStep() {
    var json = require(`../../../../backend/data/recipes/${recipeID}.json`);
    json.steps[stepNum] = stepText;

    console.log(json);
  }

  return (
    <>
      <div className="step">
        {isEditable ? (
          <Form.Group className="mb-3" controlId={`step-${step.id}`}>
            <FloatingLabel
              controlId="floatingInput"
              label="Add detailed step instructions"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Add detailed step instructions"
                onChange={(e) => setStepText(e.target.value)}
                value={stepText}
              />
            </FloatingLabel>
          </Form.Group>
        ) : (
          step.text
        )}
        <Button
          hidden={isEditable}
          variant="outline-secondary"
          onClick={() => setIsEditable((isEditable) => !isEditable)}
        >
          <i className="bi bi-pencil-square" />
        </Button>
        <div className="d-grid gap-2">
          <Button hidden={!isEditable} variant="success" onClick={saveStep}>
            <i className="bi bi-check-circle" />
          </Button>
          <Button
            hidden={!isEditable}
            variant="danger"
            onClick={() => setIsEditable((isEditable) => !isEditable)}
          >
            <i className="bi bi-x-circle" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Step;
