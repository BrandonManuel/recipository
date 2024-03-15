import { useState } from 'react';

import { Button } from 'react-bootstrap';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './Step.css';

function Step({ step }) {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <>
      <div className="step">
        {isEditable ? <></> : step.text}
        <Button
          variant="outline-secondary"
          onClick={() => setIsEditable((isEditable) => !isEditable)}
        >
          <i className="bi bi-pencil-square" />
        </Button>
      </div>
      ;
    </>
  );
}

export default Step;
