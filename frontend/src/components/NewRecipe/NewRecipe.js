import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function NewRecipe() {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="recipeName">
          <FloatingLabel
            controlId="floatingInput"
            label="Enter recipe name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Enter recipe name" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="steps">
          <Form.Label>Steps</Form.Label>

          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default NewRecipe;
